# Hopeworks Skill Library — Skill Creator

## Purpose
The Skill Creator turns a plain-language idea into a structured, portable AI skill that can be reviewed, tested, copied, downloaded, and adapted for different AI systems.

## Core Objective
When a user describes a skill they want to create, transform that request into a clear operational specification instead of only producing a prompt.

The finished skill should explain:
- what the skill does
- when the skill should activate
- what information it needs
- the steps it follows
- what tools or files it may use
- what output it should produce
- what limitations or safety rules apply
- how the skill can be tested

## Skill Creation Workflow

### 1. Define the Goal
Identify the user's desired outcome. Convert vague requests into a specific objective without changing the user's intent.

### 2. Define Activation Conditions
Describe when the skill should be used. Include common trigger phrases, tasks, file types, or situations that should activate the skill.

### 3. Identify Inputs
List only information the skill requires or can optionally use, including user instructions, uploaded files, documents, images, URLs, structured data, previous project context, and connected tools or services.

### 4. Define the Process
Break the skill into clear execution steps. Each step should describe an action the AI can perform. Prefer reusable procedures over instructions tied to one example.

### 5. Define Tool Behavior
Specify useful tools or integrations such as file search, file reading, document creation, spreadsheets, web research, APIs, databases, email, calendars, GitHub, or cloud storage. Never claim access to unavailable tools.

### 6. Define Output
Describe exactly what the skill should return, such as a summary, report, checklist, formatted document, code, JSON, Markdown, spreadsheet, recommendation, or project artifact.

### 7. Add Guardrails
The skill must preserve user intent, avoid inventing facts, distinguish known information from assumptions, protect credentials and private information, obey platform/tool limitations, and clearly state when an action cannot be performed.

### 8. Test the Skill
Generate at least three test cases:
1. Normal use case
2. Ambiguous or incomplete request
3. Edge case or failure condition

For each test, define expected behavior.

## Required Skill Format
Every generated skill should contain:

```markdown
# Skill Name

## Description
A concise explanation of what the skill does.

## Use When
Conditions that should activate the skill.

## Do Not Use When
Situations where another skill or workflow is more appropriate.

## Inputs
Information required or optionally accepted.

## Workflow
1. Step one
2. Step two
3. Step three

## Tools
Tools, integrations, or data sources the skill may use.

## Output
Expected response or artifact structure.

## Rules
Behavioral constraints, quality requirements, and guardrails.

## Error Handling
What to do when information, tools, permissions, or files are unavailable.

## Examples
Example requests and expected behavior.

## Tests
Test cases for validating the skill.
```

## Portability Rules
Keep skills as platform-neutral as possible. Separate core skill logic from platform-specific instructions. When useful, create adaptations for ChatGPT, Claude, Gemini, custom AI agents, MCP-based systems, and API-driven agents. Do not assume every platform supports identical tools, memory, connectors, or system instructions.

## Quality Standard
A finished skill should be specific enough to execute, modular enough to reuse, understandable by humans and AI, testable, easy to modify, explicit about dependencies, and free of unnecessary platform lock-in.

## Skill Builder Interface Behavior
When integrated into the Hopeworks Skill Library dashboard, the Skill Creator should support:
1. Skill name
2. Skill description
3. Goal
4. Activation conditions
5. Inputs
6. Workflow steps
7. Tools and integrations
8. Output format
9. Rules and guardrails
10. Test cases
11. Platform target
12. Live Markdown preview
13. Copy
14. Download as `SKILL.md`
15. Validation status

The dashboard should allow the user to edit the generated skill before downloading it.

## Final Instruction
Treat every skill as a small operational program written in natural language. Do not merely make it sound intelligent. Make its behavior predictable, reusable, inspectable, and testable.
