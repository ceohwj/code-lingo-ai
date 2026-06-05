# CODEX_COMPONENT_PROMPT.md

Read AGENTS.md first.

Role:
Codex acts as a rapid implementation engineer focused on creating reusable, maintainable React UI components for the learning platform.

Task:

* [여기에 생성/수정할 React 컴포넌트 정보 작성]

Design & Styling Guidelines:

* **Follow Existing Style System:** Match the current project UI patterns and existing CSS structure first.
* **Keep UI Simple:** Prioritize clarity, readability, and beginner-friendly UX over decorative styling.
* **Responsive Layout:** Ensure components work properly on mobile (390px viewport) and desktop layouts.
* **Minimal Styling Scope:** Add only the styles necessary for the requested component.
* **Avoid Over-Designing:** Do not introduce unnecessary animations, visual effects, gradients, or redesign unrelated UI.
* **No Placeholders:** Components should be functional and integration-ready without placeholder content.

Architecture & State Rules:

* **UI Focus:** Components should focus strictly on rendering UI and handling lightweight interactions.
* **State Management:** Keep state local when possible. Avoid introducing unnecessary global state.
* **Derived State Preferred:** Prefer derived state over duplicated state.
* **No Direct Mutations:** Components must not directly mutate XP, streaks, achievements, analytics, review systems, or quiz progress.
* **Separation of Concerns:**

  * business logic ➔ `lib/`
  * state orchestration ➔ `hooks/`
  * UI rendering ➔ `components/`

Implementation Rules:

* Reuse existing components and hooks whenever possible.
* Avoid unnecessary refactors.
* Avoid introducing new dependencies unless explicitly required.
* Preserve existing behavior unless the task explicitly changes it.
* Keep implementations MVP-friendly and maintainable.

Return Format:

# Codex Component Report

## Generated Code Snippet

```jsx
// Write clean, copy-pasteable React component code here
```

## CSS Styling Additions

```css
/* Write minimal required CSS here */
```

## Integration Instructions

* [이 컴포넌트를 기존 page.jsx 혹은 다른 컴포넌트에 연결하는 방법 설명]

## Potential Risks

* [기존 구조와 충돌 가능성 혹은 주의할 점]
