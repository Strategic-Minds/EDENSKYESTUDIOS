# Opportunity Scoring Model

## Purpose
Turn raw signals into ranked, action-ready opportunities for a multi-persona network.

## Core scores
Score each opportunity from 1 to 10 on:
- **Trend Score**: how strong and real the signal is now
- **Competition Score**: how crowded the opportunity already is
- **Velocity Score**: how quickly the topic or pattern is rising
- **Audience Match Score**: how well the opportunity fits the intended persona and audience
- **Conversion Score**: how likely the opportunity is to create downstream action, trust, or revenue

## Normalized weighted formula
Use this default weighted model:

`Opportunity Score = (Trend * 0.25) + ((11 - Competition) * 0.15) + (Velocity * 0.20) + (AudienceMatch * 0.25) + (Conversion * 0.15)`

This inverts competition so lower crowding helps the final score.

## Optional supporting modifiers
When useful, add modifiers from -2 to +2 total:
- **Authority Modifier**: does this build positioning and trust?
- **Cross-Platform Modifier**: can one strong idea become multiple assets?
- **Operational Ease Modifier**: is this easy to test quickly?
- **Risk Modifier**: does this introduce platform, brand, or governance risk?

`Final Priority Score = Opportunity Score + Modifiers`

## Routing thresholds
- **9.0+** = immediate play
- **8.0-8.9** = high-priority near-term test
- **6.5-7.9** = watchlist or secondary test queue
- **below 6.5** = deprioritize unless strategically important

## Required output for each scored item
For each opportunity, return:
- opportunity name
- why it matters
- score breakdown
- final priority score
- recommended persona
- recommended platform
- recommended format
- urgency: immediate, near-term, watchlist, or reject

## Guardrails
- Do not overvalue volume when the audience fit is weak.
- Penalize ideas that depend on controversy, spam, or manipulative engagement.
- Prefer opportunities that can support trust, authority, and long-term audience value.
- If identity routing is unresolved, do not push the item into execution.

## Multi-persona use
For a network-wide opportunity:
1. score the opportunity globally
2. score persona fit separately
3. assign only to personas above the fit threshold
4. avoid routing one trend across every persona by default
