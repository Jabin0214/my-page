# Jabin Chen - Projects

## Schedora

- Type: Solo project
- Period: Jan 2025 - Present
- Problem:
  - Built to replace manual property inspection scheduling and tenant communication workflows discovered in real operations
- What I built:
  - Full-stack property management platform
  - JWT authentication and role-based access control
  - Property and inspection task management
  - Calendar-style inspection task views
  - Inspection history and report workflows
  - Task type management
  - Google Calendar and Google Sheets integrations
  - Daily background synchronization service
  - AI inspection report polishing with DeepSeek API, producing professional New Zealand property inspection wording with Chinese review support
  - Portfolio-wide dashboard
  - Deployed to Azure App Service
- Stack:
  - .NET 9 / ASP.NET Core
  - React 19
  - Ant Design
  - PostgreSQL
  - Docker
  - Azure App Service
  - Google Workspace APIs
  - DeepSeek API
- GitHub: https://github.com/Jabin0214/Schedora
- Best interview angle:
  - Strongest example of product ownership and building something from zero around a real business problem

## Medimate

- Type: Team project / real-world healthcare product
- Period: Jun 2024 - Dec 2024
- What it is:
  - Multi-platform digital pharmacy system across iOS, web dashboard, and mobile web
- My contribution:
  - Led a 4-person team
  - Owned major frontend work across SwiftUI and React
  - Built AI-supported medication image search workflow
  - Added accessibility-focused Care Mode
  - Helped connect backend systems including RabbitMQ, SSE, and deployment stack
- Stack:
  - SwiftUI
  - React
  - Ant Design
  - Spring Boot
  - MySQL
  - Redis
  - RabbitMQ
  - Docker
  - AWS
  - Nginx
  - GitHub Actions
- GitHub: https://github.com/Jabin0214/Medimate
- Best interview angle:
  - Best example for leadership, healthcare product impact, accessibility, and AI applied to workflow efficiency

## Musichat

- Type: Team project
- Period: Jun 2023 - Nov 2023
- What it is:
  - Real-time social music platform using the MERN stack
- My contribution:
  - Built the Node.js / Express backend
  - Designed MongoDB schemas and optimized queries
  - Implemented Socket.IO real-time messaging and live music review features
  - Helped coordinate delivery using Agile / Trello
- Stack:
  - MongoDB
  - Express
  - React
  - Node.js
  - Redux
  - Socket.IO
  - Spotify API
  - OpenAI API
- GitHub: https://github.com/Jabin0214/Musichat

## Financial Podcast System

- Type: Personal project
- Period: Jan 2025 - Present
- What it is:
  - Stock portfolio and AI news podcast system
- Stack:
  - React
  - Tailwind CSS
  - ASP.NET Core
  - EF Core
  - Azure TTS
  - Docker
  - Azure App Service
  - DeepSeek
  - NewsAPI
- GitHub: https://github.com/Jabin0214/Finmate-Backend

## FinanceBro

- Type: Personal solo project
- Period: 2025 - Present
- Status: Production deployed on Railway with Docker
- What it is:
  - AI-powered personal investment analysis assistant delivered through Telegram
  - Answers natural-language questions about portfolio state, market news, option chains, risk exposure, and strategy ideas
  - It is an analysis and decision-support tool; it does not execute trades
- Agent architecture:
  - Telegram bot receives the user question
  - Claude Sonnet is the main tool-use orchestrator
  - 9 custom tools cover portfolio fetch, HTML reports, news, risk analysis, portfolio briefs, option chains, short-put scanning, and covered-call scanning
  - IBKR Flex Query REST provides portfolio snapshots
  - IB Gateway via ib_insync provides real-time options chains, Greeks, IV, and open interest
  - xAI Grok handles real-time web and X/Twitter search
  - Local Python calculators handle risk metrics such as HHI, concentration, and currency exposure
- AI engineering highlights:
  - Implemented the complete tool-use loop: detect tool_use, execute tool, feed tool_result back, repeat until final answer
  - Built a tool-aware sliding-window history trimmer so tool_use and tool_result pairs do not get split
  - Uses prompt caching for the system prompt
  - Adds cost telemetry with token usage and estimated USD cost per reply
  - Uses multi-LLM composition: Claude for orchestration, Grok for real-time search, Python for deterministic metrics
- Stack:
  - Python 3.13
  - Anthropic SDK
  - xAI Grok API
  - python-telegram-bot
  - ib_insync
  - Docker
  - Railway
- Best interview angle:
  - Strongest AI agent example because it shows tool calling, real data integrations, cost control, memory trimming, and practical workflow automation

## COVID-19 Impact Analysis with Machine Learning

- Type: Academic / machine learning project
- What it is:
  - Data mining project analyzing the impact of COVID-19 on education in Venezuela
- Stack:
  - Python
  - Pandas
  - NumPy
  - Scikit-Learn
  - R
  - IBM SPSS
- GitHub: https://github.com/Jabin0214/DM722
