const TOPIC_RESPONSES = {
  sql: {
    keywords: ['sql', 'query', 'select', 'join', 'where', 'database', 'table', 'group by'],
    response: `Great choice — SQL is one of the highest-ROI skills in tech right now. Here's the essential mental model:

**The 5 SQL building blocks:**

1. \`SELECT\` — what columns to show
2. \`FROM\` + \`JOIN\` — which tables to use
3. \`WHERE\` — filter rows (before grouping)
4. \`GROUP BY\` + aggregate functions — summarize
5. \`HAVING\` — filter groups (after grouping)

**Real example:**
\`\`\`sql
SELECT
  department,
  COUNT(*) as headcount,
  AVG(salary) as avg_salary
FROM employees
WHERE hire_date > '2022-01-01'
GROUP BY department
HAVING AVG(salary) > 60000
ORDER BY avg_salary DESC;
\`\`\`

**The insider tip:** practice with real datasets (Kaggle has free ones). SQL on paper vs. SQL on a real messy dataset are completely different skills.

Want me to quiz you on this, or go deeper on JOINs specifically?`,
  },

  python: {
    keywords: ['python', 'pandas', 'numpy', 'code', 'function', 'loop', 'list', 'dataframe', 'script'],
    response: `Python is the backbone of modern data work and AI — great that you're focusing on it.

**The data analyst Python toolkit:**

\`\`\`python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# Load data
df = pd.read_csv('sales.csv')

# Explore
print(df.shape)          # rows, columns
print(df.dtypes)         # data types
print(df.isnull().sum()) # missing values

# Clean
df['revenue'] = df['revenue'].fillna(df['revenue'].median())
df = df.dropna(subset=['customer_id'])

# Analyze
monthly = df.groupby('month')['revenue'].sum().reset_index()
print(monthly.sort_values('revenue', ascending=False))
\`\`\`

**The key insight:** DataFrames are just spreadsheets with superpowers. If you can think in Excel, you can think in Pandas.

**Practice tip:** Find a dataset about something you actually care about (sports, music, finance) — you'll learn 3x faster when you're genuinely curious about the data.

What specific part of Python are you working on?`,
  },

  career: {
    keywords: ['job', 'career', 'salary', 'interview', 'resume', 'hire', 'apply', 'linkedin', 'portfolio', 'cv'],
    response: `Career strategy is where most learners leave money on the table. Here's what actually works:

**The hiring reality check:**
Most entry-level analyst jobs don't need a CS degree. They need:
✅ 2-3 solid portfolio projects (real data, real insights)
✅ SQL proficiency (can you write a clean JOIN without googling?)
✅ Excel/Sheets fluency
✅ One visualization tool (Tableau or Power BI)
✅ Clear communication in your writing and interviews

**Salary negotiation (most people skip this):**
- Always negotiate — first offers have 10-20% room
- Anchor high: "Based on my research, I'm targeting $X"
- Get the number in writing before accepting

**Where to find jobs:**
1. LinkedIn (optimize your profile — recruiters do reach out)
2. Indeed / Glassdoor for volume
3. Company career pages directly
4. Referrals from your network (most effective, least used)

**The portfolio that stands out:**
Pick a real-world problem, clean messy data, find an insight, tell the story visually. 2-3 of these beats 10 Coursera certificates.

What stage of the job search are you at? I can give more specific advice.`,
  },

  motivation: {
    keywords: ['stuck', 'hard', 'difficult', 'give up', 'tired', 'frustrated', 'overwhelmed', 'slow', 'boring', 'not getting it'],
    response: `I hear you — and what you're feeling is completely normal. Actually, it's a good sign.

**The neuroscience of learning:**
That "I don't get it" feeling? That's your brain building new neural pathways. The discomfort *is* the learning. It means you're in the growth zone, not coasting.

**What the research actually says:**
- Learning feels linear in the moment, but it's actually step functions
- Most people plateau for days or weeks, then suddenly "click" — you're probably close to a click
- The learners who succeed aren't smarter — they push through the plateau more often

**Right now, try the 20-minute rule:**
1. Write down exactly what you don't understand (1 sentence max)
2. Put it down for 20 minutes — take a walk, drink water
3. Come back and look at it fresh
4. Your brain processes in the background — solutions often appear

**Longer term:**
- Break sessions into 25-minute focused blocks (you already have the timer!)
- Celebrate small wins — seriously, tell yourself "good job" when you finish a session
- Remember *why* you started — what does mastering this unlock for you?

You've already done the hardest thing: you started. What specifically is giving you trouble right now?`,
  },

  tableau: {
    keywords: ['tableau', 'visualization', 'dashboard', 'chart', 'graph', 'power bi', 'visual'],
    response: `Visualization is where data becomes *persuasive* — this is a powerful skill.

**Tableau essentials to know cold:**
- **Dimensions** vs **Measures** — categorical vs numeric
- **Rows/Columns shelf** — builds the chart structure
- **Marks card** — controls color, size, label, detail
- **Filters** — narrow down what's shown
- **Calculated fields** — custom metrics (like SQL but visual)

**The visualization principles that matter:**
1. One chart = one insight. Don't cram 5 things into one visual.
2. Bar charts > pie charts. Almost always.
3. Color should mean something, not just decorate.
4. Your title should state the insight: "Sales up 23% YoY" not just "Sales Chart"

**Dashboard building tip:**
Start with the question, not the chart. Ask: "What decision does this dashboard support?" Then build backwards.

**For interviews:** Be ready to walk through a dashboard you built and explain *why* you chose each visual. The "why" matters more than technical execution.

Want me to help you think through a portfolio dashboard concept?`,
  },

  statistics: {
    keywords: ['statistics', 'stats', 'regression', 'correlation', 'p-value', 'hypothesis', 'standard deviation', 'mean', 'average'],
    response: `Statistics is the language that gives data analysis credibility. Here's what matters most for an analyst role:

**The stats you'll actually use:**
- **Mean, median, mode** — central tendency (know when each is appropriate)
- **Standard deviation** — how spread out the data is
- **Correlation** — relationship between variables (≠ causation!)
- **Percentiles** — understanding distributions
- **Basic hypothesis testing** — is this difference real or random?

**The correlation ≠ causation trap:**
Ice cream sales and drowning rates are correlated (both go up in summer). Always ask: is there a confounding variable? This thinking will make you stand out.

**A/B testing basics (used everywhere):**
\`\`\`
Control group (old button) → 100 clicks / 1000 views = 10% CTR
Test group (new button)   → 130 clicks / 1000 views = 13% CTR
→ Is this 3% difference real, or just random variation?
→ Run a chi-square test or use a stats calculator
\`\`\`

**For job interviews:** You'll often get "how would you measure the success of X?" — think metrics, baselines, and significance.

What specific statistics concept would you like me to break down further?`,
  },

  plan: {
    keywords: ['plan', 'schedule', 'how long', 'how to start', 'where to begin', 'roadmap', 'path', 'study plan'],
    response: `Smart thinking to plan before diving in. Here's a proven framework:

**The 4-phase learning roadmap:**

**Phase 1 — Foundation (25% of time)**
Don't rush this. Weak foundations = constant confusion later.
Focus: core concepts, vocab, mental models

**Phase 2 — Application (35% of time)**
Start building things even when you don't feel ready. Confusion during application is normal and valuable.
Focus: guided projects, exercises, following tutorials with modifications

**Phase 3 — Portfolio (25% of time)**
2-3 self-directed projects solving real problems you care about.
Focus: end-to-end projects, presenting findings clearly

**Phase 4 — Job Ready (15% of time)**
If your goal is employment: resume, LinkedIn, applications, interview prep.
Focus: storytelling, technical interview practice, networking

**Daily rhythm that sticks:**
- Morning (60-90 min): New concepts — brain is fresh
- Evening (45-60 min): Practice + review
- Weekends: Deep work on projects

**The single most important habit:**
Show up consistently at 70% effort rather than sporadically at 100%. Momentum beats intensity every time.

Based on your current schedule, when are your best study windows? I can help you build a specific daily plan.`,
  },
};

const DEFAULT_RESPONSES = [
  `That's a great question — let me give you the most useful answer I can.

The key to really understanding this is to connect it to something you already know. Most concepts in data and tech have elegant analogies that make them click.

Here's how I'd approach learning this:
1. **Understand the why first** — what problem does this solve?
2. **Find the simplest example** — ignore edge cases for now
3. **Build something tiny** — even 10 lines of code that does this
4. **Teach it back** — explain it to me in your own words (this is the real test)

You're making genuine progress by asking this question. The learners who succeed aren't the ones who never get confused — they're the ones who ask questions faster.

What specifically would you like me to clarify first?`,

  `Excellent question — this is one of those concepts that pays dividends across many areas once you get it.

The mental model that helps most people: think about **what it's designed to make easy**. Every tool, concept, and technique exists because someone had a problem and needed a solution. Understanding the original problem makes the solution obvious.

**Practical next steps:**
- Look for a real-world example in a dataset or codebase you can actually touch
- Try to break it intentionally — understanding how something fails teaches you how it works
- Summarize it in one sentence for someone who's never heard of it

You're at the stage where things are connecting. Keep going — the next breakthrough is closer than you think.

Want me to quiz you on what you've learned so far, or would a practice exercise be more helpful?`,

  `Great timing to dig into this. This is foundational knowledge that unlocks a lot downstream.

Here's the honest truth about learning this stuff: it's not about being smart, it's about building the right mental model. Once the model clicks, the rest follows naturally.

**The thing most people miss:**
Don't just learn *what* it does — learn *when* to use it vs. alternatives, and *what can go wrong*. That's the difference between knowing a tool and mastering it.

**Where this shows up in real work:**
In data roles, you'll encounter this constantly. Companies that hire data analysts expect you to apply this in real-time, not just recognize it theoretically.

**Your next move:**
Try applying this to a dataset or problem you actually care about. That emotional connection accelerates learning dramatically.

Should I create a short quiz to test your understanding, or would a worked example be more useful?`,
];

export const getAIResponse = (message) => {
  const lower = message.toLowerCase();

  for (const [, topic] of Object.entries(TOPIC_RESPONSES)) {
    if (topic.keywords.some(k => lower.includes(k))) {
      return topic.response;
    }
  }

  return DEFAULT_RESPONSES[Math.floor(Date.now() / 10000) % DEFAULT_RESPONSES.length];
};

export const GREETING_MESSAGES = [
  "Hi! I'm your AI learning assistant. I can explain concepts, answer questions, create quizzes, and keep you on track. What are you working on today?",
  "Hey! Ready to learn something great? Ask me about any topic you're studying, or tell me what you're stuck on.",
  "Welcome back! Great to see you keeping up your learning momentum. What can I help you with today?",
];

export const SUGGESTED_PROMPTS = [
  "Explain SQL JOINs with a simple example",
  "How do I stay motivated when learning feels hard?",
  "What skills matter most for getting a data job?",
  "Help me plan my study session for today",
  "What's the best way to build a portfolio project?",
  "Explain the difference between correlation and causation",
  "How long will it take me to get job-ready?",
  "Quiz me on what I've been learning",
];
