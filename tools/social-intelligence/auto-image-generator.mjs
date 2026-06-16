#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const args = new Map();
for (let index = 2; index < process.argv.length; index += 2) {
  args.set(process.argv[index], process.argv[index + 1]);
}

const cwd = process.cwd();
const configPath = path.resolve(cwd, args.get("--config") || "auto-image-generator-config.json");
const registryPath = path.resolve(cwd, args.get("--registry") || "source-image-registry.json");
const queuePath = path.resolve(cwd, args.get("--queue") || "image-generation-queue-schema.csv");
const outPath = path.resolve(cwd, args.get("--out") || "image-generation-packets.json");

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/);
  const headers = lines.shift().split(",");
  return lines.map((line) => {
    const values = line.split(",");
    return Object.fromEntries(headers.map((header, index) => [header, values[index] || ""]));
  });
}

function requiredFieldsMissing(row, requiredFields) {
  const queueFieldMap = {
    model_name: "persona_or_model",
    source_image_id: "source_image_id",
    persona_context: "persona_or_model",
    negative_prompt: "negative_prompt"
  };

  return requiredFields.filter((field) => {
    const queueField = queueFieldMap[field] || field;
    return !row[queueField] || row[queueField].trim() === "";
  });
}

const config = readJson(configPath);
const registry = readJson(registryPath);
const queue = parseCsv(fs.readFileSync(queuePath, "utf8"));
const approvedModels = registry.models || registry.approved_models || [];
const blockedModels = registry.blocked_models || [];
const allModels = [...approvedModels, ...blockedModels].map((model) => ({
  generation_allowed: !blockedModels.some((blocked) => blocked.model_name === model.model_name),
  ...model
}));
const modelsByName = new Map(allModels.map((model) => [model.model_name.toLowerCase(), model]));

const packets = queue.map((row) => {
  const model = modelsByName.get(row.persona_or_model.toLowerCase());
  const missing = requiredFieldsMissing(row, config.required_prompt_fields);
  const assetType = config.approved_asset_types[row.asset_type];
  const errors = [];

  if (!model) errors.push("model_not_found_in_source_image_registry");
  if (model && !model.generation_allowed) errors.push("source_image_not_approved_for_generation");
  if (!assetType) errors.push("asset_type_not_approved");
  if (missing.length > 0) errors.push(`missing_required_fields:${missing.join("|")}`);

  const status = errors.length > 0 ? "blocked" : config.output_policy.default_status;

  return {
    request_id: row.request_id,
    status,
    errors,
    model: model || null,
    asset_type: row.asset_type,
    platform: row.platform,
    format: row.format,
    objective: row.objective,
    approval_gate: row.approval_gate || "image_review_required",
    source_image_id: row.source_image_id,
    prompt: status === "blocked" ? null : {
      model_name: row.persona_or_model,
      source_image_id: row.source_image_id,
      asset_type: row.asset_type,
      platform: row.platform,
      format: row.format,
      objective: row.objective,
      environment: row.environment,
      wardrobe_safety: row.wardrobe_safety,
      lighting: row.lighting,
      camera_angle: row.camera_angle,
      brand_direction: config.brand.personality.join(", "),
      visual_language: config.brand.imagery.lighting,
      identity_rule: config.brand.imagery.model_direction,
      content_rule: "adult-only, non-explicit, brand-safe editorial imagery",
      negative_prompt: row.negative_prompt
    },
    qa_gate_required: config.output_policy.qa_gate_required,
    receipt_required: config.output_policy.receipt_required
  };
});

const output = {
  generated_at: new Date().toISOString(),
  mode: config.mode,
  packet_count: packets.length,
  blocked_count: packets.filter((packet) => packet.status === "blocked").length,
  packets
};

fs.writeFileSync(outPath, `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({
  out: outPath,
  packet_count: output.packet_count,
  blocked_count: output.blocked_count
}, null, 2));
