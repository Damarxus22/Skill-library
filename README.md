# Hopeworks Skill Library

A platform-neutral library and builder for reusable AI skills.

## Core principle

**One Skill = One Job.**

Each canonical skill is grounded in trusted sources, validated before publishing, and designed to be adapted for multiple AI systems rather than locked to one model.

## Skill Builder V1 workflow

1. Define the skill's single job.
2. Gather trusted source material.
3. Copy the built-in Hopeworks prompt into NotebookLM.
4. Generate a grounded `SKILL.md` using only those sources.
5. Paste the generated file into the dashboard validator.
6. Validate required sections, permission boundaries, source grounding, and version metadata.
7. Download/copy the validated canonical skill.
8. Future adapters can export the canonical skill for Claude, ChatGPT, Gemini, MCP, APIs, and generic LLM systems.

## V1 files

- `index.html` — dashboard and Skill Builder UI
- `styles.css` — responsive Hopeworks interface
- `app.js` — NotebookLM prompt, validation logic, copy/download tools
- `skills.json` — canonical skill catalog and export targets

## Safety / quality boundary

The builder does not treat NotebookLM output as automatically trusted. A generated skill must pass the Hopeworks validation gate before it is considered library-ready. Destructive or external actions should explicitly require appropriate human authorization.
