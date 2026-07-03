# ROADMAP.md

# Vision
Build a coding learning platform that users continuously use daily, inspired by Duolingo-style learning loops and AI-assisted education.

Core focus:
- Learning effectiveness
- Daily retention
- Scalable architecture
- AI-assisted learning
- Portfolio-quality engineering

---

# Phase 1. MVP Stabilization
Goal:
Make the current quiz app stable, readable, and maintainable.

Status:
Completed

Core Priorities:
- Stable quiz experience
- Reusable component structure
- Reliable progress saving
- Beginner-friendly UX

Completed:
- [x] Basic quiz screen
- [x] Category selection before quiz start
- [x] Reusable quiz components
- [x] Separate quiz data from UI logic
- [x] JSON question data structure
- [x] localStorage progress save and restore
- [x] Category-specific progress storage
- [x] Improved quiz progress summary
- [x] Retry preserves saved category XP and completed-question progress
- [x] Refined dashboard information hierarchy
- [x] Mobile-friendly core layouts
- [x] Initial and focused logic tests
- [x] Project status and daily log workflow

Next Priorities:
- [x] Browser-level regression checks for key quiz flows
- [x] Browser-level retry check for session XP versus total XP behavior
- [x] Keep verification notes current as the local environment changes
- [ ] Continue reducing page-level state complexity when safe

Success Criteria:
- Users can complete quizzes without bugs
- Build/test consistently pass in a fully configured local environment
- Codebase remains maintainable

---

# Phase 2. Learning System
Goal:
Make the app feel like a real learning product.

Core Priorities:
- Learning retention
- User motivation
- Habit formation

Completed:
- [x] XP system
- [x] Difficulty levels
- [x] Topic categories
- [x] Wrong-answer review mode
- [x] Review recommendations
- [x] Weak-area insights
- [x] Concept focus analytics
- [x] Explanation cards
- [x] Optional common mistake helper text
- [x] Optional beginner-friendly hints for selected questions
- [x] Quiz progression system
- [x] Daily streak tracking
- [x] Daily goal tracking
- [x] Category progress dashboard

Next Priorities:
- [ ] Expand question coverage per category
- [ ] Continue improving explanation quality and consistency
- [ ] Add lightweight learning statistics dashboard

Future Expansion:
- Adaptive difficulty
- Personalized review system
- Spaced repetition
- Daily quiz mode

Success Criteria:
- Users feel progression and motivation
- Users return daily
- Review system improves retention

---

# Phase 3. Content Expansion
Goal:
Expand educational content while keeping learning quality high.

Core Priorities:
- Structured learning progression
- AI + bio portfolio positioning
- Real-world examples

Learning Tracks:
- [x] Python basics
- [x] SQL basics
- [x] AI basics
- [x] Bioinformatics basics
- [x] Pandas
- [x] NumPy
- [ ] Machine learning
- [ ] XAI
- [ ] Bio/healthcare data examples

Content Improvements:
- [x] Difficulty-based quizzes
- [x] Explanation support
- [x] Optional common mistake support
- [x] Concept-tagged questions
- [x] Hint-supported questions
- [ ] Real dataset examples
- [ ] Practical mini challenges

Success Criteria:
- Users can learn progressively
- Content feels practical and educational
- Project becomes portfolio-worthy

---

# Phase 4. AI Tutor System
Goal:
Add AI-assisted personalized learning.

Core Priorities:
- Personalized explanations
- Intelligent feedback
- Adaptive learning support

Future Features:
- [ ] Personalized wrong-answer explanations
- [ ] Personalized hints
- [ ] Concept summaries
- [ ] AI-generated quizzes
- [ ] Learning weakness analysis
- [ ] AI tutor chat
- [ ] Personalized curriculum
- [ ] Dynamic quiz generation

Success Criteria:
- Users receive meaningful feedback
- AI improves learning quality
- Explanations feel personalized

---

# Phase 5. Retention & Growth
Goal:
Increase long-term engagement and daily usage.

Core Priorities:
- Habit formation
- User retention
- Motivation systems

Completed:
- [x] Daily streaks
- [x] Daily goals
- [x] Category progress dashboard
- [x] Achievement system

Future Features:
- [x] XP milestones
- [ ] Weekly challenges
- [x] Learning statistics dashboard
- [ ] Shareable progress cards
- [ ] Friend system
- [ ] Leaderboards
- [ ] Community challenges

Success Criteria:
- Users return consistently
- Users feel rewarded
- Engagement increases over time

---

# Phase 6. Platform Scalability
Goal:
Prepare the app for larger scale usage.

Core Priorities:
- Scalable architecture
- Database integration
- Analytics infrastructure

Future Features:
- [ ] Backend API integration
- [ ] Database migration
- [ ] Authentication system
- [ ] Cloud deployment
- [ ] Learning analytics
- [ ] Content management structure

Success Criteria:
- Architecture scales safely
- User data becomes manageable
- Analytics support product decisions

---

# Phase 7. Portfolio & Production Polish
Goal:
Make the project production-ready and portfolio-worthy.

Core Priorities:
- Professional presentation
- Clear technical storytelling
- Deployable product quality

Future Features:
- [x] Improve README
- [x] Add screenshots
- [ ] Add demo video/GIF
- [ ] Write Velog development logs
- [ ] Document architecture
- [ ] Add deployment guide
- [ ] Improve accessibility
- [ ] Improve performance optimization

Success Criteria:
- Strong GitHub portfolio project
- Strong interview discussion material
- Publicly deployable learning platform
