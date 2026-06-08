# WORKFLOW_MAP.md - AI-Assisted Development Navigation Map

Welcome! This map helps developers and AI agents navigate the CodeLingo AI multi-agent workflow. Use the guidelines below to choose the correct prompt for your specific task.

---

## Prompt Selection Quick Reference

| What are you trying to do? | Recommended Prompt | Target AI Agent |
| :--- | :--- | :--- |
| **Scoped Feature / Bug Fix / UI Component / Refactor** | [CODEX_TASK_PROMPT.md](file:///Users/junghyunwoo/Documents/code-lingo-ai/CODEX_TASK_PROMPT.md) | **Codex** (GPT/Fast Gen) |
| **Small Local Review / Minor Integration Fix** | [ANTIGRAVITY_REVIEW_PROMPT.md](file:///Users/junghyunwoo/Documents/code-lingo-ai/ANTIGRAVITY_REVIEW_PROMPT.md) Small-Review Mode | **Antigravity** (Gemini) |
| **Generate a New Quiz Dataset (JSON questions)** | [CODEX_QUIZ_GENERATOR_PROMPT.md](file:///Users/junghyunwoo/Documents/code-lingo-ai/CODEX_QUIZ_GENERATOR_PROMPT.md) | **Codex** (GPT/Fast Gen) |
| **Merge, Test, and Verify Codex's Code Locally** | [ANTIGRAVITY_REVIEW_PROMPT.md](file:///Users/junghyunwoo/Documents/code-lingo-ai/ANTIGRAVITY_REVIEW_PROMPT.md) | **Antigravity** (Gemini) |
| **Consolidate Multiple Codex Reports Together** | [CODEX_REPORT_PROMPT.md](file:///Users/junghyunwoo/Documents/code-lingo-ai/CODEX_REPORT_PROMPT.md) | **Codex** (Consolidator) |

---

## The Hybrid AI Development Loop

```mermaid
graph TD
    A["1. CPO (ChatGPT) decides the direction & outlines requirements"] --> B{"2. Choose your task size"}
    
    B -->|Scoped implementation| C["3a. Inject CODEX_TASK_PROMPT to Codex"]
    B -->|Small local review| D["3b. Inject ANTIGRAVITY_REVIEW_PROMPT Small-Review Mode to Antigravity"]
    B -->|Quiz content| E["3c. Inject CODEX_QUIZ_GENERATOR_PROMPT to Codex"]
    
    C --> H["4. Codex implements scoped code/docs and reports verification"]
    E --> H
    H --> I["5a. Inject ANTIGRAVITY_REVIEW_PROMPT to Antigravity to merge and verify Codex work"]
    D --> G["5b. Antigravity applies small review checks or safe integration fixes"]
    I --> G
    
    G --> J["6. Antigravity submits final Review Report to CPO"]
    J --> K["7. CPO (ChatGPT) reviews architecture/UX and approves release"]
```

---

## Report Standard Headers

Whenever an agent returns a report, it must strictly use the designated report header for easy tracking:

* **Antigravity Review / Small Review:** `# Antigravity Review Report`
* **Codex Implementation / Component / Refactor:** `# Codex Task Report`
* **Codex Quiz Gen:** `# Codex Quiz Generation Report`
* **Codex Multi-Report Consolidation:** `# Codex Unified Report`
