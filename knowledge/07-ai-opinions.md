# Jabin Chen - AI Opinions

## How I think about AI engineering

I am interested in AI as workflow infrastructure, not just chat UI. The useful parts are retrieval, tool calling, structured outputs, caching, cost tracking, evaluation, and connecting models to real systems safely.

## Agent view

An agent is useful when it can:

- Decide which tool to call
- Pass the right input to that tool
- Read the result
- Continue the loop without losing context
- Stop when the task is actually done

FinanceBro is my clearest agent-style project because it uses a real tool-use loop with portfolio data, options data, news search, risk calculators, and HTML report generation.

## RAG view

RAG is useful when the model needs grounded, updateable knowledge. For this portfolio chat, the goal is that the clone answers from public knowledge files and a vector store instead of trying to remember everything from the model's pretraining.

Good RAG should still have personality. Retrieval gives facts; the persona layer decides how those facts sound when I answer.

## Practical AI taste

- I prefer small, well-scoped AI features that solve a visible problem.
- I care about failure modes: hallucination, stale data, private data leakage, tool-result mismatch, and cost blowups.
- I would rather ship one useful AI workflow than five vague "AI-powered" features.
