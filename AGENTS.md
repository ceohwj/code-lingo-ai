# CodeLingo AI - AGENTS.md

# Project Role

CodeLingo AI is a portfolio-oriented coding learning web application inspired by Duolingo-style learning systems.

The platform focuses on:

* short interactive quizzes
* explanation-based learning
* XP and progression systems
* review/repetition systems
* adaptive learning loops
* long-term retention

The goal is to build a scalable learning service that users can continuously use and enjoy daily.

---

# Product Vision

Build an AI-assisted learning platform that helps users learn:

* Python
* Data Analysis
* AI / Machine Learning
* Bioinformatics

through lightweight daily learning experiences.

The platform should prioritize:

* learning effectiveness
* long-term retention
* maintainable architecture
* scalable systems
* portfolio-quality engineering

---

# Core Product Principles

* Prioritize learning effectiveness
* Prioritize long-term retention over feature quantity
* Keep onboarding simple
* Keep feedback immediate and clear
* Keep architecture scalable
* Avoid unnecessary complexity during MVP stage
* Improve one small feature at a time
* Prefer stable incremental growth over rapid expansion

---

# Development Philosophy

This project follows an iterative MVP workflow.

Goals:

* ship small improvements daily
* maintain architecture stability
* improve user retention gradually
* keep the codebase understandable
* keep systems explainable for portfolio/interviews

Avoid:

* feature overload
* premature optimization
* unnecessary abstractions
* uncontrolled refactors
* architecture rewrites during MVP stage

---

# Multi-Agent Workflow

## ChatGPT

Role:

* Product Owner
* PM
* Architecture Reviewer
* UX Strategist
* Portfolio Strategist

Responsibilities:

* decide priorities
* review architecture
* analyze technical debt
* maintain MVP scope
* improve portfolio quality
* create implementation tasks

---

## Antigravity

Role:

* Tech Lead
* Local Build Engineer
* Integration Agent

Responsibilities:

* integrate implementations locally
* modify files safely
* validate runtime behavior
* run tests/build
* verify architecture compatibility
* update project documentation

---

## Codex

Role:

* Production Engineer
* Rapid Implementation Agent

Responsibilities:

* implement isolated features
* generate reusable components
* generate quiz datasets
* implement utility functions
* assist repetitive coding tasks

---

# Prompt Toolkit

Use the smallest prompt surface that fits the work:

* `CODEX_TASK_PROMPT.md` for scoped implementation, component, bug-fix, and behavior-preserving refactor work
* `CODEX_QUIZ_GENERATOR_PROMPT.md` for quiz dataset generation and content expansion
* `CODEX_REPORT_PROMPT.md` for consolidating multiple Codex outputs into one handoff
* `ANTIGRAVITY_REVIEW_PROMPT.md` for local verification, integration review, and small-review mode

Deprecated prompt files should not be recreated unless the workflow becomes complex enough to justify a separate template again.

---

# Context7 MCP Usage Policy

Use Context7 only when current external documentation is needed for implementation or review.

Use Context7 for:

* framework, library, API, deployment, or tooling questions where docs may have changed
* version-specific implementation details
* unfamiliar third-party package behavior

Do not use Context7 for:

* local project facts already available in the repository
* documentation-only process updates
* quiz content edits unless external library or API behavior is involved

When Context7 is used, reports must state what was checked and how it affected the work. When it is not used, reports must explicitly say why.

---

# Agent Roles

## 1. Product Manager Agent

Responsibilities:

* Define MVP scope
* Prioritize features
* Prevent feature overload
* Keep project aligned with learning goals
* Improve long-term user retention

Must Evaluate:

* Will users continue using this app daily?
* Is this feature MVP-friendly?
* Does this improve engagement?
* Does this increase retention?

---

## 2. Learning Experience Agent

Responsibilities:

* Improve learning effectiveness
* Reduce user frustration
* Improve review/repetition systems
* Suggest adaptive learning systems

Must Evaluate:

* Does this improve understanding?
* Does this improve memory retention?
* Does this improve quiz feedback quality?
* Does this reduce cognitive overload?

---

## 3. Quiz Generator Agent

Responsibilities:

* Create quiz questions
* Add explanations
* Organize by category and difficulty
* Improve quiz quality and progression

Quiz Standards:

Each quiz should contain:

* question
* choices
* answer
* explanation
* category
* difficulty
* xpReward

Optional fields:

* commonMistake
* conceptTag
* hint

Must Evaluate:

* Is quiz difficulty balanced?
* Are explanations educational?
* Is progression smooth?
* Are weak concepts reinforced properly?

---

## 4. UI Agent

Responsibilities:

* Improve layout and UX
* Keep UI simple and responsive
* Improve onboarding clarity
* Improve mobile usability

Must Evaluate:

* Is the interface beginner-friendly?
* Is the feedback visually clear?
* Is the learning flow intuitive?
* Is UI complexity minimized?

---

## 5. Refactor Agent

Responsibilities:

* Clean code structure
* Reduce duplication
* Improve maintainability
* Prevent unnecessary abstraction

Must Evaluate:

* Is code reusable?
* Is logic duplicated?
* Is this over-engineered?
* Is abstraction actually necessary?

---

## 6. Test Agent

Responsibilities:

* Check build errors
* Check failing tests
* Suggest edge cases
* Verify feature stability

Must Evaluate:

* Did npm test pass?
* Did npm run build pass?
* Are edge cases handled?
* Does the feature break existing behavior?

---

## 7. Documentation Agent

Responsibilities:

* Update DAILY_LOG.md
* Keep PROJECT_STATUS.md current
* Summarize completed work
* Track technical debt and issues

Must Evaluate:

* Is documentation clear?
* Is progress traceable?
* Are known issues documented?
* Is documentation scalable?

---

## 8. Architecture Agent

Responsibilities:

* Keep folder structure scalable
* Maintain reusable component structure
* Prepare for future backend/database integration
* Prevent architecture collapse as project grows

Must Evaluate:

* Can this scale later?
* Is folder structure clean?
* Is quiz/data logic separated properly?
* Is state architecture stable?

---

## 9. Growth Agent

Responsibilities:

* Improve retention systems
* Suggest habit-forming features
* Improve daily engagement

Must Evaluate:

* Does this increase daily return rate?
* Does this encourage consistency?
* Does this improve motivation?

Suggested Features:

* Daily streaks
* Weekly challenges
* XP milestones
* Achievement systems

---

## 10. Portfolio Strategy Agent

Responsibilities:

* Keep project portfolio-worthy
* Suggest technically meaningful systems
* Improve resume/interview value

Must Evaluate:

* Is this feature technically meaningful?
* Can this be explained clearly in interviews?
* Does this strengthen AI + education positioning?
* Does this improve engineering storytelling?

---

# State Architecture Rules

* Prefer derived state over duplicated state
* Avoid multiple sources of truth
* Keep feature state localized when possible
* Avoid deeply nested prop drilling
* Shared business logic belongs in lib/
* React orchestration belongs in hooks/
* Components should focus on rendering UI
* Avoid scattering feature logic across components
* Keep systems loosely coupled
* Avoid direct mutation across unrelated systems

Examples:

* achievements should not directly mutate XP
* review systems should not directly mutate streaks
* UI components should not contain business logic

---

# Feature Introduction Rules

Before adding a new feature:

* Verify whether existing systems can support it
* Prefer extending current systems over creating new systems
* Avoid introducing unnecessary global state
* Avoid tightly coupling unrelated systems
* Prefer incremental improvements
* Prioritize MVP-friendly implementation

Questions:

* Does this improve learning effectiveness?
* Does this improve retention?
* Is this maintainable?
* Is this scalable later?
* Is this portfolio meaningful?

---

# Coding Rules

* Keep components small and readable
* Reuse existing components when possible
* Keep quiz data separated from UI logic
* Prefer clear variable names
* Avoid unnecessary refactors
* Avoid premature backend complexity
* Keep state management simple
* Prefer scalable data structures
* Keep functions focused on one responsibility
* Prefer readability over clever abstractions

---

# Folder Structure Rules

Recommended structure:

/app
/components
/hooks
/lib
/data
/docs
/tests

Rules:

* business logic → lib/
* hooks/state orchestration → hooks/
* UI rendering → components/
* static datasets → data/
* project tracking → docs/

---

# Documentation Rules

PROJECT_STATUS.md:

* concise feature overview
* organized by feature groups
* avoid detailed logs

DAILY_LOG.md:

* chronological only
* include:

  * Today’s Goal
  * Completed Work
  * Issues
  * Verification
  * Next Tasks
  * Antigravity & Agent Report

ROADMAP.md:

* future priorities only
* major milestones only
* mark completed items clearly

General Rules:

* avoid duplicated documentation
* keep docs readable as project scales
* keep logs concise
* keep progress traceable

Codex Report Format:

* Files changed
* What changed
* Context7 Check
* Verification
* Issues
* Next recommended task

Before writing timestamps in DAILY_LOG.md:

* verify local time using:
  date

---

# Technical Debt Policy

Allowed:

* small temporary duplication during MVP stage
* lightweight UI shortcuts
* simple local state solutions

Avoid:

* large rewrites during MVP
* premature optimization
* unnecessary abstraction layers
* introducing complexity without clear value
* adding dependencies for small problems

Technical debt should be:

* documented
* isolated
* intentionally temporary

---

# Validation Rules

After implementation:

* run npm test
* run npm run build
* verify runtime behavior
* report failures clearly

If verification cannot run:

* explain environment limitation explicitly

---

# Scalability Goals

The architecture should support future:

* backend integration
* database systems
* authentication
* adaptive learning systems
* recommendation systems
* AI-generated quizzes
* analytics dashboards
* bioinformatics learning modules

without requiring major rewrites.

---

# Portfolio Goals

This project should demonstrate:

* AI-assisted software engineering workflow
* scalable frontend architecture
* educational product thinking
* learning system design
* retention-oriented UX
* modular React architecture
* maintainable MVP scaling

The project should be explainable in:

* resumes
* technical interviews
* portfolio presentations
* GitHub documentation
* blog posts

---

# Final Principle

Build slowly, clearly, and sustainably.

A stable and explainable MVP is more valuable than a large unstable system.
