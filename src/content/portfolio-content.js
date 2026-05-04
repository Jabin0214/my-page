import { normalizeLanguage } from '../lib/language.js'

const portfolioContent = {
  en: {
    navigation: {
      brandSuffix: "'s Portfolio",
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
        title: 'Full-stack developer building AI-assisted tools, production websites, and useful systems.',
        description: 'Current work across production websites, workflow tooling, and applied AI products',
        summary:
          'Most of the work I care about sits somewhere between product clarity, operational usefulness, and technical ownership.',
        primaryLink: { path: '/projects', label: 'Projects' },
        secondaryLink: { path: '/contact', label: 'Contact' },
        resumeLabel: 'Resume',
        badge: 'full-stack developer, real-world builder, still very curious',
        chatBubbleText:
          'If you want the short version, ask me about the systems I have shipped, the ones I am building now, or how I make product decisions under real constraints.',
        quickReadLabel: 'Quick read',
        oneSentenceLabel: 'In one sentence',
        askDirectlyLabel: 'Ask me directly',
        factLabels: {
          base: 'Base',
          focus: 'Focus',
          style: 'Style',
        },
        factValues: {
          focus: 'Production systems, workflow tooling, and AI-assisted products',
          style: 'Grounded, ownership-heavy, and focused on useful outcomes',
        },
        notes: [
          {
            label: 'Right now',
            text: 'Working in property operations while building software that removes busywork, improves visibility, and makes awkward systems easier to use.',
          },
          {
            label: 'What I gravitate toward',
            text: 'Production websites, operational tools, applied AI workflows, and products where engineering judgment has to meet real constraints.',
          },
        ],
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
        selectedWorkIntro:
          'These are the projects I would lead with in a serious conversation about product sense, technical ownership, and current level.',
        featuredWorkLink: 'see the full project page',
        workStyleTitle: 'How I tend to approach the work',
        workStyleIntro:
          'Good software usually comes from balancing three things at once: understanding the actual problem, making defensible technical choices, and keeping the end experience clean enough that people want to keep using it.',
        skillSectionTitle: 'Skills',
        projectLabelPrefix: 'Project',
        experienceSnapshotLabel: 'Experience snapshot',
        experienceSnapshotTitle: 'A few roles that best represent how I work now',
        experienceSnapshotDescription:
          'Not the full history, just the parts that best show range, ownership, and what kind of problems I have actually been trusted to work on.',
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
      title: 'A body of work built around live delivery, internal tools, and useful AI.',
      description:
        'The strongest projects here are the ones with real users, real constraints, and clear ownership. Some are live in production, some are internal systems, and some are personal products built to solve very specific problems well.',
      showcaseIntroLabel: 'Showcase view',
      showcaseNote:
        'These projects are less about collecting technologies and more about showing what I can own from problem framing through implementation.',
      showcaseClosing:
        'The thread running through them is usually the same: clear purpose, practical architecture, and enough care that the result feels considered rather than improvised.',
      featuredLabel: 'Featured project',
      viewSourceLabel: 'View on GitHub',
      stackLabel: 'Stack highlights',
      list: [
        {
          id: 1,
          title: 'The Oneness Association — Production Non-Profit Platform',
          description:
            'Delivered a live 48+ page production website and member platform for a registered New Zealand non-profit, covering architecture, authentication, database design, SEO, deployment, and ongoing maintenance.',
          tags: ['Next.js 16', 'React 19', 'TypeScript', 'Prisma', 'PostgreSQL', 'Cloudflare'],
          cover: 'covers/aipodcast.jpg',
          github: 'https://the-one.co.nz/',
        },
        {
          id: 2,
          title: 'Schedora — Property Workflow And Scheduling Platform',
          description:
            'Built independently in response to operational pain inside my current role, Schedora replaces messy manual inspection scheduling and reporting workflows with a cleaner internal system. Containerised and infrastructure-ready, but not yet deployed live.',
          tags: ['.NET 9', 'ASP.NET Core', 'React 19', 'Ant Design', 'PostgreSQL', 'Docker'],
          cover: 'covers/medimate.jpg',
          github: 'https://github.com/Jabin0214/Schedora',
        },
        {
          id: 3,
          title: 'FinanceBro — AI Investment Assistant for Telegram',
          description:
            'A production-deployed Telegram bot that combines Claude tool use, xAI Grok, IBKR integrations, and custom risk tooling to answer portfolio and options questions in natural language. It assists analysis and decision support, but does not execute trades.',
          tags: ['Python 3.13', 'Anthropic SDK', 'Telegram Bot API', 'ib_insync', 'Docker', 'Railway'],
          cover: 'covers/aipodcast.jpg',
          github: 'https://github.com/Jabin0214',
        },
        {
          id: 4,
          title: 'Medimate — Digital Pharmacy System',
          description:
            'Worked as full-stack developer and team lead on a multi-platform pharmacy product spanning SwiftUI, React, Spring Boot, and supporting infrastructure, with AI-assisted medication recognition and production deployment on AWS.',
          tags: ['SwiftUI', 'React', 'Spring Boot', 'MySQL', 'Redis', 'AWS'],
          cover: 'covers/medimate.jpg',
          github: 'https://github.com/Jabin0214/Medimate',
        },
        {
          id: 5,
          title: 'Musichat — Social Music Platform',
          description:
            'An earlier team project that combined Spotify, OpenAI, and real-time messaging into a MERN-based social music experience. Still useful as a signal of full-stack collaboration and API integration work.',
          tags: ['MERN', 'Spotify API', 'OpenAI API', 'Socket.IO', 'Redux'],
          cover: 'covers/musichat.jpg',
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
      noteLabel: 'quick note',
      noteBody:
        'The best conversations usually happen when someone has a real product, workflow, or systems problem and wants to make it cleaner, smarter, or more reliable.',
      noteFooter:
        'Open to full-stack roles, product-minded engineering work, AI-assisted systems, and projects where ownership actually matters.',
      contextLabel: 'Best fit',
      basedInLabel: 'Based in',
      workRightsLabel: 'Work rights',
      workRightsValue: 'Full right to work in New Zealand',
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
      brandSuffix: '的作品集',
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
        title: '做 AI 辅助工具、生产级网站和真正有用系统的全栈开发工程师。',
        description: '现在主要在生产系统、工作流工具和 AI 辅助产品之间做交叉型的全栈工作',
        summary: '我最适合的工作，通常都同时需要产品判断、系统思维和把东西真正做落地的能力。',
        primaryLink: { path: '/projects', label: '项目' },
        secondaryLink: { path: '/contact', label: '联系我' },
        resumeLabel: '简历',
        badge: '全栈开发工程师，也做真实世界里的系统和工具',
        chatBubbleText:
          '如果你想快速了解我，可以直接问我做过哪些系统、现在在做什么，或者我是怎么在真实约束下做技术判断的。',
        quickReadLabel: '快速了解',
        oneSentenceLabel: '一句话概括',
        askDirectlyLabel: '直接问我',
        factLabels: {
          base: '所在地',
          focus: '方向',
          style: '风格',
        },
        factValues: {
          focus: '生产系统、工作流工具与 AI 辅助产品',
          style: '稳、重交付，也愿意自己扛 ownership',
        },
        notes: [
          {
            label: '最近在做',
            text: '一边在真实业务环境里做流程和系统改造，一边继续做独立产品和上线项目。',
          },
          {
            label: '我偏爱的东西',
            text: '生产级网站、内部工作流工具、AI 辅助产品，以及那些真正要面对现实约束的系统。',
          },
        ],
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
        selectedWorkIntro:
          '如果要快速判断我现在的水平、方向和判断方式，这几个项目会比更早期的作品更有代表性。',
        featuredWorkLink: '去看完整项目页',
        workStyleTitle: '我通常怎么处理问题',
        workStyleIntro:
          '我比较相信一个系统要同时站得住三个层面：问题是否真的被理解，技术方案是否合理，以及最终体验是不是足够清楚、顺手、可信。',
        skillSectionTitle: '技能',
        projectLabelPrefix: '项目',
        experienceSnapshotLabel: '经历速写',
        experienceSnapshotTitle: '最能代表我现在工作方式的几段经历',
        experienceSnapshotDescription:
          '不是完整简历，而是几段最能体现我现在做事范围、责任感和落地能力的经历。',
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
      title: '这些项目更能代表我现在真正会做、也真正做过的东西。',
      description:
        '这里最值得看的，不是技术名词本身，而是每个项目背后的问题、交付方式和 ownership。有的已经上线，有的是内部系统，有的是独立产品，但它们都比早期作品更能代表我现在的能力结构。',
      showcaseIntroLabel: '展示视角',
      showcaseNote:
        '这些项目更像我现在能力和判断方式的切片，而不是为了把页面填满。',
      showcaseClosing:
        '贯穿它们的共同点通常是：目标明确、架构讲得通、并且结果真的能被人用起来。',
      featuredLabel: '精选项目',
      viewSourceLabel: '查看 GitHub',
      stackLabel: '技术栈亮点',
      list: [
        {
          id: 1,
          title: 'The Oneness Association — Production Non-Profit Platform',
          description:
            '为新西兰注册非营利组织独立完成并持续维护一个 48+ 页面的网站与会员平台，覆盖架构、认证、数据库、SEO、部署和后续维护，已真实上线运行。',
          tags: ['Next.js 16', 'React 19', 'TypeScript', 'Prisma', 'PostgreSQL', 'Cloudflare'],
          cover: 'covers/aipodcast.jpg',
          github: 'https://the-one.co.nz/',
        },
        {
          id: 2,
          title: 'Schedora — Property Workflow And Scheduling Platform',
          description:
            '从当前工作里的真实痛点出发独立开发的内部流程工具，用来替代低效的人工预约、排程和报告工作。已经完成本地与容器化层面的交付，但还没有对外上线。',
          tags: ['.NET 9', 'ASP.NET Core', 'React 19', 'Ant Design', 'PostgreSQL', 'Docker'],
          cover: 'covers/medimate.jpg',
          github: 'https://github.com/Jabin0214/Schedora',
        },
        {
          id: 3,
          title: 'FinanceBro — AI Investment Assistant for Telegram',
          description:
            '一个已部署到生产环境的 Telegram 投资助手，把 Claude tool use、xAI Grok、IBKR 数据和自定义风险分析工具组合在一起，用自然语言回答投资组合和期权问题，但不执行真实交易。',
          tags: ['Python 3.13', 'Anthropic SDK', 'Telegram Bot API', 'ib_insync', 'Docker', 'Railway'],
          cover: 'covers/aipodcast.jpg',
          github: 'https://github.com/Jabin0214',
        },
        {
          id: 4,
          title: 'Medimate — Digital Pharmacy System',
          description:
            '作为全栈开发兼 team lead 参与多端数字药房系统交付，覆盖 SwiftUI、React、Spring Boot 以及配套部署链路，并参与药品识别 AI 方向和整体交付协作。',
          tags: ['SwiftUI', 'React', 'Spring Boot', 'MySQL', 'Redis', 'AWS'],
          cover: 'covers/medimate.jpg',
          github: 'https://github.com/Jabin0214/Medimate',
        },
        {
          id: 5,
          title: 'Musichat — Social Music Platform',
          description:
            '更早期的团队项目，把 Spotify、OpenAI 和实时聊天整合到一个 MERN 应用里。它仍然能说明我在 API 集成和全栈协作上的基础，但已经不是最能代表我当前水平的项目。',
          tags: ['MERN', 'Spotify API', 'OpenAI API', 'Socket.IO', 'Redux'],
          cover: 'covers/musichat.jpg',
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
      noteLabel: '补充一句',
      noteBody:
        '我通常最适合的工作，是那些既需要扎实交付，也需要一点产品判断和系统思维的场景。',
      noteFooter:
        '比较欢迎的方向包括全栈岗位、产品导向工程工作、AI 辅助系统，以及那些真的需要 ownership 的项目。',
      contextLabel: '适合联系我的场景',
      basedInLabel: '所在地',
      workRightsLabel: '工作权',
      workRightsValue: '拥有新西兰完整工作权',
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
