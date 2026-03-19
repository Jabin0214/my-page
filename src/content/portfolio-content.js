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
    },
    home: {
      hero: {
        title: 'Hello, I am Jabin',
        description: 'Full Stack Developer / Tech Enthusiast / Lifelong learner',
        primaryLink: { path: '/projects', label: 'Projects' },
        secondaryLink: { path: '/contact', label: 'Contact' },
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
      featuredLabel: 'Featured project',
      viewSourceLabel: 'View on GitHub',
      list: [
        {
          id: 1,
          title: 'Medimate - AI-powered Medication Assistance',
          description:
            'Developed an innovative application that automates medication purchases by extracting data from product images using AI-driven image recognition.',
          tags: ['React', 'Swift', 'ASP.NET', 'Docker', 'OpenAI API', 'AWS'],
          cover: 'covers/medimate.png',
          github: 'https://github.com/Jabin0214/Medimate',
        },
        {
          id: 2,
          title: 'MusicChat - AI-Enhanced Social Music Platform',
          description:
            'Built a full-stack web application integrating Spotify and OpenAI APIs, allowing users to review, chat, and discover music interactively.',
          tags: ['MERN Stack', 'React', 'Node.js', 'MongoDB', 'Express', 'OpenAI API'],
          cover: 'covers/musichat.png',
          github: 'https://github.com/Jabin0214/Music-Chat',
        },
        {
          id: 3,
          title: 'Financial Podcast System',
          description:
            'Developed a stock portfolio and AI news podcast system, integrating financial summaries and podcasts using Azure TTS.',
          tags: ['React', 'ASP.NET Core', 'Azure', 'Docker', 'DeepSeek', 'NewsAPI'],
          cover: 'covers/aipodcast.png',
          github: 'https://github.com/Jabin0214/Finmate-Backend',
        },
        {
          id: 4,
          title: 'COVID-19 Impact Analysis with Machine Learning',
          description:
            "Conducted data mining on COVID-19's effect on education in Venezuela using CRISP-DM methodology, building ML models to predict school dropout rates.",
          tags: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'R', 'IBM SPSS'],
          cover: 'covers/covid.png',
          github: 'https://github.com/Jabin0214/DM722',
        },
      ],
    },
    contact: {
      sectionTitle: 'Contact Me',
      description:
        'I am always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!',
      emailLabel: 'Email',
      githubLabel: 'GitHub',
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
    },
    home: {
      hero: {
        title: '你好，我是 Jabin',
        description: '全栈开发工程师 / 技术爱好者 / 创造者',
        primaryLink: { path: '/projects', label: '项目' },
        secondaryLink: { path: '/contact', label: '联系我' },
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
      featuredLabel: '精选项目',
      viewSourceLabel: '查看 GitHub',
      list: [
        {
          id: 1,
          title: 'Medimate - AI 驱动的药物辅助',
          description:
            '开发了一款创新的应用程序，通过使用 AI 驱动的图像识别技术从产品图像中提取数据，从而实现药物购买的自动化。',
          tags: ['React', 'Swift', 'ASP.NET', 'Docker', 'OpenAI API', 'AWS'],
          cover: 'covers/medimate.png',
          github: 'https://github.com/Jabin0214/Medimate',
        },
        {
          id: 2,
          title: 'MusicChat - AI 增强的社交音乐平台',
          description:
            '构建了一个集成 Spotify 和 OpenAI API 的全栈 Web 应用程序，允许用户以交互方式评论、聊天和发现音乐。',
          tags: ['MERN Stack', 'React', 'Node.js', 'MongoDB', 'Express', 'OpenAI API'],
          cover: 'covers/musichat.png',
          github: 'https://github.com/Jabin0214/Music-Chat',
        },
        {
          id: 3,
          title: '金融播客系统',
          description:
            '开发了一个股票投资组合和 AI 新闻播客系统，集成了金融摘要和使用 Azure TTS 生成的播客。',
          tags: ['React', 'ASP.NET Core', 'Azure', 'Docker', 'DeepSeek', 'NewsAPI'],
          cover: 'covers/aipodcast.png',
          github: 'https://github.com/Jabin0214/Finmate-Backend',
        },
        {
          id: 4,
          title: '基于机器学习的 COVID-19 影响分析',
          description:
            '使用 CRISP-DM 方法对 COVID-19 对委内瑞拉教育的影响进行数据挖掘，构建机器学习模型以预测学校辍学率。',
          tags: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'R', 'IBM SPSS'],
          cover: 'covers/covid.png',
          github: 'https://github.com/Jabin0214/DM722',
        },
      ],
    },
    contact: {
      sectionTitle: '联系我',
      description: '我总是乐于讨论新的项目、创意想法或参与您愿景的机会。欢迎随时与我联系。',
      emailLabel: '邮箱',
      githubLabel: 'GitHub',
    },
  },
}

export function resolveContentLocale(language) {
  return typeof language === 'string' && language.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export function getPortfolioContent(language) {
  return portfolioContent[resolveContentLocale(language)]
}
