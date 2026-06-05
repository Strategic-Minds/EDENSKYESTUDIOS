"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

const initialGates: Array<[string, string, string]> = [
  ["Production deploy", "Locked", "Requires Jeremy approval"],
  ["Shopify publishing", "Locked", "Draft products only"],
  ["Supabase schema", "Locked", "Migration scaffold only"],
  ["Metricool posting", "Locked", "Draft routing only"],
  ["AI Gateway", "Wired", "Activates when Vercel env is approved"],
  ["Licensing", "Review", "Not public until asset pack approved"],
  ["n8n live loop", "Locked", "Sandbox heartbeat only"],
  ["Public media", "Locked", "Watermark and disclosure required"]
];

const workflows: Array<[string, number]> = [
  ["Intake", 100],
  ["Planning", 92],
  ["Sandbox", 82],
  ["Validation", 68],
  ["Promotion", 18],
  ["Improve", 48]
];

const assets: Array<[string, string, string]> = [
  ["Images", "Brand lock + mockups mirrored", "Ready"],
  ["Models", "140 avatar assets", "Draft"],
  ["Videos", "0 produced clips", "Plan"],
  ["Editing", "Descript / Adobe lane", "Draft"],
  ["Files", "262 staged files", "Ready"],
  ["Folders", "Drive/Git source truth", "Review"],
  ["Licenses", "Metadata templates", "Draft"]
];

const revenue: Array<[string, string, string]> = [
  ["Products", "$0 live", "12 draft paths"],
  ["Services", "Application", "4 offer lanes"],
  ["Downloads", "Starter catalog", "6 SKUs planned"],
  ["Apps", "Custom", "AI tools lane"],
  ["Licenses", "Review only", "Asset gates required"]
];

const routeStatus: Array<[string, string, string]> = [
  ["Health", "/api/eden/health", "Ready"],
  ["Build packet", "/api/factory/build-packet", "Ready"],
  ["Readiness", "/api/factory/readiness", "Ready"],
  ["Stack alignment", "/api/factory/stack-alignment", "Ready"],
  ["GPT bridge", "/api/bridge/autonomous-gpt", "Ready"],
  ["Codex bridge", "/api/bridge/codex", "Ready"],
  ["n8n bridge", "/api/bridge/n8n", "Ready"],
  ["Cron readiness", "/api/cron/factory-readiness", "Staged"],
  ["Brand handoff", "/api/cron/brand-mockup-handoff", "5 min"]
];

const receipts: Array<[string, string, string]> = [
  ["Codex bridge handoff", "codex_production_3234b220", "Queued"],
  ["Production deploy approval", "production_deploy_approved_20260605", "Approved"],
  ["Cloud preview approval", "cloud_preview_approved_20260605", "Approved"],
  ["Pipeline start", "pipeline_start_20260605", "Created"],
  ["Bridge batch", "bridge-batch-1780618010132", "Created"],
  ["n8n loop", "n8n-loop-1780618707114", "Created"],
  ["Stack audit", "20_PIPELINE_START_PACKET", "Created"],
  ["Brand mockup handoff", "brand-mockup-handoff-20260605", "Ready"]
];

type Message = {
  role: "user" | "assistant";
  content: string;
};

export function EdensCloset() {
  const [gates, setGates] = useState(initialGates);
  const [gateUpdatedAt, setGateUpdatedAt] = useState("Live refresh pending");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Eden is online in draft mode. Ask for an offer, asset brief, workflow status, product draft, or approval review."
    }
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const readiness = useMemo(() => Math.round((workflows.reduce((sum, item) => sum + item[1], 0) / (workflows.length * 100)) * 100), []);

  useEffect(() => {
    let mounted = true;

    async function refreshGates() {
      try {
        const response = await fetch("/api/eden/gates", { cache: "no-store" });
        const data = await response.json();
        if (!mounted || !Array.isArray(data.gates)) return;
        setGates(data.gates.map((gate: { name: string; state: string; note: string }) => [gate.name, gate.state, gate.note]));
        setGateUpdatedAt(new Date(data.updated_at).toLocaleTimeString());
      } catch {
        if (mounted) setGateUpdatedAt("Gate API unavailable");
      }
    }

    refreshGates();
    const timer = window.setInterval(refreshGates, 8000);
    return () => {
      mounted = false;
      window.clearInterval(timer);
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!input.trim() || busy) return;
    const next: Message[] = [...messages, { role: "user", content: input.trim() }];
    setMessages(next);
    setInput("");
    setBusy(true);
    try {
      const response = await fetch("/api/eden/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next })
      });
      const data = await response.json();
      setMessages([...next, { role: "assistant", content: data.reply || "No response returned." }]);
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content: "The chat route is present, but the gateway did not respond. Check the Vercel AI Gateway gate."
        }
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="closet-shell">
      <aside className="chat-rail">
        <div className="closet-brand">
          <span>ES</span>
          <div>
            <strong>Edens Closet</strong>
            <small>Control plane</small>
          </div>
        </div>

        <div className="chat-thread">
          {messages.map((message, index) => (
            <div className={`chat-bubble ${message.role}`} key={`${message.role}-${index}`}>
              <span>{message.role === "assistant" ? "Eden" : "Jeremy"}</span>
              <p>{message.content}</p>
            </div>
          ))}
        </div>

        <form className="chat-form" onSubmit={submit}>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask Eden to draft, route, approve, or diagnose..."
            rows={3}
          />
          <button disabled={busy || !input.trim()}>{busy ? "Thinking" : "Send"}</button>
        </form>
      </aside>

      <section className="workspace">
        <header className="workspace-header">
          <div>
            <p className="eyebrow">Cloud operations</p>
            <h1>Edens Closet</h1>
            <span>Images, videos, editing, files, folders, commerce, and gates in one operator surface.</span>
          </div>
          <a href="/" className="secondary-action">
            Storefront
          </a>
        </header>

        <section className="status-strip">
          <div>
            <span>Readiness</span>
            <strong>{readiness}%</strong>
          </div>
          <div>
            <span>Live mutations</span>
            <strong>0</strong>
          </div>
          <div>
            <span>Human gates</span>
            <strong>8</strong>
          </div>
          <div>
            <span>Revenue lanes</span>
            <strong>5</strong>
          </div>
        </section>

        <section className="work-grid">
          <div className="primary-work">
            <div className="panel-heading">
              <h2>Creative workspace</h2>
              <span>Center-screen production flow</span>
            </div>
            <div className="asset-board">
              {assets.map(([title, detail, state]) => (
                <button className="asset-tile" key={title}>
                  <span>{state}</span>
                  <strong>{title}</strong>
                  <small>{detail}</small>
                </button>
              ))}
            </div>
          </div>

          <div className="side-work">
            <div className="panel-heading">
              <h2>Workflow</h2>
              <span>Auto Builder lanes</span>
            </div>
            <div className="workflow-list">
              {workflows.map(([label, value]) => (
                <div className="workflow-row" key={label}>
                  <div>
                    <strong>{label}</strong>
                    <span>{value}%</span>
                  </div>
                  <i style={{ width: `${value}%` }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ops-grid">
          <div>
            <div className="panel-heading">
              <h2>Approval gates</h2>
              <span>Updated {gateUpdatedAt}</span>
            </div>
            <div className="gate-list">
              {gates.map(([name, state, note]) => (
                <div className="gate-row" key={name}>
                  <strong>{name}</strong>
                  <span>{state}</span>
                  <small>{note}</small>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="panel-heading">
              <h2>Revenue control</h2>
              <span>Products, services, downloads, apps, licenses</span>
            </div>
            <div className="revenue-list">
              {revenue.map(([name, value, note]) => (
                <div className="revenue-row" key={name}>
                  <span>{name}</span>
                  <strong>{value}</strong>
                  <small>{note}</small>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="ops-grid">
          <div>
            <div className="panel-heading">
              <h2>Route console</h2>
              <span>Sandbox cloud workflow</span>
            </div>
            <div className="revenue-list">
              {routeStatus.map(([name, route, state]) => (
                <div className="revenue-row" key={name}>
                  <span>{name}</span>
                  <strong>{state}</strong>
                  <small>{route}</small>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="panel-heading">
              <h2>Receipts</h2>
              <span>Continuity records</span>
            </div>
            <div className="revenue-list">
              {receipts.map(([name, id, state]) => (
                <div className="revenue-row" key={id}>
                  <span>{name}</span>
                  <strong>{state}</strong>
                  <small>{id}</small>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
