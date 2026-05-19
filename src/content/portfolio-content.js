import { normalizeLanguage } from '../lib/language.js'

const portfolioContent = {
  en: {
    navigation: {
      links: [
        { path: '/', label: 'Home' },
        { path: '/projects', label: 'Projects' },
        { path: '/contact', label: 'Contact' },
        { path: '/chat', label: 'Chat' },
      ],
      languageToggleLabel: '中文',
      mobileMenuLabel: 'Toggle navigation menu',
    },
    home: {
      hero: {
        title: 'When code is no longer scarce, what is left for developers?',
        primaryLink: { path: '/projects', label: 'Projects' },
        secondaryLink: { path: '/contact', label: 'Contact' },
        resumeLabel: 'Resume',
        badge: 'full-stack developer, real-world builder, still very curious',
      },
      ui: {
        introLabel: 'Current direction',
        introTitle: 'A builder who likes software that earns its keep in the real world.',
        introAccent:
          'The common thread in my work is fairly simple: find the part of the system that is wasting time, adding friction, or hiding useful signal, then rebuild it into something people can actually rely on.',
        signalsTitle: 'A few useful signals',
        signals: [
          'I work best on products where there is a real user, a real process problem, and a real need to ship something that holds up outside a demo.',
          'Recent work spans a live non-profit platform, internal workflow tooling, AI-assisted financial analysis, and production-facing pharmacy systems.',
          'The strongest projects tend to be the ones where product thinking, full-stack delivery, and applied AI all need to co-exist without becoming messy.',
        ],
        featuredWorkLabel: 'Selected work',
        featuredWorkTitle: 'The projects that best represent how I work now',
        featuredWorkLink: 'see the full project page',
        workStyleTitle: 'How I tend to approach the work',
        workStyleIntro:
          'Good software usually comes from balancing three things at once: understanding the actual problem, making defensible technical choices, and keeping the end experience clean enough that people want to keep using it.',
        skillSectionTitle: 'Skills',
        experienceSnapshotLabel: 'Experience snapshot',
        experienceSnapshotTitle: 'A few roles that best represent how I work now',
        educationLabel: 'Background',
        detailLabel: 'A bit more context',
      },
      about: {
        whoAmI: {
          title: 'Who Am I',
          paragraphs: [
            "I am a full-stack developer based in Auckland, currently working close to real operational problems while continuing to build independent products on the side. The work that suits me best usually involves some mix of systems thinking, product judgment, and hands-on delivery.",
            'Recent projects have included a live website and member platform for a registered non-profit, a property workflow tool built from pain points inside my current role, an AI-powered Telegram investment assistant, and a multi-platform digital pharmacy system shipped with a small team.',
          ],
        },
        skills: {
          title: 'Skills',
          list: [
            'React 19',
            'Next.js 16',
            'TypeScript',
            '.NET 9 / ASP.NET Core',
            'PostgreSQL',
            'Docker',
            'Claude / LLM tool use',
            'Prisma ORM',
            'Tailwind CSS',
            'AWS / Cloudflare',
          ],
        },
        experience: {
          title: 'Experience',
          items: [
            {
              company: 'ST International Ltd',
              duration: '01/2025–Present',
              description: 'Property operations, reporting, and workflow improvement inside a very small team managing 100+ rental properties.',
              points: [
                'Coordinate routine inspection scheduling, tenant communication, reporting, and the repetitive operational work that keeps the business moving.',
                'Built Schedora in response to pain points in the old workflow, turning a manual scheduling and reporting burden into a cleaner internal system.',
                'Use Microsoft 365, Google Workspace, and day-to-day operational data to support a high-volume property portfolio in a two-person business.',
              ],
            },
            {
              company: 'FRW Healthcare Limited & ICT Graduate School',
              duration: '06/2024–12/2024',
              description: 'Full-stack developer and team lead for Medimate, a multi-platform digital pharmacy system.',
              points: [
                'Led a 4-person team across SwiftUI, React, Spring Boot, and the supporting data stack for consumer, pharmacist, and admin workflows.',
                'Worked on the iOS experience, React dashboard, AI-assisted medication recognition direction, and deployment infrastructure across Docker, AWS, and Nginx.',
                'Helped deliver a system that improved pharmacist workflow efficiency by 40 percent during UAT.',
              ],
            },
            {
              company: 'The University of Auckland',
              duration: '02/2023–12/2024',
              description: 'Teaching Assistant for Computer Science, supporting undergraduate students across multiple technical environments.',
              points: [
                'Supported 30+ students per term with debugging, environment setup, and practical problem solving across Windows, macOS, and Linux.',
                'Helped students work through IDE, compiler, version-control, and systems issues while also giving structured feedback on coursework.',
              ],
            },
          ],
        },
        education: {
          title: 'Education',
          degrees: [
            'Master of Information Technology, First Class Honours – University of Auckland',
            'Bachelor of Science in Computer Science – University of Auckland',
          ],
        },
        languages: {
          title: 'Languages',
          list: 'English (professional), Mandarin Chinese (native)',
        },
        hobbies: {
          title: 'Hobbies',
          list: 'Exploring • Hiking • GitHub mini-projects',
        },
      },
    },
    projects: {
      eyebrow: 'selected projects',
      title: 'Work that actually shipped.',
      description: 'Real users, real constraints, clear ownership.',
      featuredLabel: 'Featured project',
      viewSourceLabel: 'View on GitHub',
      list: [
        {
          id: 1,
          title: 'The Oneness Association — Production Non-Profit Platform',
          description:
            'Delivered a live 48+ page production website and member platform for a registered New Zealand non-profit, covering architecture, authentication, database design, SEO, deployment, and ongoing maintenance.',
          tags: ['Next.js 16', 'React 19', 'TypeScript', 'Prisma', 'PostgreSQL', 'Cloudflare'],
          cover: 'covers/oneness.png',
          github: 'https://the-one.co.nz/',
        },
        {
          id: 2,
          title: 'Schedora — Property Workflow And Scheduling Platform',
          description:
            'Built independently in response to operational pain inside my current role, Schedora replaces messy manual inspection scheduling and reporting workflows with a cleaner internal system. It is deployed on Azure App Service and includes Google Workspace integrations plus AI report polishing.',
          tags: ['.NET 9', 'ASP.NET Core', 'React 19', 'PostgreSQL', 'Azure App Service', 'DeepSeek API'],
          cover: 'covers/schedora.png',
          github: 'https://github.com/Jabin0214/Schedora',
        },
        {
          id: 3,
          title: 'FinanceBro — AI Investment Assistant for Telegram',
          description:
            'A production-deployed Telegram bot that combines Claude tool use, xAI Grok, IBKR integrations, and custom risk tooling to answer portfolio and options questions in natural language. It assists analysis and decision support, but does not execute trades.',
          tags: ['Python 3.13', 'Anthropic SDK', 'Telegram Bot API', 'ib_insync', 'Docker', 'Railway'],
          cover: 'covers/financebro.png',
          github: 'https://github.com/Jabin0214',
        },
        {
          id: 4,
          title: 'Medimate — Digital Pharmacy System',
          description:
            'Worked as full-stack developer and team lead on a multi-platform pharmacy product spanning SwiftUI, React, Spring Boot, and supporting infrastructure, with AI-assisted medication recognition and production deployment on AWS.',
          tags: ['SwiftUI', 'React', 'Spring Boot', 'MySQL', 'Redis', 'AWS'],
          cover: 'covers/medimate.png',
          github: 'https://github.com/Jabin0214/Medimate',
        },
        {
          id: 5,
          title: 'Musichat — Social Music Platform',
          description:
            'An earlier team project that combined Spotify, OpenAI, and real-time messaging into a MERN-based social music experience. Still useful as a signal of full-stack collaboration and API integration work.',
          tags: ['MERN', 'Spotify API', 'OpenAI API', 'Socket.IO', 'Redux'],
          cover: 'covers/musichat.png',
          github: 'https://github.com/Jabin0214/Music-Chat',
        },
      ],
    },
    contact: {
      sectionTitle: 'Contact Me',
      title: 'A straightforward way to reach me for roles, projects, or useful conversations.',
      description:
        'If you are hiring, building something useful, or just want to talk through product, AI, or full-stack systems work, I am easy to reach and happy to have a serious conversation.',
      emailLabel: 'Email',
      githubLabel: 'GitHub',
      linkedinLabel: 'LinkedIn',
      noteBody:
        'The best conversations usually happen when someone has a real product, workflow, or systems problem and wants to make it cleaner, smarter, or more reliable.',
    },
    chat: {
      eyebrow: 'talk to actual-jabin-ish',
      title: 'This is the part where you can just ask me things.',
      description:
        'It is still AI, to be clear, but the goal is for it to sound like me explaining my work in a thoughtful, grounded way, not like a search engine wearing a blazer.',
      goodPromptsLabel: 'good prompts',
      goodPromptsText:
        'Ask about projects, tradeoffs, AI work, cloud deployment, collaboration, or what kind of engineer I am to work with.',
      bestUseLabel: 'best use',
      bestUseText:
        'Treat it like a recruiter screen, a curious hiring manager, or someone poking around trying to understand how I think.',
      techExplainerLabel: 'under the hood',
      techExplainerTitle: 'How this clone actually works',
      techExplainerIntro:
        'Think of it as a small RAG system wrapped in my speaking style: the model does the talking, but it has to look up my public notes before making claims.',
      techExplainerSteps: [
        {
          title: 'Knowledge files',
          text: 'The source of truth is a set of edited Markdown notes about my projects, experience, skills, personality, and boundaries.',
        },
        {
          title: 'Vector store',
          text: 'Those notes are uploaded to OpenAI, automatically split into searchable chunks, embedded, and indexed for semantic search.',
        },
        {
          title: 'File search',
          text: 'When you ask something, the chat retrieves only the most relevant chunks instead of stuffing every file into the prompt.',
        },
        {
          title: 'Clone layer',
          text: 'A persona prompt controls tone, privacy boundaries, and how to answer when something is not documented.',
        },
      ],
      techExplainerSummary:
        'In plain English: it searches my curated notes first, then answers like a short, grounded version of me.',
      chipFirstPerson: 'first-person replies',
      chipGrounded: 'evidence-backed answers',
      clearChatLabel: 'clear chat',
      startersLabel: 'Conversation starters',
      startersDescription: 'If you are not sure where to start, steal one of these and see where it goes.',
      backLabel: 'Back to Portfolio',
      starterPrefix: 'prompt',
      liveEyebrow: 'Live conversation',
      liveTitle: 'Ask, dig deeper, push back a little',
      emptyTitle: 'No awkward small talk required',
      emptyDescription:
        'Ask about projects, engineering choices, AI work, how I collaborate, what I learned from a project, or what kind of role I’m aiming for. This works best when you ask like a real person, not a dropdown menu.',
      placeholder: 'Ask something real about Jabin, his work, or how he thinks...',
      footerHintPrimary: 'Press Enter to send, Shift+Enter for a new line',
      footerHintSecondary: 'Best results come from specific questions, not generic buzzwords.',
      thinking: 'Thinking...',
      unavailable: 'The assistant is temporarily unavailable. Please try again in a moment.',
      sendLabel: 'Send message',
      copyLabel: 'Copy message',
      copiedLabel: 'Copied',
      stopLabel: 'Stop generating',
      retryLabel: 'Retry',
      suggestedQuestions: [
        'Tell me about yourself.',
        'What are the strongest projects you would highlight in an interview?',
        'How would you describe your experience with cloud deployment?',
        'What is your background in AI-related projects?',
        'Why are you a strong fit for a full-stack role?',
        'Can you walk me through Medimate and your impact there?',
      ],
    },
  },
  zh: {
    navigation: {
      links: [
        { path: '/', label: '首页' },
        { path: '/projects', label: '项目' },
        { path: '/contact', label: '联系我' },
        { path: '/chat', label: '聊天' },
      ],
      languageToggleLabel: 'EN',
      mobileMenuLabel: '切换导航菜单',
    },
    home: {
      hero: {
        title: '代码不再稀缺之后，开发者还剩下什么？',
        primaryLink: { path: '/projects', label: '项目' },
        secondaryLink: { path: '/contact', label: '联系我' },
        resumeLabel: '简历',
        badge: '全栈开发工程师，也做真实世界里的系统和工具',
      },
      ui: {
        introLabel: '现在的方向',
        introTitle: '我更喜欢做那些在真实环境里真的会被人依赖的软件。',
        introAccent:
          '如果一个系统能明显减少重复工作、把信息讲清楚，或者在复杂流程里替人省下很多时间，我通常会对它很有兴趣。',
        signalsTitle: '几个有用的判断信号',
        signals: [
          '我比较擅长的不是做一个好看的 demo，而是把真实问题讲清楚，然后做成别人真的能用的系统。',
          '最近的项目横跨生产网站、内部流程工具、AI 辅助金融分析，以及多端数字药房系统。',
          '最适合我的工作通常同时需要全栈交付、产品判断，以及在现实约束下做取舍的能力。',
        ],
        featuredWorkLabel: '精选内容',
        featuredWorkTitle: '最能代表我现在能力结构的几个项目',
        featuredWorkLink: '去看完整项目页',
        workStyleTitle: '我通常怎么处理问题',
        workStyleIntro:
          '我比较相信一个系统要同时站得住三个层面：问题是否真的被理解，技术方案是否合理，以及最终体验是不是足够清楚、顺手、可信。',
        skillSectionTitle: '技能',
        experienceSnapshotLabel: '经历速写',
        experienceSnapshotTitle: '最能代表我现在工作方式的几段经历',
        educationLabel: '背景',
        detailLabel: '补充信息',
      },
      about: {
        whoAmI: {
          title: '我是谁',
          paragraphs: [
            '我现在在奥克兰，做的是比较贴近真实业务的全栈工作，同时也持续在做自己的独立项目。对我来说，最有意思的工作通常不是堆技术，而是把一个混乱、低效或者信息不透明的问题重构成真正可用的系统。',
            '最近这段时间，我做过已上线的非营利组织平台、基于真实工作痛点开发的物业流程工具、AI 驱动的 Telegram 投资助手，以及和团队一起交付的多端数字药房系统。这些项目合在一起，基本就是我现在最真实的能力轮廓。',
          ],
        },
        skills: {
          title: '技能',
          list: [
            'React 19',
            'Next.js 16',
            'TypeScript',
            '.NET 9 / ASP.NET Core',
            'PostgreSQL',
            'Docker',
            'Claude / LLM tool use',
            'Prisma ORM',
            'Cloudflare',
            'AWS',
            'Tailwind CSS',
          ],
        },
        experience: {
          title: '工作经历',
          items: [
            {
              company: 'ST International Ltd',
              duration: '2025年1月–至今',
              description: '物业运营、报表与流程改进工作，团队很小，但日常问题都很真实。',
              points: [
                '负责 routine inspection 的预约、租客沟通、文书和报表等高频事务，直接接触旧系统和低效流程带来的实际问题。',
                '因为原有流程过于繁琐，所以主动开发了 Schedora，试图把预约、排程和报告这类工作做得更清楚、更省时。',
                '在一个两人协作、管理 100+ 套出租物业的小型环境里，持续处理沟通、文档和运营支持工作。',
              ],
            },
            {
              company: 'FRW Healthcare Limited & ICT Graduate School',
              duration: '2024年6月–2024年12月',
              description: 'Medimate 数字药房系统，全栈开发兼团队负责人。',
              points: [
                '带领 4 人团队在 SwiftUI、React、Spring Boot 以及配套数据架构上推进消费者端、药剂师端和管理端功能。',
                '参与 iOS 体验、React dashboard、药品识别 AI 方向以及 Docker / AWS / Nginx 部署链路。',
                '项目在 UAT 中帮助药剂师工作流效率提升 40%。',
              ],
            },
            {
              company: '奥克兰大学',
              duration: '2023年2月–2024年12月',
              description: '计算机科学助教，长期帮助本科生解决开发环境和课程实现问题。',
              points: [
                '每学期支持 30+ 名学生，处理 IDE、编译器、操作系统、Git 和环境配置问题。',
                '除了批改和反馈，也经常帮助学生把卡住他们的技术问题真正定位并解决。',
              ],
            },
          ],
        },
        education: {
          title: '教育背景',
          degrees: [
            '信息技术硕士（一等荣誉）– 奥克兰大学',
            '计算机科学学士 – 奥克兰大学',
          ],
        },
        languages: {
          title: '语言',
          list: '英语（专业工作水平）, 普通话（母语）',
        },
        hobbies: {
          title: '爱好',
          list: '探索 • 徒步旅行 • GitHub 迷你项目',
        },
      },
    },
    projects: {
      eyebrow: '精选项目',
      title: '一些真正做过的东西。',
      description: '真实用户、真实约束、真实交付。',
      featuredLabel: '精选项目',
      viewSourceLabel: '查看 GitHub',
      list: [
        {
          id: 1,
          title: 'The Oneness Association — Production Non-Profit Platform',
          description:
            '为新西兰注册非营利组织独立完成并持续维护一个 48+ 页面的网站与会员平台，覆盖架构、认证、数据库、SEO、部署和后续维护，已真实上线运行。',
          tags: ['Next.js 16', 'React 19', 'TypeScript', 'Prisma', 'PostgreSQL', 'Cloudflare'],
          cover: 'covers/oneness.png',
          github: 'https://the-one.co.nz/',
        },
        {
          id: 2,
          title: 'Schedora — Property Workflow And Scheduling Platform',
          description:
            '从当前工作里的真实痛点出发独立开发的内部流程工具，用来替代低效的人工预约、排程和报告工作。已部署到 Azure App Service，并集成 Google Workspace 与 AI 检查报告润色。',
          tags: ['.NET 9', 'ASP.NET Core', 'React 19', 'PostgreSQL', 'Azure App Service', 'DeepSeek API'],
          cover: 'covers/schedora.png',
          github: 'https://github.com/Jabin0214/Schedora',
        },
        {
          id: 3,
          title: 'FinanceBro — AI Investment Assistant for Telegram',
          description:
            '一个已部署到生产环境的 Telegram 投资助手，把 Claude tool use、xAI Grok、IBKR 数据和自定义风险分析工具组合在一起，用自然语言回答投资组合和期权问题，但不执行真实交易。',
          tags: ['Python 3.13', 'Anthropic SDK', 'Telegram Bot API', 'ib_insync', 'Docker', 'Railway'],
          cover: 'covers/financebro.png',
          github: 'https://github.com/Jabin0214',
        },
        {
          id: 4,
          title: 'Medimate — Digital Pharmacy System',
          description:
            '作为全栈开发兼 team lead 参与多端数字药房系统交付，覆盖 SwiftUI、React、Spring Boot 以及配套部署链路，并参与药品识别 AI 方向和整体交付协作。',
          tags: ['SwiftUI', 'React', 'Spring Boot', 'MySQL', 'Redis', 'AWS'],
          cover: 'covers/medimate.png',
          github: 'https://github.com/Jabin0214/Medimate',
        },
        {
          id: 5,
          title: 'Musichat — Social Music Platform',
          description:
            '更早期的团队项目，把 Spotify、OpenAI 和实时聊天整合到一个 MERN 应用里。它仍然能说明我在 API 集成和全栈协作上的基础，但已经不是最能代表我当前水平的项目。',
          tags: ['MERN', 'Spotify API', 'OpenAI API', 'Socket.IO', 'Redux'],
          cover: 'covers/musichat.png',
          github: 'https://github.com/Jabin0214/Music-Chat',
        },
      ],
    },
    contact: {
      sectionTitle: '联系我',
      title: '如果你想聊角色、项目，或者只是想认真聊聊要解决的问题，可以直接联系我。',
      description:
        '如果你正在招人、在做一个值得认真打磨的产品，或者刚好需要一个懂全栈、AI 辅助系统和真实交付的人，我很乐意继续聊。',
      emailLabel: '邮箱',
      githubLabel: 'GitHub',
      linkedinLabel: 'LinkedIn',
      noteBody:
        '我通常最适合的工作，是那些既需要扎实交付，也需要一点产品判断和系统思维的场景。',
    },
    chat: {
      eyebrow: '和一个挺像 Jabin 的版本聊天',
      title: '这里的作用，就是你可以直接问我问题。',
      description:
        '当然它本质上还是 AI，但目标是让它更像我本人在解释自己的工作，而不是一个穿着西装的搜索框。',
      goodPromptsLabel: '适合问什么',
      goodPromptsText:
        '可以问项目、技术取舍、AI 相关经历、云部署、协作方式，或者我属于什么类型的工程师。',
      bestUseLabel: '最佳打开方式',
      bestUseText:
        '把它当成 recruiter 初筛、好奇的 hiring manager，或者一个想了解我怎么思考的人来用，会最自然。',
      techExplainerLabel: '背后原理',
      techExplainerTitle: '这个复制人背后怎么工作的',
      techExplainerIntro:
        '可以把它理解成一个小型 RAG 系统，再套上一层我的表达风格：模型负责说话，但事实要先从我整理过的公开资料里找。',
      techExplainerSteps: [
        {
          title: '知识文件',
          text: '最原始的数据是一组整理过的 Markdown：项目、经历、技能、性格、AI 观点和隐私边界都在里面。',
        },
        {
          title: '向量库',
          text: '这些文件会上传到 OpenAI，自动切成小块，做 embedding，然后变成可以按语义搜索的索引。',
        },
        {
          title: '文件检索',
          text: '你提问时，它只调出最相关的几个片段，而不是每次把整套知识库都塞进 prompt。',
        },
        {
          title: '复制人层',
          text: '最后由 persona prompt 控制语气、边界，以及遇到没记录的问题时该怎么坦白。',
        },
      ],
      techExplainerSummary:
        '说白了：先查我整理过的资料，再用一个更像我的短回答讲出来。',
      chipFirstPerson: '第一人称回答',
      chipGrounded: '基于真实经历',
      clearChatLabel: '清空对话',
      startersLabel: '可以直接拿来用的问题',
      startersDescription: '如果你一时不知道从哪开始，直接点一个也完全没问题。',
      backLabel: '返回作品集',
      starterPrefix: '问题',
      liveEyebrow: '实时对话',
      liveTitle: '可以追问，也可以较真一点',
      emptyTitle: '不用尴尬开场白',
      emptyDescription:
        '你可以直接问项目、技术选择、AI 经历、合作方式、从项目里学到了什么，或者我想找什么样的角色。像真实聊天那样问，效果最好。',
      placeholder: '直接问点真实的问题，比如项目、经历、技术选择或职业方向...',
      footerHintPrimary: 'Enter 发送，Shift+Enter 换行',
      footerHintSecondary: '问题越具体，回答通常越像真人。',
      thinking: '正在思考...',
      unavailable: '聊天服务暂时不可用，请稍后再试。',
      sendLabel: '发送消息',
      copyLabel: '复制消息',
      copiedLabel: '已复制',
      stopLabel: '停止生成',
      retryLabel: '重试',
      suggestedQuestions: [
        '可以先介绍一下你自己吗？',
        '如果是在面试里，你会重点讲哪几个项目？',
        '你会怎么描述自己在云部署方面的经验？',
        '你做过哪些和 AI 相关的项目或工作？',
        '为什么你适合全栈岗位？',
        '可以详细讲讲 Medimate 以及你的具体贡献吗？',
      ],
    },
  },
}

export function resolveContentLocale(language) {
  return normalizeLanguage(language)
}

export function getPortfolioContent(language) {
  return portfolioContent[resolveContentLocale(language)]
}
