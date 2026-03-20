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
        title: 'Hello, I am Jabin',
        description: 'Full Stack Developer / Tech Enthusiast / Lifelong learner',
        summary:
          'I like building things that feel useful, a little thoughtful, and not painfully boring to use.',
        primaryLink: { path: '/projects', label: 'Projects' },
        secondaryLink: { path: '/contact', label: 'Contact' },
        resumeLabel: 'Resume',
        badge: 'software engineer, occasional tinkerer, definitely curious',
        scrollLabel: 'scroll for the good stuff',
        chatBubbleText: 'Curious? Click me and ask the AI version of me a few questions.',
        quickReadLabel: 'Quick read',
        oneSentenceLabel: 'In one sentence',
        askDirectlyLabel: 'Ask me directly',
        factLabels: {
          base: 'Base',
          focus: 'Focus',
          style: 'Style',
        },
        factValues: {
          focus: 'Full-stack + AI product work',
          style: 'Curious, pragmatic, ship-minded',
        },
        notes: [
          {
            label: 'Right now',
            text: 'Building a portfolio that feels more like a person and less like a template.',
          },
          {
            label: 'What I gravitate toward',
            text: 'Full-stack products, AI-flavored ideas, clean UX, and systems that actually ship.',
          },
        ],
      },
      ui: {
        introTitle: 'A slightly more human intro',
        signalsTitle: 'A few useful signals',
        signals: [
          'I enjoy building products where engineering and user experience have to work together, not compete.',
          'I care a lot about shipping things that feel clean, useful, and well thought through under the hood.',
          'When a project mixes full-stack work, AI, and practical product tradeoffs, I’m usually interested.',
        ],
        featuredWorkLabel: 'Selected work',
        featuredWorkTitle: 'Projects with actual personality',
        featuredWorkLink: 'see the full project page',
        workStyleTitle: 'A clear picture of how I work',
        skillSectionTitle: 'Skills',
        projectLabelPrefix: 'Project',
      },
      about: {
        whoAmI: {
          title: 'Who Am I',
          paragraphs: [
            "Hi, I'm Jabin Chen — a Master's graduate from the University of Auckland and a passionate developer who enjoys building impactful tech solutions. With hands-on experience in JavaScript, C#, and Python, I've developed full-stack applications using frameworks such as React, ASP.NET Core, and Node.js.",
            "Driven by creativity and curiosity, I'm especially interested in how emerging technologies — particularly AI and cloud computing — can enhance user experiences and address real-world challenges. I'm always open to meaningful conversations about innovation and the future of technology.",
          ],
        },
        skills: {
          title: 'Skills',
          list: [
            'React.js',
            'Node.js',
            'C#',
            'Swift',
            'Docker',
            'AWS',
            'ASP.NET',
            'TypeScript',
            'Machine Learning',
            'UI/UX Design',
          ],
        },
        experience: {
          title: 'Experience',
          items: [
            {
              company: 'FRW Healthcare Limited & ICT Graduate School',
              duration: '07/2024–12/2024',
              description: 'AI-powered medication purchasing platform.',
              points: [
                'Developed cross-platform UI with Swift (iOS) and React.js (Web); scalable RESTful APIs using Spring Boot.',
                'Containerized applications with Docker, deployed on AWS with Nginx, and implemented CI/CD pipelines.',
                'Enhanced pharmacy workflow efficiency by 40% through AI-driven automation and system performance tuning.',
              ],
            },
            {
              company: 'The University of Auckland',
              duration: '02/2023–12/2024',
              description: 'Teaching Assistant for Computer Science courses.',
              points: [
                'Evaluated and graded assignments for Principles of Programming, Software Fundamentals, and Computer Organisation.',
                'Provided feedback and additional learning support to students, improving academic performance and understanding.',
              ],
            },
            {
              company: 'Musichat',
              duration: '07/2023–11/2023',
              description: 'Full Stack Developer for AI-integrated music web application.',
              points: [
                'Built full-stack app using MERN stack, integrating Spotify API for music playback and OpenAI API for conversational AI.',
                'Implemented real-time chat with Socket.IO; optimized MongoDB for high concurrency in an Agile environment.',
              ],
            },
            {
              company: 'AI Financial Platform (Personal Project)',
              duration: '01/2025–Present',
              description: 'Stock portfolio and AI news podcast system.',
              points: [
                'Developed responsive frontend with React and Tailwind; secure routing via context-based authentication.',
                'Designed layered RESTful APIs with ASP.NET Core and EF Core; integrated DeepSeek and NewsAPI for financial summaries.',
                'Converted summaries into podcasts using Azure TTS; deployed services via Docker and Azure App Service with CI/CD.',
              ],
            },
            {
              company: 'Danone Nutricia (Virtual Internship)',
              duration: '06/2023',
              description: 'Display-only productivity web app.',
              points: [
                'Built a responsive frontend using React.js and designed user flows in Figma.',
                'Developed RESTful APIs with Python Flask to retrieve and serve production order documents.',
              ],
            },
          ],
        },
        education: {
          title: 'Education',
          degrees: [
            'Master of Information Technology – University of Auckland',
            'Bachelor of Science in Computer Science – University of Auckland',
          ],
        },
        languages: {
          title: 'Languages',
          list: 'English, Mandarin-Chinese',
        },
        hobbies: {
          title: 'Hobbies',
          list: 'Exploring • Hiking • GitHub mini-projects',
        },
      },
    },
    projects: {
      sectionTitle: 'My Projects',
      eyebrow: 'selected projects',
      title: 'Things I built because they felt worth building.',
      description:
        'I like projects that combine engineering judgment, product thinking, and a little experimentation. This page is less “gallery wall” and more “here’s what I actually made, why I made it, and what’s interesting about it.”',
      featuredLabel: 'Featured project',
      viewSourceLabel: 'View on GitHub',
      interestingLabel: 'What makes it interesting',
      interestingText:
        'This is the kind of project where I had to connect product intent with actual implementation choices, not just make a UI look passable.',
      stackLabel: 'Stack highlights',
      list: [
        {
          id: 1,
          title: 'Medimate - AI-powered Medication Assistance',
          description:
            'Developed an innovative application that automates medication purchases by extracting data from product images using AI-driven image recognition.',
          tags: ['React', 'Swift', 'ASP.NET', 'Docker', 'OpenAI API', 'AWS'],
          cover: 'covers/medimate.jpg',
          github: 'https://github.com/Jabin0214/Medimate',
        },
        {
          id: 2,
          title: 'MusicChat - AI-Enhanced Social Music Platform',
          description:
            'Built a full-stack web application integrating Spotify and OpenAI APIs, allowing users to review, chat, and discover music interactively.',
          tags: ['MERN Stack', 'React', 'Node.js', 'MongoDB', 'Express', 'OpenAI API'],
          cover: 'covers/musichat.jpg',
          github: 'https://github.com/Jabin0214/Music-Chat',
        },
        {
          id: 3,
          title: 'Financial Podcast System',
          description:
            'Developed a stock portfolio and AI news podcast system, integrating financial summaries and podcasts using Azure TTS.',
          tags: ['React', 'ASP.NET Core', 'Azure', 'Docker', 'DeepSeek', 'NewsAPI'],
          cover: 'covers/aipodcast.jpg',
          github: 'https://github.com/Jabin0214/Finmate-Backend',
        },
        {
          id: 4,
          title: 'COVID-19 Impact Analysis with Machine Learning',
          description:
            "Conducted data mining on COVID-19's effect on education in Venezuela using CRISP-DM methodology, building ML models to predict school dropout rates.",
          tags: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'R', 'IBM SPSS'],
          cover: 'covers/covid.jpg',
          github: 'https://github.com/Jabin0214/DM722',
        },
      ],
    },
    contact: {
      sectionTitle: 'Contact Me',
      title: "Let's make it easy to reach me.",
      description:
        'I am always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!',
      emailLabel: 'Email',
      githubLabel: 'GitHub',
      noteLabel: 'quick note',
      noteBody:
        'If you want the short version: I like building thoughtful software, I’m easy to work with, and I enjoy conversations where someone actually wants to make something better.',
      noteFooter: 'Recruiter, founder, hiring manager, curious human: all welcome.',
      contextLabel: 'Context',
      basedInLabel: 'Based in',
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
      liveChip: 'best with real questions',
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
        title: '你好，我是 Jabin',
        description: '全栈开发工程师 / 技术爱好者 / 创造者',
        summary: '我喜欢做那些有用、有一点思考、而且不会让人用得很痛苦的东西。',
        primaryLink: { path: '/projects', label: '项目' },
        secondaryLink: { path: '/contact', label: '联系我' },
        resumeLabel: '简历',
        badge: '软件工程师，偶尔折腾东西，持续保持好奇',
        scrollLabel: '往下看看更有意思的内容',
        chatBubbleText: '好奇的话，点我一下，问问这个 AI 版的我。',
        quickReadLabel: '快速了解',
        oneSentenceLabel: '一句话概括',
        askDirectlyLabel: '直接问我',
        factLabels: {
          base: '所在地',
          focus: '方向',
          style: '风格',
        },
        factValues: {
          focus: '全栈与 AI 产品开发',
          style: '好奇、务实、偏交付',
        },
        notes: [
          {
            label: '最近在做',
            text: '把这个作品集做得更像一个真实的人，而不是一个模板站。',
          },
          {
            label: '我偏爱的东西',
            text: '全栈产品、带一点 AI 味道的想法、干净的体验，以及真正能落地的系统。',
          },
        ],
      },
      ui: {
        introTitle: '一个稍微更像人的自我介绍',
        signalsTitle: '几个有用的判断信号',
        signals: [
          '我喜欢做那种工程和用户体验必须一起成立，而不是互相拖后腿的产品。',
          '我很在意把东西做得干净、好用，而且底层实现也讲得通。',
          '如果一个项目同时涉及全栈、AI 和真实的产品取舍，我通常会很感兴趣。',
        ],
        featuredWorkLabel: '精选内容',
        featuredWorkTitle: '几个比较有个性的项目',
        featuredWorkLink: '去看完整项目页',
        workStyleTitle: '更清楚地了解我是怎么做事的',
        skillSectionTitle: '技能',
        projectLabelPrefix: '项目',
      },
      about: {
        whoAmI: {
          title: '我是谁',
          paragraphs: [
            '嗨，我是 Jabin Chen — 一位奥克兰大学的硕士毕业生，也是一位热衷于构建有影响力的技术解决方案的热情开发者。凭借在 JavaScript、C# 和 Python 方面的实践经验，我使用 React、ASP.NET Core 和 Node.js 等框架开发了全栈应用程序。',
            '在创造力和好奇心的驱动下，我对新兴技术，尤其是人工智能和云计算，如何增强用户体验和解决现实世界的挑战特别感兴趣。我总是乐于就创新和技术的未来进行有意义的对话。',
          ],
        },
        skills: {
          title: '技能',
          list: [
            'React.js',
            'Node.js',
            'C#',
            'Swift',
            'Docker',
            'AWS',
            'ASP.NET',
            'TypeScript',
            '机器学习',
            'UI/UX 设计',
          ],
        },
        experience: {
          title: '工作经历',
          items: [
            {
              company: 'FRW Healthcare Limited & ICT Graduate School',
              duration: '2024年7月–2024年12月',
              description: 'AI 驱动的药物购买平台。',
              points: [
                '使用 Swift (iOS) 和 React.js (Web) 开发跨平台用户界面；使用 Spring Boot 开发可扩展的 RESTful API。',
                '使用 Docker 对应用程序进行容器化，在 AWS 上使用 Nginx 部署，并实施 CI/CD 管道。',
                '通过 AI 驱动的自动化和系统性能调优，将药房工作流程效率提高了 40%。',
              ],
            },
            {
              company: '奥克兰大学',
              duration: '2023年2月–2024年12月',
              description: '计算机科学课程助教。',
              points: [
                '评估和批改了《编程原理》《软件基础》和《计算机组成》的作业。',
                '为学生提供反馈和额外的学习支持，提高了他们的学业成绩和理解能力。',
              ],
            },
            {
              company: 'Musichat',
              duration: '2023年7月–2023年11月',
              description: 'AI 集成音乐 Web 应用程序全栈开发工程师。',
              points: [
                '使用 MERN 栈构建全栈应用程序，集成 Spotify API 进行音乐播放和 OpenAI API 进行对话式 AI。',
                '使用 Socket.IO 实现实时聊天；在敏捷环境中优化 MongoDB 以实现高并发。',
              ],
            },
            {
              company: 'AI 金融平台 (个人项目)',
              duration: '2025年1月–至今',
              description: '股票投资组合和 AI 新闻播客系统。',
              points: [
                '使用 React 和 Tailwind 开发响应式前端；通过基于上下文的身份验证实现安全路由。',
                '使用 ASP.NET Core 和 EF Core 设计分层 RESTful API；集成 DeepSeek 和 NewsAPI 以获取金融摘要。',
                '使用 Azure TTS 将摘要转换为播客；通过 Docker 和 Azure App Service 部署服务，并使用 CI/CD。',
              ],
            },
            {
              company: '达能纽迪希亚 (虚拟实习)',
              duration: '2023年6月',
              description: '展示型生产力 Web 应用程序。',
              points: [
                '使用 React.js 构建响应式前端，并在 Figma 中设计用户流程。',
                '使用 Python Flask 开发 RESTful API，以检索和提供生产订单文档。',
              ],
            },
          ],
        },
        education: {
          title: '教育背景',
          degrees: ['信息技术硕士 – 奥克兰大学', '计算机科学学士 – 奥克兰大学'],
        },
        languages: {
          title: '语言',
          list: '英语, 汉语',
        },
        hobbies: {
          title: '爱好',
          list: '探索 • 徒步旅行 • GitHub 迷你项目',
        },
      },
    },
    projects: {
      sectionTitle: '我的项目',
      eyebrow: '精选项目',
      title: '我做这些项目，是因为它们值得被做出来。',
      description:
        '我喜欢那种同时需要工程判断、产品思维和一点实验精神的项目。这一页不是“作品画廊”，而更像“我做了什么、为什么做、以及它为什么有意思”。',
      featuredLabel: '精选项目',
      viewSourceLabel: '查看 GitHub',
      interestingLabel: '它有意思的地方',
      interestingText:
        '这类项目真正考验的不是把页面做出来，而是把产品意图和实际实现选择连在一起。',
      stackLabel: '技术栈亮点',
      list: [
        {
          id: 1,
          title: 'Medimate - AI 驱动的药物辅助',
          description:
            '开发了一款创新的应用程序，通过使用 AI 驱动的图像识别技术从产品图像中提取数据，从而实现药物购买的自动化。',
          tags: ['React', 'Swift', 'ASP.NET', 'Docker', 'OpenAI API', 'AWS'],
          cover: 'covers/medimate.jpg',
          github: 'https://github.com/Jabin0214/Medimate',
        },
        {
          id: 2,
          title: 'MusicChat - AI 增强的社交音乐平台',
          description:
            '构建了一个集成 Spotify 和 OpenAI API 的全栈 Web 应用程序，允许用户以交互方式评论、聊天和发现音乐。',
          tags: ['MERN Stack', 'React', 'Node.js', 'MongoDB', 'Express', 'OpenAI API'],
          cover: 'covers/musichat.jpg',
          github: 'https://github.com/Jabin0214/Music-Chat',
        },
        {
          id: 3,
          title: '金融播客系统',
          description:
            '开发了一个股票投资组合和 AI 新闻播客系统，集成了金融摘要和使用 Azure TTS 生成的播客。',
          tags: ['React', 'ASP.NET Core', 'Azure', 'Docker', 'DeepSeek', 'NewsAPI'],
          cover: 'covers/aipodcast.jpg',
          github: 'https://github.com/Jabin0214/Finmate-Backend',
        },
        {
          id: 4,
          title: '基于机器学习的 COVID-19 影响分析',
          description:
            '使用 CRISP-DM 方法对 COVID-19 对委内瑞拉教育的影响进行数据挖掘，构建机器学习模型以预测学校辍学率。',
          tags: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'R', 'IBM SPSS'],
          cover: 'covers/covid.jpg',
          github: 'https://github.com/Jabin0214/DM722',
        },
      ],
    },
    contact: {
      sectionTitle: '联系我',
      title: '我希望别人联系我这件事，尽量简单一点。',
      description: '我总是乐于讨论新的项目、创意想法或参与您愿景的机会。欢迎随时与我联系。',
      emailLabel: '邮箱',
      githubLabel: 'GitHub',
      noteLabel: '补充一句',
      noteBody:
        '如果你想听最短版本：我喜欢做有思考的软件，也比较好合作，而且我喜欢和真正想把事情做得更好的人聊天。',
      noteFooter: '招聘者、创始人、经理，或者只是好奇的人，都欢迎。',
      contextLabel: '适合联系我的场景',
      basedInLabel: '所在城市',
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
      liveChip: '越具体越好用',
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
