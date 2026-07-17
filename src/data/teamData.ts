export interface TeamSkill {
  name: string;
  level: number; // 0 to 100
  category: string;
}

export interface TeamEducation {
  degree: string;
  institution: string;
  specialization?: string;
  year: string;
}

export interface TeamExperience {
  position: string;
  organization: string;
  duration: string;
  responsibilities: string[];
  contributions?: string[];
  technologiesUsed?: string[];
}

export interface TeamResponsibility {
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

export interface TeamAchievement {
  label: string;
  value: number;
  suffix?: string;
}

export interface TeamService {
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

export interface TeamContact {
  email: string;
  phone?: string;
  location: string;
  address?: string;
}

export interface TeamSocials {
  linkedin?: string;
  github?: string;
  twitter?: string;
  behance?: string;
  dribbble?: string;
  medium?: string;
  website?: string;
}

export interface TeamMemberProfile {
  slug: string;
  name: string;
  role: string;
  introduce: string;
  introText: string; // Brief one-liner for hero
  experienceYears: number;
  image: string;
  availability: string;
  aboutText: string;
  philosophy: string;
  skills: TeamSkill[];
  education: TeamEducation[];
  experienceList: TeamExperience[];
  responsibilities: TeamResponsibility[];
  projectIds: string[]; // Maps to projects in siteData.ts
  technologies: { name: string; category: string }[];
  achievements: TeamAchievement[];
  services: TeamService[];
  contact: TeamContact;
  socials: TeamSocials;
}

export const teamProfiles: Record<string, TeamMemberProfile> = {
  "aashish-jhumle": {
    slug: "aashish-jhumle",
    name: "Ashish Jumle",
    role: "Founder",
    introduce: "Ashish is a visionary growth strategist and system architect who leads SmartlyGrow's overall business scaling pipelines, client consulting, and strategic AI integrations.",
    introText: "Scaling businesses through AI-first automation structures and high-performance digital platforms.",
    experienceYears: 6,
    image: "/photo/founder.png",
    availability: "Available for growth consulting",
    aboutText: "With over half a decade of experience in digital acquisition, system analysis, and software workflows, Ashish builds business infrastructures engineered for rapid scaling. He focuses on removing overhead, integrating modern analytics dashboards, and establishing authoritative web channels that turn random traffic into loyal corporate buyers.",
    philosophy: "Eliminate administrative bottlenecks using intelligent triggers. Let digital systems do the busywork so human talent can focus exclusively on creative scaling and strategic product iteration.",
    skills: [
      { name: "AI Automation", level: 92, category: "AI & Automation" },
      { name: "Growth Marketing", level: 95, category: "Marketing" },
      { name: "Conversion Optimization", level: 94, category: "Marketing" },
      { name: "Next.js Web Architecture", level: 88, category: "Frontend Development" },
      { name: "Project Management", level: 94, category: "Project Management" },
      { name: "Communication", level: 96, category: "Communication" }
    ],
    education: [
      {
        degree: "Bachelor of Technology",
        institution: "Pune University",
        specialization: "Computer Science & Engineering",
        year: "2020"
      },
      {
        degree: "Certified Growth Strategist",
        institution: "Growth University",
        year: "2021"
      }
    ],
    experienceList: [
      {
        position: "Founder & Growth Strategist",
        organization: "SmartlyGrow",
        duration: "2024 - Present",
        responsibilities: [
          "Oversee technical project deliveries and client consulting sessions.",
          "Design AI workflow pipelines and CRM integrations for clients.",
          "Lead visual positioning and acquisition strategy for client products."
        ],
        contributions: [
          "Boosted table turnover by 40% and revenue by 320% for 11 East Street Cafe.",
          "Built travel booking engine funnel leading to +480% leads for Aniket Travels."
        ],
        technologiesUsed: ["Next.js", "Zapier", "Make.com", "OpenAI", "Tailwind CSS"]
      },
      {
        position: "Digital Growth Consultant",
        organization: "Freelance",
        duration: "2021 - 2024",
        responsibilities: [
          "Built high-converting funnels and landing pages for SMEs.",
          "Configured marketing automation setups and CRM syncing pipelines."
        ]
      }
    ],
    responsibilities: [
      {
        title: "Growth Strategy",
        description: "Mapping out client conversion funnels, landing page optimization structures, and organic positioning campaigns.",
        icon: "Target"
      },
      {
        title: "Systems Architecture",
        description: "Structuring AI agents, cloud backends, database layers, and API integrations to assure sub-second response times.",
        icon: "Cpu"
      }
    ],
    projectIds: ["cafe-peter-delight", "aniket-tours-travels"],
    technologies: [
      { name: "Next.js", category: "Frontend" },
      { name: "Zapier", category: "Automation" },
      { name: "Make.com", category: "Automation" },
      { name: "OpenAI API", category: "AI" },
      { name: "Figma", category: "Design" },
      { name: "Google Analytics", category: "Marketing" }
    ],
    achievements: [
      { label: "Projects Supervised", value: 45, suffix: "+" },
      { label: "Clients Consulted", value: 120, suffix: "+" },
      { label: "Average Growth Yield", value: 280, suffix: "%" }
    ],
    services: [
      {
        title: "Growth Audit",
        description: "Interactive audit of business operations, CRM pipelines, page load bottlenecks, and organic traffic.",
        icon: "TrendingUp"
      },
      {
        title: "AI Pipeline Strategy",
        description: "Consulting on custom LLM models, lead scoring, and automated sales outreach sequences.",
        icon: "Sparkles"
      }
    ],
    contact: {
      email: "aashish@smartlygrow.com",
      phone: "+917020951401",
      location: "Pune, India"
    },
    socials: {
      linkedin: "https://linkedin.com/in/aashish-jhumle",
      twitter: "https://x.com/aashish_jhumle",
      website: "https://smartlygrow.com"
    }
  },
  "janhavi": {
    slug: "janhavi",
    name: "Janhavi",
    role: "Co-Founder",
    introduce: "Janhavi is the product design lead, driving premium UI/UX interfaces, responsive design systems, and cohesive branding architectures that represent client values.",
    introText: "Creating pixel-perfect interfaces and unified design tokens that scale brands.",
    experienceYears: 5,
    image: "/photo/janhavi-new.jpg",
    availability: "Available for design reviews",
    aboutText: "Janhavi combines visual aesthetics with logical layout hierarchies. Specializing in Figma tokenization, design system scalability, and interaction flows, she translates abstract business concepts into stunning, interactive digital prototypes that developers can build cleanly.",
    philosophy: "Great design is not just what it looks like; it is how it feels to interact with. Spacing grids, color contrast, and micro-interactions should work harmoniously to guide users seamlessly.",
    skills: [
      { name: "UI/UX Design", level: 96, category: "UI/UX" },
      { name: "Figma Design Systems", level: 95, category: "Design Tools" },
      { name: "Cohesive Branding", level: 93, category: "Design Tools" },
      { name: "Graphic Design", level: 92, category: "Design Tools" },
      { name: "Motion Prototyping", level: 85, category: "UI/UX" }
    ],
    education: [
      {
        degree: "Bachelor of Design (B.Des)",
        institution: "National Institute of Design",
        specialization: "Interaction Design",
        year: "2021"
      }
    ],
    experienceList: [
      {
        position: "Co-Founder & Design Lead",
        organization: "SmartlyGrow",
        duration: "2024 - Present",
        responsibilities: [
          "Define creative direction, layout grids, and brand systems for client projects.",
          "Build scalable component libraries in Figma synced with development frameworks.",
          "Lead interactive prototyping, user feedback sessions, and A/B test styling."
        ],
        contributions: [
          "Designed Korean-inspired visual scheme and digital QR menu grid for 11 East Street Cafe.",
          "Created modular component style libraries used across all SmartlyGrow projects."
        ],
        technologiesUsed: ["Figma", "Adobe Illustrator", "Photoshop", "After Effects"]
      },
      {
        position: "Senior UI/UX Designer",
        organization: "Creative Tech Agency",
        duration: "2022 - 2024",
        responsibilities: [
          "Created user flows, wireframes, and high-fidelity screens for Web3 and SaaS projects.",
          "Designed unified icons, marketing assets, and custom illustrations."
        ]
      }
    ],
    responsibilities: [
      {
        title: "Product Styling",
        description: "Setting typography rules, component borders, and brand guidelines for all projects.",
        icon: "Palette"
      },
      {
        title: "Grid & Flow Layouts",
        description: "Mapping complex multi-step forms, dashboard grids, and checkout workflows for conversion.",
        icon: "Layout"
      }
    ],
    projectIds: ["cafe-peter-delight"],
    technologies: [
      { name: "Figma", category: "Design" },
      { name: "Adobe Illustrator", category: "Design" },
      { name: "Adobe Premiere", category: "Video" },
      { name: "Tailwind CSS Tokens", category: "CSS" }
    ],
    achievements: [
      { label: "Designs Shipped", value: 35, suffix: "+" },
      { label: "Design Systems Built", value: 12, suffix: "" },
      { label: "Client Satisfaction", value: 99, suffix: "%" }
    ],
    services: [
      {
        title: "UI/UX Design Package",
        description: "Bespoke Figma prototype files, user personas, flow mapping, and active wireframes.",
        icon: "Palette"
      },
      {
        title: "Brand Identity Design",
        description: "Logos, brand tokens, unified typographies, and digital marketing graphics.",
        icon: "Sparkles"
      }
    ],
    contact: {
      email: "janhavi@smartlygrow.com",
      location: "Pune, India"
    },
    socials: {
      linkedin: "https://linkedin.com/in/janhavi-design",
      behance: "https://behance.net/janhavi-design",
      dribbble: "https://dribbble.com/janhavi-design"
    }
  },
  "sajan-bhoyar": {
    slug: "sajan-bhoyar",
    name: "Sajan Bhoyar",
    role: "App Lead",
    introduce: "Sajan is our App Lead, specialized in full stack software engineering, serverless database layers, Next.js architecture, and AI vector database logics.",
    introText: "Building highly-scalable full stack systems and lightning-fast API backends.",
    experienceYears: 4,
    image: "/photo/app lead.png",
    availability: "Available for engineering projects",
    aboutText: "Sajan leads the application engineering side of SmartlyGrow. He is passionate about Next.js serverless functions, state management, database schema design, and connecting cognitive LLMs directly into transactional backend loops.",
    philosophy: "Clean code is self-documenting. Performance is a feature, not an afterthought. Build interfaces that compute and display data in sub-second timelines.",
    skills: [
      { name: "React / Next.js", level: 95, category: "Frontend Development" },
      { name: "Node.js / Express", level: 93, category: "Backend Development" },
      { name: "SQL & Vector DBs", level: 90, category: "Databases" },
      { name: "Cloud Deployment", level: 88, category: "Cloud & Deployment" },
      { name: "TypeScript", level: 94, category: "Frontend Development" }
    ],
    education: [
      {
        degree: "Bachelor of Engineering",
        institution: "Nagpur University",
        specialization: "Information Technology",
        year: "2022"
      }
    ],
    experienceList: [
      {
        position: "Full Stack App Lead",
        organization: "SmartlyGrow",
        duration: "2024 - Present",
        responsibilities: [
          "Architect dynamic React/Next.js client dashboards and CRM pipelines.",
          "Build APIs, database systems, and vector search embeddings.",
          "Manage staging servers, CI/CD pipelines, and secure deployment keys."
        ],
        contributions: [
          "Developed direct fleet booking and outstation route pricing logic for Aniket Travels.",
          "Deployed CRM sync integrations that automate customer database management."
        ],
        technologiesUsed: ["Next.js", "Node.js", "PostgreSQL", "Supabase", "TypeScript"]
      },
      {
        position: "Full Stack Engineer",
        organization: "Tech Solutions Inc",
        duration: "2022 - 2024",
        responsibilities: [
          "Developed core features for client-facing software applications.",
          "Refactored legacy backends to serverless node APIs, cutting database costs."
        ]
      }
    ],
    responsibilities: [
      {
        title: "Full Stack Engineering",
        description: "Writing robust TypeScript schemas, serverless handlers, and responsive layout codes.",
        icon: "Cpu"
      },
      {
        title: "Data Operations",
        description: "Optimizing database read/write counts, setting secure rows, and managing token caches.",
        icon: "Target"
      }
    ],
    projectIds: ["aniket-tours-travels"],
    technologies: [
      { name: "Next.js", category: "Frontend" },
      { name: "TypeScript", category: "Frontend" },
      { name: "PostgreSQL", category: "Databases" },
      { name: "Supabase", category: "Databases" },
      { name: "Vercel", category: "Cloud" },
      { name: "GitHub", category: "Project Management" }
    ],
    achievements: [
      { label: "Systems Deployed", value: 28, suffix: "" },
      { label: "Lines of Code Written", value: 150, suffix: "K+" },
      { label: "Lighthouse Performance", value: 98, suffix: "%" }
    ],
    services: [
      {
        title: "SaaS Portal Engineering",
        description: "Full-scale custom dashboard development, secure client portals, and DB wiring.",
        icon: "Cpu"
      },
      {
        title: "Database Syncing Services",
        description: "Migration of spreadsheet records into PostgreSQL with secure auto-backup protocols.",
        icon: "TrendingUp"
      }
    ],
    contact: {
      email: "sajan@smartlygrow.com",
      location: "Pune, India"
    },
    socials: {
      linkedin: "https://linkedin.com/in/sajan-bhoyar",
      github: "https://github.com/sajan-bhoyar"
    }
  },
  "atharv-bhavsar": {
    slug: "atharv-bhavsar",
    name: "Atharv Bhavsar",
    role: "Web Lead",
    introduce: "Atharv is the Web Lead who oversees deployment pipelines, client delivery, headless CMS integrations, and site performance optimizations.",
    introText: "Deploying lightning-fast headless websites and perfecting Core Web Vitals.",
    experienceYears: 4,
    image: "/photo/website lead.jpeg",
    availability: "Available for custom projects",
    aboutText: "Atharv makes sure our client websites are lightweight, secure, and fully optimized. He focuses on responsive layouts, CSS variables, web fonts configuration, SEO metadata tags, and headless CMS integrations so clients can manage contents effortlessly.",
    philosophy: "Users leave if a page takes more than 2 seconds to load. Performance is the baseline for SEO, conversions, and a premium digital experience.",
    skills: [
      { name: "Next.js / React", level: 94, category: "Frontend Development" },
      { name: "Headless CMS API", level: 90, category: "Backend Development" },
      { name: "Core Web Vitals Opt", level: 95, category: "Cloud & Deployment" },
      { name: "SEO Optimization", level: 92, category: "Marketing" },
      { name: "Tailwind CSS", level: 95, category: "UI/UX" }
    ],
    education: [
      {
        degree: "Bachelor of Technology (B.Tech)",
        institution: "Pune University",
        specialization: "Information Technology",
        year: "2022"
      }
    ],
    experienceList: [
      {
        position: "Web Development Lead",
        organization: "SmartlyGrow",
        duration: "2024 - Present",
        responsibilities: [
          "Oversee deployment pipelines and static page caching setups.",
          "Integrate site structures with SEO metadata schemas and social cards.",
          "Deploy CMS integrations for easy client text updates."
        ],
        contributions: [
          "Optimized 11 East Street Cafe's Next.js load speed down to 0.6s, achieving a 99 Lighthouse rating.",
          "Secured inter-city routing maps integration for travel booking agency."
        ],
        technologiesUsed: ["Next.js", "Tailwind CSS", "Strapi CMS", "Vercel"]
      },
      {
        position: "Head Web Developer",
        organization: "Freelance / Web Studio",
        duration: "2022 - 2024",
        responsibilities: [
          "Developed custom headless pages and WordPress API integrations.",
          "Performed speed audits and Core Web Vitals refactoring for local businesses."
        ]
      }
    ],
    responsibilities: [
      {
        title: "Frontend Engineering",
        description: "Coding responsive pages matching Figma layout files pixel-for-pixel.",
        icon: "Layout"
      },
      {
        title: "Speed Optimization",
        description: "Optimizing image loading sizes, minifying scripts, and setting edge caching rules.",
        icon: "TrendingUp"
      }
    ],
    projectIds: ["cafe-peter-delight", "aniket-tours-travels"],
    technologies: [
      { name: "Next.js", category: "Frontend" },
      { name: "Tailwind CSS", category: "CSS" },
      { name: "Strapi CMS", category: "CMS" },
      { name: "SEO Meta", category: "Marketing" },
      { name: "Vercel Analytics", category: "Cloud" }
    ],
    achievements: [
      { label: "Headless Sites Launched", value: 32, suffix: "" },
      { label: "Average Page Speed", value: 95, suffix: "+" },
      { label: "SEO Keyword Growth", value: 180, suffix: "%" }
    ],
    services: [
      {
        title: "Headless Web Development",
        description: "Lightning-fast website deployment using modern Next.js and Tailwind setups.",
        icon: "Layout"
      },
      {
        title: "Web Speed Audit",
        description: "Complete performance refactoring to achieve green Core Web Vitals ranges.",
        icon: "TrendingUp"
      }
    ],
    contact: {
      email: "atharvbhavsar99@gmail.com",
      location: "Pune, India"
    },
    socials: {
      linkedin: "https://www.linkedin.com/in/atharv-bhavsar-53995a323/",
      github: "https://github.com/atharvbhavsar"
    }
  },
  "hemant-bhoyar": {
    slug: "hemant-bhoyar",
    name: "Hemant Bhoyar",
    role: "AI Lead",
    introduce: "Hemant is the AI Lead specializing in LLMs, vector database embeddings, CRM automations, and building custom context-aware AI agents.",
    introText: "Deploying production-grade AI agents and integrating custom LLM loops.",
    experienceYears: 4,
    image: "/photo/ai  lead.png",
    availability: "Available for automation consulting",
    aboutText: "Hemant engineers AI systems that take over repetitive administrative work. He specializes in training Retrieval-Augmented Generation (RAG) models on business data, building intelligent customer qualifying bots, and syncing databases using API connectors.",
    philosophy: "Automation isn't just about saving time; it's about reducing errors and creating instant, 24/7 responsiveness for your customers.",
    skills: [
      { name: "AI Agent Integrations", level: 96, category: "AI & Automation" },
      { name: "Vector DBs / RAG", level: 92, category: "AI & Automation" },
      { name: "Python / PyTorch", level: 90, category: "AI & Automation" },
      { name: "Zapier & Make Workflows", level: 95, category: "AI & Automation" },
      { name: "REST APIs", level: 93, category: "Backend Development" }
    ],
    education: [
      {
        degree: "Bachelor of Technology (B.Tech)",
        institution: "Nagpur University",
        specialization: "Artificial Intelligence & Data Science",
        year: "2022"
      }
    ],
    experienceList: [
      {
        position: "AI Lead Systems Engineer",
        organization: "SmartlyGrow",
        duration: "2024 - Present",
        responsibilities: [
          "Design and deploy customer Qualification Bots for WhatsApp & web.",
          "Integrate custom RAG vectors using OpenAI and Pinecone databases.",
          "Build automation maps to sync WhatsApp inquiries with HubSpot/Salesforce."
        ],
        contributions: [
          "Built a WhatsApp reservation AI agent that auto-booked 290+ tables/month for 11 East Street Cafe.",
          "Automated corporate lead triage, eliminating 80 hours of manual spreadsheet copying."
        ],
        technologiesUsed: ["Python", "OpenAI API", "Pinecone", "Zapier", "HubSpot"]
      },
      {
        position: "AI Research Engineer",
        organization: "Robotics & Automation Lab",
        duration: "2023 - 2024",
        responsibilities: [
          "Developed object-recognition scripts and semantic search algorithms.",
          "Created machine learning training loops for natural language processing."
        ]
      }
    ],
    responsibilities: [
      {
        title: "Cognitive AI Loops",
        description: "Fine-tuning prompt structures, agent logic chains, and secure RAG data sources.",
        icon: "Cpu"
      },
      {
        title: "CRM Automation Mapping",
        description: "Mapping fields between custom forms, WhatsApp, and enterprise client CRM systems.",
        icon: "Target"
      }
    ],
    projectIds: ["aniket-tours-travels"],
    technologies: [
      { name: "Python", category: "AI" },
      { name: "OpenAI", category: "AI" },
      { name: "Pinecone", category: "Databases" },
      { name: "Zapier", category: "Automation" },
      { name: "Make.com", category: "Automation" },
      { name: "Node.js", category: "Backend" }
    ],
    achievements: [
      { label: "AI Workflows Shipped", value: 40, suffix: "" },
      { label: "Customer Inquiries Triaged", value: 12, suffix: "K+" },
      { label: "Hours Reclaimed for Clients", value: 650, suffix: "h" }
    ],
    services: [
      {
        title: "Autonomous Agent Setup",
        description: "Context-aware WhatsApp, Slack, or website lead qualifying agents connected to your CRM.",
        icon: "Sparkles"
      },
      {
        title: "Workflow Automation Audit",
        description: "Integration mapping to eliminate redundant manual data transfer and copy tasks.",
        icon: "TrendingUp"
      }
    ],
    contact: {
      email: "hemant@smartlygrow.com",
      location: "Pune, India"
    },
    socials: {
      linkedin: "https://linkedin.com/in/hemant-bhoyar",
      github: "https://github.com/hemant-bhoyar"
    }
  },
  "aryan-deshmukh": {
    slug: "aryan-deshmukh",
    name: "Aryan Deshmukh",
    role: "Video Editor",
    introduce: "Aryan is our Video Editor, focused on high-retention video production, creative post-production, Reels, and engaging visual ad content.",
    introText: "Hooking viewers in 3 seconds and maximizing screen retention metrics.",
    experienceYears: 3,
    image: "/photo/video.png",
    availability: "Available for video production",
    aboutText: "Aryan is a post-production specialist who understands content pacing, text animations, and premium sound design. He structures edits to maintain average viewer retention above 75%, helping clients scale their organic outreach on YouTube, Instagram, and TikTok.",
    philosophy: "A video is won or lost in the first 3 seconds. Sound cues, typography overlays, and quick visual pacing are key to conquering short attention spans.",
    skills: [
      { name: "Video Editing", level: 95, category: "Design Tools" },
      { name: "After Effects Animation", level: 90, category: "Design Tools" },
      { name: "Sound Design", level: 88, category: "Design Tools" },
      { name: "Color Grading", level: 92, category: "Design Tools" },
      { name: "Content Scripting", level: 86, category: "Marketing" }
    ],
    education: [
      {
        degree: "Bachelor of Science (B.Sc)",
        institution: "Symbiosis Institute of Media",
        specialization: "Cinema & Media Studies",
        year: "2023"
      }
    ],
    experienceList: [
      {
        position: "Video Editor & Creator Lead",
        organization: "SmartlyGrow",
        duration: "2025 - Present",
        responsibilities: [
          "Lead post-production pipelines, motion graphics, and audio pacing.",
          "Script and outline high-retention video edits for client socials.",
          "Manage video assets, rendering servers, and content calendars."
        ],
        contributions: [
          "Developed promotional videos with dynamic captions that drove local food engagement.",
          "Structured high-converting video ad creatives used in social campaigns."
        ],
        technologiesUsed: ["Adobe Premiere", "After Effects", "Davinci Resolve", "Audition"]
      },
      {
        position: "Lead Video Editor",
        organization: "Content Creator Agency",
        duration: "2023 - 2025",
        responsibilities: [
          "Edited weekly long-form videos and daily Shorts/Reels for top creators.",
          "Optimized visual layouts and sound cues to increase engagement rate by 30%."
        ]
      }
    ],
    responsibilities: [
      {
        title: "Content Pacing & Loops",
        description: "Editing footage to cut dead space, optimize visual flow, and construct looping videos.",
        icon: "Layout"
      },
      {
        title: "Motion Typography",
        description: "Designing readable kinetic text overlays, emojis, and visual highlight graphics.",
        icon: "Palette"
      }
    ],
    projectIds: ["cafe-peter-delight"],
    technologies: [
      { name: "Adobe Premiere", category: "Video" },
      { name: "Adobe After Effects", category: "Video" },
      { name: "Davinci Resolve", category: "Video" },
      { name: "Audacity / Sound", category: "Audio" }
    ],
    achievements: [
      { label: "Videos Edited", value: 120, suffix: "+" },
      { label: "Total Social Views", value: 5, suffix: "M+" },
      { label: "Average Retention Rate", value: 78, suffix: "%" }
    ],
    services: [
      {
        title: "High-Retention Video Editing",
        description: "Bespoke Reels, Shorts, TikToks, and YouTube video editing with kinetic subtitles.",
        icon: "Sparkles"
      },
      {
        title: "Video Ad Creative Production",
        description: "Scripted direct-response video ads structured to increase ad click-through rates.",
        icon: "TrendingUp"
      }
    ],
    contact: {
      email: "aryan@smartlygrow.com",
      location: "Pune, India"
    },
    socials: {
      linkedin: "https://linkedin.com/in/aryan-deshmukh",
      twitter: "https://x.com/aryan_edits"
    }
  },
  "sudhir-swami": {
    slug: "sudhir-swami",
    name: "Sudhir Swami",
    role: "Videographer",
    introduce: "Sudhir is our Videographer, bringing motion aesthetics, artistic direction, camera blocking, and creative energy to video campaigns and brand productions.",
    introText: "Capturing dynamic motion aesthetics and directing performance visuals.",
    experienceYears: 4,
    image: "/photo/image.png",
    availability: "Available for creative direction",
    aboutText: "Sudhir is a creative director and videographer who specializes in visual arrangement. He coordinates visual pacing, camera movements, and product showcase sequences so that brand videos feel alive, organic, and visually premium.",
    philosophy: "Visual flow is the secret language of screen retention. The physical rhythm, camera angles, and structural pacing must align to create high emotional resonance.",
    skills: [
      { name: "Creative Direction", level: 94, category: "UI/UX" },
      { name: "Video Production", level: 96, category: "UI/UX" },
      { name: "Motion & Blocking", level: 90, category: "UI/UX" },
      { name: "Visual Pacing", level: 92, category: "UI/UX" },
      { name: "Campaign Storytelling", level: 88, category: "Marketing" }
    ],
    education: [
      {
        degree: "Diploma in Fine Arts",
        institution: "Pune Academy of Creative Arts",
        specialization: "Dance & Motion Choreography",
        year: "2021"
      }
    ],
    experienceList: [
      {
        position: "Choreographer & Creative Director",
        organization: "SmartlyGrow",
        duration: "2025 - Present",
        responsibilities: [
          "Direct blocking, camera transitions, and motion setups for video shoots.",
          "Choreograph artistic promotional video campaigns and brand stories.",
          "Consult with client actors to perfect performance styles and expressions."
        ],
        contributions: [
          "Choreographed high-energy Korean dining experiences video loops for 11 East Street Cafe.",
          "Designed dynamic camera movement plans for client brand showcases."
        ],
        technologiesUsed: ["Motion Blocking", "Storyboarding", "Camera Direction"]
      },
      {
        position: "Choreographer & Creative Lead",
        organization: "Dance & Media Academy",
        duration: "2022 - 2025",
        responsibilities: [
          "Instructed performers in motion sync, spatial awareness, and pacing.",
          "Designed creative dance choreographies and visual layouts for commercial ads."
        ]
      }
    ],
    responsibilities: [
      {
        title: "Artistic Direction",
        description: "Designing the physical movement grids, character positions, and spatial dynamics on camera.",
        icon: "Palette"
      },
      {
        title: "Pacing Sync",
        description: "Coordinating physical movements to match dynamic background sound tracks and visual cuts.",
        icon: "Layout"
      }
    ],
    projectIds: ["cafe-peter-delight"],
    technologies: [
      { name: "Storyboarding", category: "Direction" },
      { name: "Motion Choreography", category: "Movement" },
      { name: "Camera Tracking Layouts", category: "Direction" },
      { name: "Figma (Visual maps)", category: "Design" }
    ],
    achievements: [
      { label: "Shoots Choreographed", value: 48, suffix: "" },
      { label: "Corporate Ads Directed", value: 15, suffix: "" },
      { label: "Client Retainment Score", value: 96, suffix: "%" }
    ],
    services: [
      {
        title: "Visual Choreography & Blocking",
        description: "On-site creative direction for actors, spatial setups, and dynamic camera choreography.",
        icon: "Sparkles"
      },
      {
        title: "Creative Campaign Directing",
        description: "Developing visual concepts, storyboards, and motion grids for brand social posts.",
        icon: "Layout"
      }
    ],
    contact: {
      email: "sudhir@smartlygrow.com",
      location: "Pune, India"
    },
    socials: {
      linkedin: "https://linkedin.com/in/sudhir-swami",
      twitter: "https://x.com/sudhir_choreography"
    }
  }
};
