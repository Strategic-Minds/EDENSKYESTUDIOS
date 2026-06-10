# Eden Skye Studios Visual Source Truth Manifest

Mode: branch-only source truth. No production deploy.

Purpose: turn uploaded Eden Skye visuals into a Drive-ready and automation-ready reference system for the public website, model rosters, Auto Social, avatar/video generation, faceless content pages, and the future admin control plane.

## Target Drive Root

Primary target folder should be the active Eden Skye Studios Drive source tree under:

EDEN SKYE STUDIOS / 10 Model System

If duplicate Eden Skye folders exist, use the folder that contains the active 10 Model System and Auto Social structure. Do not scatter these assets across duplicate roots.

## Folder Assignment

| Asset ID | Local file | Target Drive path | Automation purpose | Machine-readable record |
|---|---|---|---|---|
| ess_faceless_20_themes | ChatGPT Image Jun 7, 2026, 10_44_55 PM(1).png | EDEN SKYE STUDIOS / 10 Model System / Faceless Accounts / 20 Viral Faceless Social Media Account Themes | Source truth for faceless social media niches and Auto Social seed themes | faceless_account_themes |
| ess_international_male_roster_v1 | ChatGPT Image Jun 7, 2026, 10_33_36 PM(1).png | EDEN SKYE STUDIOS / 10 Model System / International Models 18-35 / Roster References | International male model roster, countries, market mapping, folder structure | model_roster_templates |
| ess_international_mixed_roster_v2 | ChatGPT Image Jun 7, 2026, 10_32_28 PM(1).png | EDEN SKYE STUDIOS / 10 Model System / International Models 18-35 / Roster References | International mixed model roster and top social markets | model_roster_templates |
| ess_mature_model_roster | ChatGPT Image Jun 7, 2026, 10_28_10 PM(1).png | EDEN SKYE STUDIOS / 10 Model System / Mature Models 50-80 / Roster References | Mature male/female roster and governance-safe model categories | model_roster_templates |
| ess_male_model_roster | ChatGPT Image Jun 7, 2026, 10_27_26 PM(1).png | EDEN SKYE STUDIOS / 10 Model System / Male Models Primary / 25-50 / Roster References | Male 25-50 source roster and campaign archetypes | model_roster_templates |
| ess_homepage_reference | ChatGPT Image Jun 7, 2026, 08_02_35 PM(7).png | EDEN SKYE STUDIOS / Website Visual Source Truth / Homepage Reference | Public homepage visual target | website_page_specs |
| ess_content_creation_pack | ChatGPT Image Jun 7, 2026, 07_52_17 PM(3).png | EDEN SKYE STUDIOS / Website Visual Source Truth / Content Creation Pack | Source for website/campaign image sections and social content categories | content_pack_assets |
| ess_female_model_cards | ChatGPT Image Jun 4, 2026, 01_18_27 PM(4).png | EDEN SKYE STUDIOS / 10 Model System / Female Models / 25-50 / Roster References | Female model card naming, archetypes, bios, and visual style | model_profiles |
| ess_avatar_video_prompt | ChatGPT Image Jun 4, 2026, 12_02_18 AM(1).png | EDEN SKYE STUDIOS / 10 Model System / Avatar Video Generator Assets / Prompt References | Ultra-realistic avatar generation prompt and required image types | avatar_generation_prompts |
| ess_avatar_angles_reference | ChatGPT Image Jun 3, 2026, 11_27_37 PM(1).png | EDEN SKYE STUDIOS / 10 Model System / Avatar Video Generator Assets / Angle References | Consistent avatar pose and angle requirements | avatar_generation_prompts |

## Automation Rules

1. Each uploaded image becomes a source truth asset, not just a design reference.
2. Each asset must map to a stable machine-readable record.
3. If the real Drive file is not uploaded yet, set file_status to pending_upload.
4. If the image asset path is not verified in Drive, set image_asset_status to missing_source_truth.
5. No public publishing until approval.
6. No production deploy from this manifest.
7. No customer messaging.
8. No DNS changes.
9. No payment actions.
10. All generated model, avatar, faceless, and website records must remain draft-only until approved.

## Required Supabase Tables

- visual_source_assets
- website_page_specs
- model_roster_templates
- model_profiles
- faceless_account_themes
- avatar_generation_prompts
- content_pack_assets
- auto_social_seed_themes
- drive_folder_targets
- source_truth_receipts

## Required Build Behavior

The Eden site and admin control plane should read these records as the automation source layer:

- homepage visual sections
- model category pages
- male model roster
- female model roster
- mature model roster
- international model roster
- faceless account page
- Auto Social seed theme pages
- avatar/video prompt generator
- content creation pack
- approval and governance dashboards

## Status

Manifest committed for branch implementation. Drive file upload/move still requires a Drive upload-capable tool or manual upload into the assigned folders.
