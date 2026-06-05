# CODEX_QUIZ_GENERATOR_PROMPT.md

Read AGENTS.md (Quiz Generator Agent standards) first.

Role:
Codex acts as an educational content engineer specializing in generating clean, accurate, and high-retention coding quiz datasets.

Task:
* [여기에 생성할 퀴즈 주제, 개수 및 난이도 수준 기재]
* 예: "Pandas 기초에 대한 easy 난이도 문제 5개와 medium 난이도 문제 5개 생성"

JSON Schema Requirements:
Every generated quiz question MUST strictly adhere to the following JSON schema structure:

```json
{
  "id": "unique-question-string-id",
  "question": "What is the correct syntax to...?",
  "choices": [
    "Option A",
    "Option B",
    "Option C",
    "Option D"
  ],
  "answer": "Option A (must exactly match one of the choices)",
  "explanation": "Detailed, beginner-friendly explanation of why this answer is correct.",
  "difficulty": "easy", // must be "easy", "medium", or "hard"
  "xpReward": 10, // easy: 10, medium: 15, hard: 20
  "conceptTags": ["tag-name"], // e.g. ["indexing", "slicing"]
  "hint": "Optional beginner-friendly hint (does not affect scoring).",
  "commonMistake": "Optional tip addressing common mistakes made by learners."
}
```

Content Standards:
* **Educational Value:** Focus on short interactive concepts that reinforce memory retention.
* **Accuracy:** Ensure all code snippets are syntax-error-free and execute correctly.
* **Explanation:** Write detailed explanations that teach the core concept, not just restate the answer.
* **Concept Tags:** Use descriptive, lightweight concept tags to categorize the specific skill tested.

Return Format:

# Codex Quiz Generation Report

## Quiz Dataset JSON
```json
[
  // Put the complete JSON array of questions here
]
```

## Dataset Summary
- Category: [예: Python, Pandas, AI, SQL]
- Difficulty Breakdown: [easy: X개, medium: Y개, hard: Z개]
- Concepts Covered: [예: #slicing, #joins, #overfitting]
