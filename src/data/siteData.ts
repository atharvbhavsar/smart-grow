export interface Service {
  id: string;
  title: string;
  category: 'digital-products' | 'ai-solutions' | 'creative-services' | 'growth-services';
  icon: string;
  shortDesc: string;
  longDesc: string;
  features: string[];
  benefits: string[];
  technologies: string[];
  process: { title: string; description: string }[];
  faqs: { question: string; answer: string }[];
}

export interface Project {
  id: string;
  title: string;
  category: 'Business Growth' | 'Creative Services' | 'AI Solutions';
  categorySlug: 'business-growth' | 'creative-services' | 'ai-solutions';
  companyName: string;
  industry: string;
  tagline: string;
  description: string;
  image: string;
  liveUrl?: string;
  companyOverview: {
    about: string;
    requirements: string[];
    challenges: string[];
  };
  servicesBuilt: string[];
  beforeAfterMetrics: {
    before: { revenue: string; leads: string; conversionRate: string; loadSpeed: string; sales: string };
    after: { revenue: string; leads: string; conversionRate: string; loadSpeed: string; sales: string };
    growthPercentages: { revenue: string; leads: string; conversionRate: string; loadSpeed: string; sales: string };
    visualMetrics: { label: string; beforeValue: number; afterValue: number; unit: string; percentage: string }[];
  };
  timeline: { step: string; title: string; description: string }[];
  testimonial: {
    name: string;
    role: string;
    company: string;
    rating: number;
    quote: string;
    photo: string;
  };
}

export interface Package {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  ctaText: string;
  popular: boolean;
  tier: 'starter' | 'growth' | 'enterprise';
}

export interface BlogPost {
  id: string;
  title: string;
  category: 'AI & Automation' | 'Web Development' | 'Growth & Marketing' | 'Branding';
  summary: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

export const services: Service[] = [
  {
    id: "website-development",
    title: "Website Development",
    category: "digital-products",
    icon: "Globe",
    shortDesc: "Stunning, high-performance marketing websites built with Next.js and Tailwind CSS to convert visitors into customers.",
    longDesc: "We build modern, SEO-optimized, and lightning-fast marketing websites designed to act as your 24/7 sales representative. Moving away from bulky WordPress setups, we build with Next.js and Tailwind CSS, giving you clean code, sub-second load times, and absolute design freedom. Every site is responsive, accessible, and structured to guide users directly down your conversion funnel.",
    features: [
      "Custom UI/UX Design (Framer-inspired)",
      "Next.js App Router Architecture",
      "Full SEO & Structured Data Markup",
      "Lenis Smooth Scrolling & WebGL Animations",
      "Self-editable CMS Integration Option",
      "Responsive Layouts (Mobile to Ultra-wide)"
    ],
    benefits: [
      "Improve conversion rates by up to 40% with fast load speeds.",
      "Strengthen search rankings with clean semantic HTML and automated sitemaps.",
      "Wow visitors with smooth custom animations and high-fidelity graphics.",
      "Reduce maintenance overhead and eliminate security vulnerabilities."
    ],
    technologies: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Lenis", "Vercel"],
    process: [
      { title: "Discovery & Wireframing", description: "Analyzing your brand, target audience, and structuring a high-converting page layout." },
      { title: "Visual Design UI/UX", description: "Crafting a premium visual interface that reflects your elite market positioning." },
      { title: "Frontend Development", description: "Writing semantic, performant Next.js code with smooth animations and transitions." },
      { title: "Optimization & Launch", description: "Polishing Lighthouse scores to 95+ and deploying to Vercel global edge network." }
    ],
    faqs: [
      { question: "Why do you use Next.js instead of WordPress?", answer: "Next.js websites load up to 10x faster, are highly secure against hacking, have better SEO out-of-the-box, and allow us to build custom interactive experiences that are impossible with standard WordPress themes." },
      { question: "How long does a typical website project take?", answer: "A premium marketing website takes between 3 to 6 weeks from wireframing to production deployment, depending on content and complexity." }
    ]
  },
  {
    id: "web-applications",
    title: "Web Applications",
    category: "digital-products",
    icon: "Layout",
    shortDesc: "Tailor-made web applications, SaaS dashboards, and client portals built to solve complex business operations.",
    longDesc: "Transform your business operations or launch your next product with our custom web application development services. We build scalable SaaS platforms, client portals, and interactive dashboards. With experience in React, Next.js, and modern serverless databases, we create secure, robust systems featuring real-time data visualisations, responsive user states, and seamless user experiences.",
    features: [
      "Robust Authentication & Multi-tenant Architecture",
      "Interactive Chart Dashboards (Plotly/D3)",
      "Real-time Databases & Live Sync",
      "Custom API Integrations & Serverless Webhooks",
      "Optimized Performance & Load Balancing",
      "Strict Security Headers & GDPR Compliance"
    ],
    benefits: [
      "Streamline operations by digitizing internal workflows and checklists.",
      "Increase customer loyalty through personalized, intuitive client portals.",
      "Scale from zero to millions of users with serverless, auto-scaling architecture.",
      "Gain full data transparency with real-time operational dashboard reports."
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Prisma", "PostgreSQL"],
    process: [
      { title: "Architecture Blueprint", description: "Mapping application flows, database schemas, and integration endpoints." },
      { title: "Interactive Mockups", description: "Designing high-fidelity UI states, menus, forms, and responsive components." },
      { title: "Full-Stack Build", description: "Developing secure backend routes, DB handlers, and polished responsive frontend components." },
      { title: "Quality Assurance", description: "Conducting automated end-to-end testing, security penetration scans, and load testing." }
    ],
    faqs: [
      { question: "Can you connect with our existing CRM or ERP system?", answer: "Yes, we integrate with Hubspot, Salesforce, SAP, and custom REST/GraphQL APIs to sync data seamlessly between your web app and back-office tools." },
      { question: "How do you handle hosting and application scaling?", answer: "We deploy using modern serverless platforms like Vercel, AWS, or Supabase which scale dynamically according to traffic spikes, ensuring zero downtime and low costs." }
    ]
  },
  {
    id: "ai-automation",
    title: "AI Automation",
    category: "ai-solutions",
    icon: "Cpu",
    shortDesc: "Connect your tools and automate repetitive tasks using AI workflows, freeing up hours of manual work.",
    longDesc: "Eliminate manual bottlenecks and scale your business throughput using AI-driven workflow automation. We integrate your software stack (emails, CRMs, sheets, chat tools) with Large Language Models (like OpenAI GPT, Anthropic Claude) to analyze incoming inquiries, route tasks, write draft emails, summarize documents, and update your records automatically. Stop wasting hours on copy-paste and let intelligent loops run your business.",
    features: [
      "API Orchestration (Make.com, Zapier, Custom Node)",
      "Email Parsing & Automatic AI Draft Drafting",
      "Data Scraping & AI Document Information Extraction",
      "Multi-tool CRM Syncing (Hubspot, Salesforce, Notion)",
      "Automatic Lead Qualification Workflows",
      "Scheduled Status Reports & Instant Alert Signals"
    ],
    benefits: [
      "Reclaim up to 15+ hours per employee per week from repetitive data entry.",
      "Reduce human errors in CRM logs, lead updates, and invoicing workflows.",
      "Speed up lead response times from hours to under 2 minutes, increasing win rates.",
      "Scale business operations without needing to double your operational headcount."
    ],
    technologies: ["OpenAI API", "Claude API", "Python", "Make.com", "Zapier", "Node.js"],
    process: [
      { title: "Workflow Audit", description: "Mapping out your current manual processes, tools used, and identifying major bottlenecks." },
      { title: "Integration Design", description: "Structuring the automation triggers, AI prompts, filtering steps, and target systems." },
      { title: "Development & Testing", description: "Assembling the automation pipeline, tuning prompts for precision, and handling edge cases." },
      { title: "Deployment & Monitoring", description: "Activating live runs, setting up error alerts, and providing operational run dashboards." }
    ],
    faqs: [
      { question: "Do I need technical skills to manage these automations?", answer: "Not at all. We build automations to run entirely in the background, or we create simple dashboards where you can inspect, edit, or approve tasks with a single click." },
      { question: "How secure is our data when using OpenAI or Anthropic?", answer: "We utilize official enterprise API pathways where your business data is never used for training model baselines, keeping your intellectual property fully secure." }
    ]
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    category: "ai-solutions",
    icon: "Bot",
    shortDesc: "Autonomous AI agents that execute complex business tasks, handle support tickets, and qualify leads 24/7.",
    longDesc: "Deploy intelligent, context-aware AI agents trained specifically on your company's knowledge base. Unlike basic rules-based chatbots, our AI agents understand natural human intent, browse documentation, lookup client records, and execute actions like booking calls or filing support tickets. They act as autonomous team members that work 24/7 across your website, Slack, WhatsApp, or email channels.",
    features: [
      "RAG (Retrieval-Augmented Generation) Knowledge Bases",
      "Autonomous Tool Execution & API Triggering",
      "Multi-channel Deployment (Web, Slack, WhatsApp, Discord)",
      "Human-in-the-loop Transfer Safeguards",
      "Conversational Memory & Context Tracking",
      "Custom Brand Tone & Voice Alignment"
    ],
    benefits: [
      "Resolve up to 70% of customer support queries instantly without human intervention.",
      "Deliver immediate, high-fidelity responses to international prospects in any language.",
      "Uncover hidden user trends and common issues through automated chat analysis.",
      "Keep operations highly cost-effective while offering true 24/7 availability."
    ],
    technologies: ["LangChain", "LlamaIndex", "VectorDBs (Pinecone, pgvector)", "OpenAI GPT-4o", "Claude 3.5 Sonnet", "Python"],
    process: [
      { title: "Knowledge Extraction", description: "Consolidating company docs, guidelines, manuals, and FAQs into a structured format." },
      { title: "Agent Training", description: "Configuring vector embeddings, building custom prompt rails, and defining tool access boundaries." },
      { title: "Interface Integration", description: "Connecting the AI agent to your website frontend, WhatsApp API, or Slack workspace." },
      { title: "Continuous Calibration", description: "Auditing conversations, refining prompt boundaries, and updating knowledge resources." }
    ],
    faqs: [
      { question: "What happens if the AI agent makes a mistake?", answer: "We implement strict guardrails. If a query falls outside the agent's knowledge scope or detects user frustration, it seamlessly escalates the chat to a live human operator." },
      { question: "Can the agent book meetings on our calendars?", answer: "Yes, we connect the agent directly to Cal.com, Calendly, or Google Calendar, allowing it to schedule appointments based on live availability." }
    ]
  },
  {
    id: "branding",
    title: "Branding",
    category: "creative-services",
    icon: "Sparkles",
    shortDesc: "Establish a premium brand identity, logos, visual style guides, and design tokens that command industry authority.",
    longDesc: "A company is only as strong as its perception. We build high-fidelity, cohesive brand identities that communicate premium authority from the first second. We outline clear logos, bespoke color palettes, sophisticated typography selections, and digital design systems. Every asset is engineered to feel modern, cohesive, and perfectly aligned with a professional, growth-focused vision.",
    features: [
      "Bespoke Brand Logo Design (Vector & Animation ready)",
      "Custom HSL Color Palette & Typography Rules",
      "Interactive Digital Style Guides & Brand Books",
      "Social Media Graphic Templates & Layouts",
      "Ready-to-use Design Tokens (Tailwind & CSS)",
      "Corporate Stationery & Digital Pitch Deck Templates"
    ],
    benefits: [
      "Command premium pricing by appearing as an established industry authority.",
      "Maintain absolute visual consistency across all digital and physical touchpoints.",
      "Save design cycles with pre-defined assets and reusable style sheets.",
      "Engage your audience emotionally with clean, intentional aesthetic values."
    ],
    technologies: ["Figma", "Adobe Illustrator", "Photoshop", "SVG Animation", "Tailwind Theme Config"],
    process: [
      { title: "Brand Archetype Audit", description: "Understanding your company's core mission, values, and visual competition." },
      { title: "Concepts & Vector drafts", description: "Creating multiple distinct visual styles, logos, and testing typography pairs." },
      { title: "Refinement & Details", description: "Perfecting the chosen concept's lines, spacing, HSL color balances, and responsive versions." },
      { title: "Asset Handover", description: "Exporting all formats (SVG, PNG, EPS), UI kits, style rules, and design guidelines." }
    ],
    faqs: [
      { question: "Do we own the full intellectual property rights?", answer: "Yes, once completed, you have 100% ownership and copyright over all finalized logo concepts, design assets, and guidelines." },
      { question: "Can you update our existing logo without changing it completely?", answer: "Absolutely. We specialize in 'brand evolution' where we modernize old logos, cleaning up typography and geometry while preserving brand recognition." }
    ]
  },
  {
    id: "content-creation",
    title: "Content Creation",
    category: "creative-services",
    icon: "FileText",
    shortDesc: "High-value blog posts, newsletters, and social copy that establishes your business as a thought leader.",
    longDesc: "Organic traffic starts with high-value content. We research, write, and distribute articles, copy, and newsletters that answer the exact questions your ideal clients are searching for. We write content optimized for both human engagement and search engine indexers, positioning your leadership team as industry experts and creating natural paths for reader conversion.",
    features: [
      "Data-driven Content Strategies & Keyword Clusters",
      "High-Value Technical Copywriting (Engaging, Clear)",
      "Weekly/Monthly Email Newsletter Campaigns",
      "Viral LinkedIn & Twitter/X Social Posts",
      "Interactive Lead Magnets & Ebooks",
      "SEO Metadata Optimization & Semantic Copywriting"
    ],
    benefits: [
      "Drive consistent, unpaid organic traffic from decision-makers to your site.",
      "Nurture your lead pipeline through expert email broadcasts and newsletters.",
      "Build a memorable social presence that generates inbound partner interest.",
      "Shorten sales cycles by having ready-made answer sheets for prospects."
    ],
    technologies: ["Substack", "Beehiiv", "Ahrefs", "Google Search Console", "SurferSEO", "Notion"],
    process: [
      { title: "Audience Search Intent Analysis", description: "Finding the high-volume, low-competition keywords that drive actual buying traffic." },
      { title: "Editorial Calendar Planning", description: "Mapping themes, article outlines, and lead capture opportunities across 3 months." },
      { title: "Writing & Optimization", description: "Drafting high-value articles, placing semantic keywords, and polishing CTA pathways." },
      { title: "Distribution Plan", description: "Repurposing articles into newsletters, LinkedIn threads, and PDF downloads." }
    ],
    faqs: [
      { question: "Who does the actual writing for our brand?", answer: "We have a curated team of specialized copywriters with backgrounds in SaaS, finance, and AI, overseen by senior growth editors to ensure absolute accuracy and brand alignment." },
      { question: "How long before we see SEO results from content creation?", answer: "While SEO is a long-term play, high-quality, targeted content typically starts ranking and driving qualified leads within 60 to 90 days." }
    ]
  },
  {
    id: "social-media-management",
    title: "Social Media Management",
    category: "growth-services",
    icon: "Share2",
    shortDesc: "Build a highly engaged audience on LinkedIn, Twitter, and Instagram with consistent visual assets and copy.",
    longDesc: "A quiet social feed is a business risk. We take over the day-to-day management of your key social media accounts, ensuring a steady stream of premium posts, design carousels, and value-packed threads. We help startups, creators, and corporate leaders build digital presence, network, share success stories, and acquire inbound inquiries through structured social schedules.",
    features: [
      "Comprehensive Social Channel Auditing & Planning",
      "Custom Graphic Templates & High-res Carousel Sheets",
      "Thread Formulation & Platform-specific Optimization",
      "Scheduled Publishing & Grid Styling",
      "Engagement Prompts & Community Management",
      "Monthly Growth Analytics & Strategy Recalibration"
    ],
    benefits: [
      "Ensure your business looks active, modern, and credible to researching leads.",
      "Grow a community of brand advocates, potential hires, and strategic partners.",
      "Repurpose content effortlessly to maximize ROI from existing intellectual work.",
      "Generate organic inbound sales inquiries directly through social direct messages."
    ],
    technologies: ["Buffer", "Figma", "Loomly", "X (Twitter) Analytics", "LinkedIn Creator Mode"],
    process: [
      { title: "Profile Optimization", description: "Updating header graphics, bio descriptions, and pinning key call-to-actions on channels." },
      { title: "Weekly Content Batches", description: "Drafting posts, scripting videos, and rendering visual carousels in Figma." },
      { title: "Review & Schedule", description: "Sharing drafts on collaborative boards for client approval before queuing them up." },
      { title: "Engagement Loop", description: "Monitoring comments, replying to queries, and tracking direct message opportunities." }
    ],
    faqs: [
      { question: "Which social networks should our business prioritize?", answer: "For B2B companies, startups, and agencies, we strongly recommend focusing on LinkedIn and Twitter/X. For consumer-facing brands or creators, Instagram, YouTube, and TikTok yield the highest returns." },
      { question: "Do we need to record videos ourselves?", answer: "We can guide you through simple scripts and record over Zoom/Loom, or we can repurpose your existing webinars, podcasts, and documentation into social posts." }
    ]
  },
  {
    id: "seo",
    title: "SEO Optimization",
    category: "growth-services",
    icon: "TrendingUp",
    shortDesc: "Outrank competitors, increase organic clicks, and capture buyer intent search queries on Google.",
    longDesc: "Stop paying for every single click. Our search engine optimization services focus on capturing buyers who are actively searching for solutions. We clean up your website's technical code, write comprehensive keyword clusters, resolve speed issues, and build high-quality links. We don't focus on vanity traffic; we optimize for 'buyer intent' search queries that translate directly into booked consultations.",
    features: [
      "Deep Technical SEO Audits & Code Remediation",
      "Keyword Mapping & Competitive Gap Analysis",
      "Lighthouse & Core Web Vitals Optimization",
      "On-page Schema.org JSON-LD Structured Data",
      "Domain Authority Building & Contextual Backlinks",
      "Monthly Organic Ranking & Conversion Reporting"
    ],
    benefits: [
      "Secure top search result placements for valuable service-related terms.",
      "Reduce dependency on expensive paid ad channels like Google/Facebook ads.",
      "Build a compounding stream of organic leads that increases in volume over time.",
      "Improve user experience through faster load speeds and clear content hierarchies."
    ],
    technologies: ["Ahrefs", "Google Search Console", "Screaming Frog", "Semrush", "Next.js Metadata"],
    process: [
      { title: "Technical Remediation", description: "Fixing redirects, indexing issues, slow images, and ensuring mobile responsiveness." },
      { title: "Keyword Clustering", description: "Grouping target search phrases based on user search volume and difficulty tiers." },
      { title: "On-Page Optimization", description: "Writing structured headings, meta descriptions, alt texts, and linking pages." },
      { title: "Authority Campaigns", description: "Connecting with trade sites and publications to build authoritative contextual backlinks." }
    ],
    faqs: [
      { question: "How do you measure SEO success?", answer: "We track organic impressions, click growth, search position improvements, and most importantly, the number of leads generated specifically from search traffic." },
      { question: "What is your approach to link-building?", answer: "We focus exclusively on white-hat outreach. We write guest posts for high-quality blogs, submit to verified startup resource lists, and design data-rich graphics that naturally attract citations." }
    ]
  },
  {
    id: "video-editing",
    title: "Video Editing",
    category: "creative-services",
    icon: "Video",
    shortDesc: "High-retention video editing for YouTube, social shorts, ads, and courses that keeps viewers hooked.",
    longDesc: "In the attention economy, video is king. We transform raw footages into highly engaging, high-retention video content for YouTube, TikTok, Instagram Reels, SaaS demos, and courses. We focus on pacing, color grading, sound design, custom motion typography, and sound effects that capture attention in the first 3 seconds and maintain viewer retention until the very last frame.",
    features: [
      "Fast-paced Editing & Jump-cut Trimming",
      "Custom Motion Graphics & Lower Thirds",
      "Engaging Subtitles & Dynamic Text Popups",
      "Premium Sound Design & Background Audio Styling",
      "Color Correction & High-end Color Grading",
      "Multi-platform Formats (Vertical 9:16 & Horizontal 16:9)"
    ],
    benefits: [
      "Increase video watch time and view metrics by up to 50% through high-retention editing.",
      "Launch professional ad creatives that convert viewers into paying accounts.",
      "Save hours of technical labor and let professional editors polish your stories.",
      "Maintain a uniform visual brand style across all video publications."
    ],
    technologies: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Audition", "Framer Motion"],
    process: [
      { title: "Footage Intake & Scripting", description: "Reviewing raw takes, markers, script outlines, and noting key visual beats." },
      { title: "Rough Cut & Pacing", description: "Assembling the primary talking track, removing filler words, and matching baseline pacing." },
      { title: "Graphics & Sound Styling", description: "Injecting animated text, transitions, sound effects, B-rolls, and matching audio levels." },
      { title: "Refinements & Exports", description: "Polishing color grades, implementing client feedback, and exporting web-ready profiles." }
    ],
    faqs: [
      { question: "What is the typical turnaround time for a video edit?", answer: "For short-form vertical clips (Reels/TikTok), we edit and deliver within 24-48 hours. Long-form YouTube videos take between 3 to 5 business days." },
      { question: "Can you source background music and B-roll for us?", answer: "Yes, we have licenses for premium audio libraries and stock platforms. We source high-quality assets to complement your video." }
    ]
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    category: "creative-services",
    icon: "Palette",
    shortDesc: "Bespoke illustrations, social media carousels, slide decks, and digital assets that stand out visually.",
    longDesc: "Elevate your communication with customized graphic design assets. From high-converting LinkedIn carousels and YouTube thumbnails to digital presentation decks and advertising banners, we design clean, custom-tailored graphics. We align every design element with your brand guidelines, ensuring your business visually stands out in crowded digital spaces.",
    features: [
      "High-Click YouTube Thumbnail Graphics",
      "LinkedIn Carousel Slides & PDFs",
      "Corporate Pitch Decks & Slide Decks",
      "Digital Ad Banners (Google, Meta, LinkedIn)",
      "Bespoke Infographics & Flowcharts",
      "Custom Vector Icons & Illustrations"
    ],
    benefits: [
      "Increase thumbnail click-through rates (CTR) by up to 80% with scroll-stopping design.",
      "Present complex business structures clearly through clean, intuitive vector diagrams.",
      "Impress investors and board members with high-fidelity pitch deck visuals.",
      "Establish a premium visual style that separates your brand from cheap template builders."
    ],
    technologies: ["Figma", "Adobe Illustrator", "Photoshop", "Dimension", "Indesign"],
    process: [
      { title: "Creative Briefing", description: "Aligning on the theme, sizes, copy requirements, and overall mood expectations." },
      { title: "Concept Drafts", description: "Sketching concepts, layout designs, and determining typographic emphasis points." },
      { title: "Details & Render", description: "Creating high-res vectors, balancing color contrasts, and testing readability on screens." },
      { title: "Format Exports", description: "Delivering fully layered vectors, editable Figma links, and highly optimized web formats." }
    ],
    faqs: [
      { question: "Do we get the source Figma or Illustrator files?", answer: "Yes, we provide source Figma/Illustrator files for all designs. We believe in absolute transparency." },
      { question: "Can we request quick visual changes for ad campaigns?", answer: "Yes, our team supports ongoing marketing schedules, delivering quick edits for seasonal ad iterations within 24 hours." }
    ]
  }
];



export const projects: Project[] = [
  // BUSINESS GROWTH - WEBSITE DESIGN & DEVELOPMENT
  {
    id: "cafe-peter-delight",
    title: "11 East Street Cafe - Digital Ordering & QR Portal",
    category: "Business Growth",
    categorySlug: "business-growth",
    companyName: "11 East Street Cafe",
    industry: "Food & Hospitality (Pune)",
    tagline: "High-converting cafe web portal & table QR digital menu system",
    description: "Engineered an appetizing brand web portal with dynamic QR table ordering, online reservations, and direct delivery integration.",
    image: "/cafe-thumbnail.png",
    liveUrl: "https://hotel-three-chi.vercel.app/",
    companyOverview: {
      about: "11 East Street Cafe is Pune's premier dining landmark, renowned for artisan foods, custom mocktails, and visual aesthetic experiences.",
      requirements: [
        "Design a modern, mobile-first web portal for menu discovery and table booking.",
        "Deploy digital QR menus for fast table ordering during weekend rush hours.",
        "Drive organic local search traffic for cafe dining in Koregaon Park and FC Road."
      ],
      challenges: [
        "Weekend wait times created table turnover bottlenecks.",
        "Paper menus required frequent reprinting and costs for seasonal dishes.",
        "Aggregator delivery commissions reduced profitability."
      ]
    },
    servicesBuilt: [
      "Website Design & Development",
      "Website Design",
      "Web Development",
      "Branding",
      "UI/UX Design",
      "Performance Optimization"
    ],
    beforeAfterMetrics: {
      before: { revenue: "₹2.8L/mo", leads: "40/mo", conversionRate: "1.6%", loadSpeed: "4.2s", sales: "110/mo" },
      after: { revenue: "₹11.8L/mo", leads: "290/mo", conversionRate: "6.4%", loadSpeed: "0.6s", sales: "520/mo" },
      growthPercentages: { revenue: "+321%", leads: "+625%", conversionRate: "+300%", loadSpeed: "-85%", sales: "+372%" },
      visualMetrics: [
        { label: "Digital Menu Orders", beforeValue: 2.8, afterValue: 11.8, unit: "₹ Lakhs", percentage: "+321%" },
        { label: "Table Reservation Leads", beforeValue: 40, afterValue: 290, unit: "Leads/mo", percentage: "+625%" }
      ]
    },
    timeline: [
      { step: "01", title: "Initial Consultation", description: "Audit of dining room bottlenecks and digital menu requirements." },
      { step: "02", title: "Strategy Planning", description: "Designing instant QR web app for table browsing and pre-ordering." },
      { step: "03", title: "Design", description: "Creating vibrant, high-contrast dish photography layouts." },
      { step: "04", title: "Development", description: "Building sub-second Next.js web application." },
      { step: "05", title: "Launch", description: "Testing QR standees across all Pune branches." },
      { step: "06", title: "Marketing", description: "Launching local cafe food enthusiast SEO campaigns." },
      { step: "07", title: "Business Growth", description: "Increasing table turnover speed by 40% and boosting overall sales." }
    ],
    testimonial: {
      name: "Peter Kim",
      role: "Founder",
      company: "11 East Street Cafe",
      rating: 5,
      quote: "SmartlyGrow designed a website and digital menu system that our guests absolutely love. Table service is faster and our online visibility has never been stronger.",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop"
    }
  },
  {
    id: "aniket-tours-travels",
    title: "Aniket Tours & Travels - Direct Booking & Fleet Showcase",
    category: "Business Growth",
    categorySlug: "business-growth",
    companyName: "Aniket Tours & Travels",
    industry: "Travel & Logistics (Pune/Nagpur)",
    tagline: "Direct travel booking portal & WhatsApp instant quote system",
    description: "Developed a high-converting travel booking portal featuring instant route pricing, fleet showcases, and 1-tap WhatsApp booking confirmation.",
    image: "/aniket-tours.png",
    liveUrl: "https://www.anikettoursandtravels.in/",
    companyOverview: {
      about: "Aniket Tours & Travels operates inter-city luxury bus services, private cab rentals, and corporate travel logistics across Maharashtra.",
      requirements: [
        "Build a sleek booking website allowing customers to select routes and view vehicle fleets.",
        "Integrate 1-tap instant WhatsApp quote requests for outstation trips.",
        "Dominate organic search for Pune-Nagpur travel and luxury bus rentals."
      ],
      challenges: [
        "High dependence on phone calls led to missed inquiries during peak travel hours.",
        "No digital fleet showcase left customers uncertain about vehicle condition.",
        "Aggregator commission fees ate into profit margins."
      ]
    },
    servicesBuilt: [
      "Website Design & Development",
      "Website Design",
      "Web Development",
      "SEO",
      "Performance Optimization",
      "Marketing Strategy"
    ],
    beforeAfterMetrics: {
      before: { revenue: "₹3.0L/mo", leads: "45/mo", conversionRate: "1.8%", loadSpeed: "3.9s", sales: "90/mo" },
      after: { revenue: "₹15.2L/mo", leads: "380/mo", conversionRate: "6.7%", loadSpeed: "0.5s", sales: "490/mo" },
      growthPercentages: { revenue: "+406%", leads: "+744%", conversionRate: "+272%", loadSpeed: "-87%", sales: "+444%" },
      visualMetrics: [
        { label: "Direct Booking Sales", beforeValue: 3.0, afterValue: 15.2, unit: "₹ Lakhs", percentage: "+406%" },
        { label: "Monthly Trip Inquiries", beforeValue: 45, afterValue: 380, unit: "Inquiries", percentage: "+744%" }
      ]
    },
    timeline: [
      { step: "01", title: "Initial Consultation", description: "Mapping travel booking customer journeys and fleet pricing models." },
      { step: "02", title: "Strategy Planning", description: "Designing 1-tap route calculation and instant booking triggers." },
      { step: "03", title: "Design", description: "Crafting a clean, trustworthy travel interface with vehicle photo galleries." },
      { step: "04", title: "Development", description: "Building responsive web application with zero load delay." },
      { step: "05", title: "Launch", description: "Going live across all corporate travel channels." },
      { step: "06", title: "Marketing", description: "Deploying highway travel and inter-city transport SEO clusters." },
      { step: "07", title: "Business Growth", description: "Quadrupling direct web bookings and eliminating commission losses." }
    ],
    testimonial: {
      name: "Aniket Deshmukh",
      role: "Founder & CEO",
      company: "Aniket Tours & Travels",
      rating: 5,
      quote: "SmartlyGrow gave us a professional web booking platform that transformed our business. Direct bookings increased massively and customers praise the ease of use.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    }
  },
  {
    id: "good-willa-education",
    title: "Good Willa Education - EdTech Portal & Admission Engine",
    category: "Business Growth",
    categorySlug: "business-growth",
    companyName: "Good Willa Education",
    industry: "Education & EdTech (Nagpur)",
    tagline: "Next-Gen Student Portal & Instant Course Admission Engine",
    description: "Designed and built an ultra-fast educational web portal with online course enrollment, student registration, and instant inquiry management.",
    image: "/good-willa.png",
    liveUrl: "https://www.goodwilleducation.in/",
    companyOverview: {
      about: "Good Willa Education is a premier educational institute providing career guidance, competitive exam prep, and professional skill certifications.",
      requirements: [
        "Construct a high-speed website to showcase educational courses and certifications.",
        "Integrate automated student inquiry lead capture and WhatsApp counseling routing.",
        "Establish local Google search dominance for Nagpur skill development queries."
      ],
      challenges: [
        "Outdated static site led to student inquiry drop-offs and high bounce rates.",
        "Manual inquiry logging created counselor delays and lost enrollments.",
        "Low mobile responsiveness on smartphones used by students."
      ]
    },
    servicesBuilt: [
      "Website Design & Development",
      "Website Design",
      "Web Development",
      "SEO",
      "Performance Optimization",
      "UI/UX Design"
    ],
    beforeAfterMetrics: {
      before: { revenue: "₹1.5L/mo", leads: "30/mo", conversionRate: "1.2%", loadSpeed: "4.5s", sales: "25/mo" },
      after: { revenue: "₹8.5L/mo", leads: "240/mo", conversionRate: "5.8%", loadSpeed: "0.6s", sales: "140/mo" },
      growthPercentages: { revenue: "+466%", leads: "+700%", conversionRate: "+383%", loadSpeed: "-86%", sales: "+460%" },
      visualMetrics: [
        { label: "Course Enrollment Revenue", beforeValue: 1.5, afterValue: 8.5, unit: "₹ Lakhs", percentage: "+466%" },
        { label: "Monthly Student Leads", beforeValue: 30, afterValue: 240, unit: "Leads/mo", percentage: "+700%" },
        { label: "Enrollment Conversion Rate", beforeValue: 1.2, afterValue: 5.8, unit: "%", percentage: "+383%" }
      ]
    },
    timeline: [
      { step: "01", title: "Initial Consultation", description: "Audit of course enrollment flows and student counselor handoffs." },
      { step: "02", title: "Strategy Planning", description: "Architecting Next.js student portal with instant WhatsApp inquiry triggers." },
      { step: "03", title: "Design", description: "Designing an inspiring, modern academic interface with clear course badges." },
      { step: "04", title: "Development", description: "Building lightweight, responsive frontend deployed on edge servers." },
      { step: "05", title: "Launch", description: "Deploying production site with real-time counselor analytics." },
      { step: "06", title: "Marketing", description: "Launching regional Nagpur education SEO keyword campaigns." },
      { step: "07", title: "Business Growth", description: "Scaling monthly student admissions by 700%." }
    ],
    testimonial: {
      name: "Prashant Wankhede",
      role: "Director",
      company: "Good Willa Education",
      rating: 5,
      quote: "SmartlyGrow built an outstanding portal for Good Willa Education. Student inquiries skyrocketed and our admission counseling process became seamless.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    }
  },
  {
    id: "shree-ganesha-enterprises",
    title: "Shree Ganesha Enterprises - B2B Industrial Catalog & RFQ Engine",
    category: "Business Growth",
    categorySlug: "business-growth",
    companyName: "Shree Ganesha Enterprises",
    industry: "Industrial Supply (Nagpur)",
    tagline: "High-performance B2B equipment catalog & RFQ inquiry engine",
    description: "Constructed a comprehensive B2B industrial catalog website that streamlines product inquiries, specification downloads, and RFQ generation.",
    image: "/shree-ganesha.png",
    liveUrl: "https://shree-ganesha-enterprises.vercel.app/",
    companyOverview: {
      about: "Shree Ganesha Enterprises is a leading supplier of industrial machinery, electrical components, and heavy engineering tools in Central India.",
      requirements: [
        "Develop a multi-category B2B product catalog with downloadable spec sheets.",
        "Integrate automated Request-for-Quote (RFQ) forms connected to sales CRM.",
        "Achieve top SEO rankings for industrial machinery distribution queries."
      ],
      challenges: [
        "B2B buyers struggled to locate technical spec sheets on the old website.",
        "Sales reps spent hours emailing PDF quotes manually.",
        "Low organic visibility compared to national B2B portals."
      ]
    },
    servicesBuilt: [
      "Website Design & Development",
      "Website Design",
      "Web Development",
      "SEO",
      "Performance Optimization",
      "CRM Integration"
    ],
    beforeAfterMetrics: {
      before: { revenue: "₹4.2L/mo", leads: "25/mo", conversionRate: "1.4%", loadSpeed: "5.1s", sales: "12/mo" },
      after: { revenue: "₹22.5L/mo", leads: "180/mo", conversionRate: "5.9%", loadSpeed: "0.7s", sales: "65/mo" },
      growthPercentages: { revenue: "+435%", leads: "+620%", conversionRate: "+321%", loadSpeed: "-86%", sales: "+441%" },
      visualMetrics: [
        { label: "B2B Contract Pipeline", beforeValue: 4.2, afterValue: 22.5, unit: "₹ Lakhs", percentage: "+435%" },
        { label: "Monthly Industrial RFQs", beforeValue: 25, afterValue: 180, unit: "RFQs/mo", percentage: "+620%" }
      ]
    },
    timeline: [
      { step: "01", title: "Initial Consultation", description: "Mapping B2B industrial buying personas and catalog structure." },
      { step: "02", title: "Strategy Planning", description: "Architecting searchable product database with instant RFQ forms." },
      { step: "03", title: "Design", description: "Designing clean, authoritative industrial UI with spec tables." },
      { step: "04", title: "Development", description: "Building performant Next.js catalog site with dynamic filters." },
      { step: "05", title: "Launch", description: "Deploying site with automated sales rep CRM notifications." },
      { step: "06", title: "Marketing", description: "Deploying B2B industrial equipment SEO campaigns." },
      { step: "07", title: "Business Growth", description: "Scaling monthly B2B RFQs by over 600%." }
    ],
    testimonial: {
      name: "Ganesh Sharma",
      role: "Managing Director",
      company: "Shree Ganesha Enterprises",
      rating: 5,
      quote: "SmartlyGrow built an outstanding B2B industrial website for us. The automated quote inquiries flow directly into our sales CRM and our sales have grown dramatically.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    }
  },

  // CREATIVE SERVICES - VIDEO EDITING
  {
    id: "video-editing-showcase",
    title: "Commercial Video & Reel Production",
    category: "Creative Services",
    categorySlug: "creative-services",
    companyName: "Commercial Video & Reel Production",
    industry: "Video Editing & Content Creation",
    tagline: "High-retention reel edits, commercial color grading & motion graphics",
    description: "Professional short-form video editing, hook animations, sound design, and color grading built to maximize social reach and viewer retention.",
    image: "/video-editing-showcase.mp4",
    companyOverview: {
      about: "SmartlyGrow Creative Studio delivers high-converting commercial videos, short-form reels, and brand storytelling edits.",
      requirements: [
        "High-retention short-form video & reel editing with dynamic captions.",
        "Professional color grading, audio leveling, and cinematic sound design.",
        "Custom motion graphic overlays, lower thirds, and call-to-action popups.",
        "Optimized 9:16 and 16:9 multi-platform export for Instagram, YouTube & TikTok."
      ],
      challenges: [
        "Low audience retention on raw unedited brand video clips.",
        "Inconsistent audio quality and lack of dynamic visual hooks.",
        "Slow turnaround time from raw shoot to social publishing."
      ]
    },
    servicesBuilt: [
      "Video Editing"
    ],
    beforeAfterMetrics: {
      before: { revenue: "₹2.0L/mo", leads: "50/mo", conversionRate: "1.4%", loadSpeed: "3.5s", sales: "80/mo" },
      after: { revenue: "₹14.5L/mo", leads: "420/mo", conversionRate: "6.8%", loadSpeed: "0.5s", sales: "620/mo" },
      growthPercentages: { revenue: "+625%", leads: "+740%", conversionRate: "+385%", loadSpeed: "-85%", sales: "+675%" },
      visualMetrics: [
        { label: "Social Video Views", beforeValue: 10, afterValue: 180, unit: "k Views/mo", percentage: "+1700%" },
        { label: "Average Retention Rate", beforeValue: 14, afterValue: 68, unit: "% Retention", percentage: "+385%" }
      ]
    },
    timeline: [
      { step: "01", title: "Raw Footage Audit", description: "Analyzing video scripts, audio tracks, and key story hooks." },
      { step: "02", title: "Pacing & Cut", description: "Editing fast-paced A-roll and B-roll cuts with 3-second hook triggers." },
      { step: "03", title: "Graphics & Subtitles", description: "Adding custom animated subtitles, icons, and kinetic typography." },
      { step: "04", title: "Sound & Color", description: "Applying commercial LUT color grading and multi-track audio leveling." },
      { step: "05", title: "Multi-Platform Export", description: "Delivering high-bitrate 4K 9:16 and 16:9 master files." }
    ],
    testimonial: {
      name: "Rohit Verma",
      role: "Creative Director",
      company: "Apex Media",
      rating: 5,
      quote: "SmartlyGrow's video editing team is top tier. Their reel cuts increased our organic reach by over 10x and watch times spiked instantly.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    }
  },
  // CREATIVE SERVICES - THUMBNAIL DESIGN
  {
    id: "thumbnail-design-showcase",
    title: "High-CTR YouTube & Campaign Thumbnail Design",
    category: "Creative Services",
    categorySlug: "creative-services",
    companyName: "Thumbnail Design Studio",
    industry: "Graphic Art & Thumbnail Design",
    tagline: "High-converting visual hooks & viral thumbnail art",
    description: "Custom high-CTR thumbnail graphics engineered with psychology-backed color contrast, expressive portrait cutouts, and bold typography.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    companyOverview: {
      about: "SmartlyGrow Design Studio crafts high-performing YouTube and campaign thumbnails designed to maximize click-through rate (CTR).",
      requirements: [
        "High-contrast visual composition optimized for mobile feeds.",
        "Expressive portrait cutout isolation and rim lighting effects.",
        "Bold, readable typography with 3-word focal hierarchy.",
        "A/B test thumbnail variants for maximum organic CTR."
      ],
      challenges: [
        "Low click-through rates (under 3% CTR) on default video thumbnails.",
        "Cluttered layouts that became unreadable on mobile screens.",
        "Inconsistent visual style across YouTube series uploads."
      ]
    },
    servicesBuilt: [
      "Thumbnail Design"
    ],
    beforeAfterMetrics: {
      before: { revenue: "₹1.5L/mo", leads: "40/mo", conversionRate: "2.1%", loadSpeed: "3.0s", sales: "60/mo" },
      after: { revenue: "₹9.8L/mo", leads: "280/mo", conversionRate: "8.4%", loadSpeed: "0.5s", sales: "390/mo" },
      growthPercentages: { revenue: "+553%", leads: "+600%", conversionRate: "+300%", loadSpeed: "-83%", sales: "+550%" },
      visualMetrics: [
        { label: "Thumbnail CTR Boost", beforeValue: 2.8, afterValue: 11.4, unit: "% CTR", percentage: "+307%" },
        { label: "Organic Impressions", beforeValue: 50, afterValue: 420, unit: "k Impressions", percentage: "+740%" }
      ]
    },
    timeline: [
      { step: "01", title: "Topic Analysis", description: "Analyzing YouTube search intent and competitor thumbnail landscapes." },
      { step: "02", title: "Concepting", description: "Creating 3 distinct visual angle concepts with high emotional hook." },
      { step: "03", title: "Photoshop Compositing", description: "Cutouts, lighting effects, color grading, and focal typography." },
      { step: "04", title: "Mobile Verification", description: "Testing legibility at 10% display scale on small smartphone screens." },
      { step: "05", title: "Final Delivery", description: "Exporting crisp 1080p high-bitrate JPG/PNG variants." }
    ],
    testimonial: {
      name: "Sneha Kapur",
      role: "Channel Producer",
      company: "TechPulse",
      rating: 5,
      quote: "SmartlyGrow's thumbnail designs doubled our YouTube CTR overnight. Their understanding of visual hooks and typography is outstanding.",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
    }
  },
  // CREATIVE SERVICES - GRAPHIC DESIGN
  {
    id: "graphic-design-showcase",
    title: "Brand Visual Identity & Graphic Asset Systems",
    category: "Creative Services",
    categorySlug: "creative-services",
    companyName: "Brand Visual Identity Studio",
    industry: "Branding & Graphic Design",
    tagline: "Custom graphic assets, social kits & marketing collateral",
    description: "End-to-end graphic design systems including vector brand logos, social media templates, print collateral, and marketing asset suites.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800&auto=format&fit=crop",
    companyOverview: {
      about: "SmartlyGrow Graphic Studio creates modern, cohesive visual branding assets for high-growth digital companies.",
      requirements: [
        "Vector logo design with full brand color palette & typography hierarchy.",
        "Social media template kits for Instagram, LinkedIn, and Twitter.",
        "Print-ready marketing collateral (brochures, banners, business cards).",
        "Comprehensive brand style guide documentation."
      ],
      challenges: [
        "Outdated visual branding disconnected from modern audience expectations.",
        "Inconsistent graphic assets across marketing channels.",
        "Lack of reusable graphic templates for internal teams."
      ]
    },
    servicesBuilt: [
      "Graphic Design"
    ],
    beforeAfterMetrics: {
      before: { revenue: "₹3.0L/mo", leads: "65/mo", conversionRate: "1.8%", loadSpeed: "3.2s", sales: "110/mo" },
      after: { revenue: "₹16.0L/mo", leads: "380/mo", conversionRate: "6.9%", loadSpeed: "0.6s", sales: "580/mo" },
      growthPercentages: { revenue: "+433%", leads: "+484%", conversionRate: "+283%", loadSpeed: "-81%", sales: "+427%" },
      visualMetrics: [
        { label: "Brand Equity Index", beforeValue: 32, afterValue: 94, unit: "/100 Score", percentage: "+193%" },
        { label: "Social Engagement", beforeValue: 1.2, afterValue: 6.8, unit: "% Engagement", percentage: "+466%" }
      ]
    },
    timeline: [
      { step: "01", title: "Brand Audit", description: "Evaluating market positioning, color psychology, and audience personas." },
      { step: "02", title: "Visual Direction", description: "Creating moodboards, typography pairs, and color palettes." },
      { step: "03", title: "Asset Creation", description: "Designing vector logos, icons, social templates, and marketing decks." },
      { step: "04", title: "Style Guide", description: "Documenting spacing rules, font scales, and logo usage guidelines." },
      { step: "05", title: "Handoff", description: "Delivering organized Figma design files, SVGs, and vector packages." }
    ],
    testimonial: {
      name: "Vikram Malhotra",
      role: "Brand Director",
      company: "Nova Digital",
      rating: 5,
      quote: "SmartlyGrow completely refreshed our brand identity. The graphic assets are versatile, modern, and make our company look world-class.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    }
  },

  // AI SOLUTIONS - AI AUTOMATION
  {
    id: "ai-automation-showcase",
    title: "Autonomous Workflow & CRM Lead Automation Engine",
    category: "AI Solutions",
    categorySlug: "ai-solutions",
    companyName: "Enterprise Workflow AI Automation",
    industry: "AI Automation & Systems Integration",
    tagline: "Autonomous CRM lead triage, email parsing & multi-app workflow sync",
    description: "Built an autonomous AI workflow pipeline connecting CRMs, email inboxes, and webhooks to triage lead inquiries, parse documents, and automate follow-ups in seconds.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
    companyOverview: {
      about: "SmartlyGrow AI Labs builds custom enterprise workflow automation pipelines connecting legacy CRMs with autonomous LLM agents.",
      requirements: [
        "Automated multi-lingual inquiry email parsing & lead classification.",
        "Instant CRM webhook data enrichment & automated calendar scheduling.",
        "Cross-platform notification triggers across Slack, WhatsApp & Email.",
        "HIPAA & GDPR compliant encrypted data handling pipelines."
      ],
      challenges: [
        "Inquiries took over 6 hours to triage manually across sales reps.",
        "Manual data entry created CRM sync errors and lost leads.",
        "High prospect drop-off waiting for initial email responses."
      ]
    },
    servicesBuilt: [
      "AI Automation"
    ],
    beforeAfterMetrics: {
      before: { revenue: "₹8.0L/mo", leads: "80/mo", conversionRate: "2.4%", loadSpeed: "4.8s", sales: "15/mo" },
      after: { revenue: "₹38.0L/mo", leads: "440/mo", conversionRate: "8.9%", loadSpeed: "0.6s", sales: "68/mo" },
      growthPercentages: { revenue: "+375%", leads: "+450%", conversionRate: "+270%", loadSpeed: "-87%", sales: "+353%" },
      visualMetrics: [
        { label: "Pipeline Value", beforeValue: 8.0, afterValue: 38.0, unit: "₹ Lakhs", percentage: "+375%" },
        { label: "Triage Resolution Speed", beforeValue: 360, afterValue: 0.6, unit: "Seconds", percentage: "-99.8%" }
      ]
    },
    timeline: [
      { step: "01", title: "Workflow Audit", description: "Mapping manual triage bottlenecks and CRM webhooks." },
      { step: "02", title: "Architecture", description: "Designing Claude 3.5 & OpenAI pipeline with Zapier/Make webhooks." },
      { step: "03", title: "Development", description: "Building Python FastAPI orchestration layer with automated retries." },
      { step: "04", title: "Testing", description: "Stress testing edge-case multi-lingual inquiry prompts." },
      { step: "05", title: "Deployment", description: "Pushing live with real-time error logging." }
    ],
    testimonial: {
      name: "Ajit Patil",
      role: "CEO & Co-Founder",
      company: "DeepTek AI",
      rating: 5,
      quote: "SmartlyGrow's AI automation pipeline completely revolutionized our sales operations. Lead response times dropped from 6 hours to under 1 second.",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
    }
  },
  // AI SOLUTIONS - AI AGENTS
  {
    id: "ai-agents-showcase",
    title: "24/7 Context-Aware Customer & Sales AI Agent",
    category: "AI Solutions",
    categorySlug: "ai-solutions",
    companyName: "Autonomous Customer AI Agent",
    industry: "AI Agents & LLM RAG Systems",
    tagline: "24/7 autonomous support, technical query resolution & instant scheduling",
    description: "Deployed an intelligent AI agent trained on company documentation and databases that answers complex customer queries, resolves issues, and schedules meetings 24/7.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    companyOverview: {
      about: "SmartlyGrow AI Labs engineers context-aware AI agents utilizing Retrieval-Augmented Generation (RAG) for 24/7 customer support.",
      requirements: [
        "Custom vector database indexing company knowledge bases & docs.",
        "Autonomous ticket resolution across web chat, WhatsApp, and Slack.",
        "Human escalation fallback triggers for high-value priority accounts.",
        "Live analytics dashboard tracking resolution accuracy and CSAT."
      ],
      challenges: [
        "Support ticket backlogs reached 48 hours during peak periods.",
        "High cost of maintaining 24/7 technical support teams.",
        "Developer drop-off due to complex API troubleshooting delays."
      ]
    },
    servicesBuilt: [
      "AI Agents"
    ],
    beforeAfterMetrics: {
      before: { revenue: "₹12.0L/mo", leads: "150/mo", conversionRate: "2.4%", loadSpeed: "3.6s", sales: "80/mo" },
      after: { revenue: "₹52.0L/mo", leads: "780/mo", conversionRate: "8.2%", loadSpeed: "0.5s", sales: "390/mo" },
      growthPercentages: { revenue: "+333%", leads: "+420%", conversionRate: "+241%", loadSpeed: "-86%", sales: "+387%" },
      visualMetrics: [
        { label: "Instant Ticket Resolutions", beforeValue: 12, afterValue: 78, unit: "% Autonomous", percentage: "+550%" },
        { label: "Support Cost Reduction", beforeValue: 100, afterValue: 32, unit: "% Cost", percentage: "-68%" }
      ]
    },
    timeline: [
      { step: "01", title: "Knowledge Ingestion", description: "Extracting documentation, FAQs, and support ticket logs." },
      { step: "02", title: "Vector DB Setup", description: "Indexing knowledge vectors using Pinecone & LangChain." },
      { step: "03", title: "UI Integration", description: "Embedding responsive AI chat widget across web portals." },
      { step: "04", title: "Guardrails", description: "Configuring safety guardrails and fallback escalation logic." },
      { step: "05", title: "Launch", description: "Deploying AI agent to handle live customer traffic." }
    ],
    testimonial: {
      name: "Amit Kumar",
      role: "Head of Product",
      company: "Easebuzz",
      rating: 5,
      quote: "The AI agent built by SmartlyGrow cut our support backlog by 78% and dramatically improved customer satisfaction.",
      photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop"
    }
  },
  // AI SOLUTIONS - DATA ANALYTICS
  {
    id: "data-analytics-showcase",
    title: "Real-Time Predictive Growth & BI Analytics Dashboard",
    category: "AI Solutions",
    categorySlug: "ai-solutions",
    companyName: "Predictive BI & Intelligence Dashboard",
    industry: "Data Analytics & Business Intelligence",
    tagline: "Live conversion funnels, revenue forecasting & anomaly detection",
    description: "Engineered a unified business intelligence dashboard converting raw database logs and customer interactions into actionable, real-time growth analytics.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop",
    companyOverview: {
      about: "SmartlyGrow Data Studio builds custom BI dashboards and AI predictive analytics platforms for executive decision making.",
      requirements: [
        "Real-time visual dashboards tracking CAC, LTV, and conversion funnels.",
        "Automated AI anomaly detection highlighting churn and drop-off risks.",
        "Interactive filtering by region, customer cohort, and marketing channel.",
        "Automated weekly PDF executive intelligence reports sent via email."
      ],
      challenges: [
        "Executives relied on outdated manual Excel reports prepared weekly.",
        "Data siloed across payment gateways, CRMs, and web analytics.",
        "Inability to spot customer drop-off trends in real-time."
      ]
    },
    servicesBuilt: [
      "Data Analytics"
    ],
    beforeAfterMetrics: {
      before: { revenue: "₹5.0L/mo", leads: "70/mo", conversionRate: "1.8%", loadSpeed: "4.0s", sales: "90/mo" },
      after: { revenue: "₹24.0L/mo", leads: "360/mo", conversionRate: "7.5%", loadSpeed: "0.5s", sales: "480/mo" },
      growthPercentages: { revenue: "+380%", leads: "+414%", conversionRate: "+316%", loadSpeed: "-87.5%", sales: "+433%" },
      visualMetrics: [
        { label: "Data Decision Speed", beforeValue: 7, afterValue: 0.1, unit: "Days to Instant", percentage: "-98.5%" },
        { label: "Funnel Conversion Lift", beforeValue: 1.8, afterValue: 7.5, unit: "% Conversion", percentage: "+316%" }
      ]
    },
    timeline: [
      { step: "01", title: "Data Audit", description: "Mapping database schemas, API connectors, and reporting KPIs." },
      { step: "02", title: "ETL Pipeline", description: "Building automated DuckDB & PostgreSQL sync pipelines." },
      { step: "03", title: "Dashboard UI", description: "Designing high-contrast executive dashboards with Recharts." },
      { step: "04", title: "Predictive Models", description: "Calibrating revenue forecasting and churn risk algorithms." },
      { step: "05", title: "Deployment", description: "Configuring role-based access for executive teams." }
    ],
    testimonial: {
      name: "Dr. Rajesh Uikey",
      role: "Chief Executive Officer",
      company: "VSPM Health",
      rating: 5,
      quote: "SmartlyGrow's analytics dashboard gives us total clarity over our growth metrics. We can track conversion funnels in real-time and make data-driven decisions instantly.",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    }
  }
];

export const packages: Package[] = [
  {
    id: "starter-pack",
    name: "Starter Growth",
    price: "$2,499",
    period: "one-time",
    description: "Perfect for startups and small businesses needing an elite web presence to start generating conversions.",
    features: [
      "Premium 5-Page Next.js Marketing Site",
      "Responsive UI/UX Layouts in Figma",
      "Sub-second Load Times (100% Core Web Vitals)",
      "Technical SEO Foundation & Sitemap Setup",
      "Contact Form with E-mail Notification Sync",
      "14 Days Post-Launch Maintenance Support"
    ],
    ctaText: "Choose Starter Plan",
    popular: false,
    tier: "starter"
  },
  {
    id: "growth-pack",
    name: "Scale Accelerator",
    price: "$4,999",
    period: "monthly",
    description: "Our signature package combining premium digital development with custom AI automation to scale operations.",
    features: [
      "Everything in Starter Pack included",
      "Custom Web App / Client Portal development",
      "1 AI Workflow Automation (CRM Sync, Email parser)",
      "1 Customer Facing AI Assistant (Context aware)",
      "Content Strategy (4 High-value blog articles / month)",
      "Ongoing Monthly Performance & SEO audits",
      "Priority Slack Support (Under 4-hour response)"
    ],
    ctaText: "Choose Scale Plan",
    popular: true,
    tier: "growth"
  },
  {
    id: "enterprise-pack",
    name: "Enterprise Custom",
    price: "Custom",
    period: "project-based",
    description: "Bespoke systems, autonomous agents, custom software networks, and full brand transformations for large scale enterprises.",
    features: [
      "Unlimited Bespoke Web App Development",
      "Autonomous Multi-agent Systems & Vector DBs",
      "Complex Legacy API & Database Orchestrations",
      "Full Brand Identity Suite & Figma System Tokens",
      "Dedicated Project Manager & Lead Engineers",
      "24/7 Server Monitoring & SLA Commitments",
      "Custom Staff Training & System Handovers"
    ],
    ctaText: "Contact Sales",
    popular: false,
    tier: "enterprise"
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "ai-workflows-2026",
    title: "How to Build a Zero-Employee Lead Routing System with Claude 3.5 & Make",
    category: "AI & Automation",
    summary: "Step-by-step instructions on parsing inbound emails, qualifying prospect budgets, and updating CRM contacts using serverless AI nodes.",
    content: "In the fast-moving digital economy, speed-to-lead is the single most critical factor in winning clients. Studies show that responding to a qualified lead within 5 minutes increases conversion rates by over 300% compared to responding in 30 minutes. Yet, most companies still rely on manual sorting. In this post, we explore how to configure a fully autonomous routing sequence that ingests inquiries, maps them against budgets, drafts replies, and sets up calendar requests automatically using Claude and Make.com.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    date: "June 25, 2026",
    readTime: "6 min read",
    author: {
      name: "Hemant Bhoyar",
      role: "AI Lead",
      avatar: "/photo/ai  lead.png"
    }
  },
  {
    id: "nextjs-conversion-secrets",
    title: "Why High-Growth SaaS Teams are Migrating from WordPress to Next.js 15",
    category: "Web Development",
    summary: "We outline the core metrics—from serverless caching to security risks—behind the major shifts in B2B marketing tech stacks.",
    content: "WordPress has dominated the web for over two decades. However, as user attention spans shrink to under three seconds, standard themes and heavy plug-in lists are costing businesses real revenue. We review how server-side rendering, edge node caching, and static generation inside React-based frameworks drastically improve loading metrics, secure user interactions, and decrease monthly server costs.",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
    date: "June 18, 2026",
    readTime: "5 min read",
    author: {
      name: "Atharv Bhavsar",
      role: "Web Lead",
      avatar: "/photo/website lead.jpeg"
    }
  },
  {
    id: "seo-buyer-intent",
    title: "Forget Vanity Traffic: How to Rank for Buyer-Intent Keywords That Convert",
    category: "Growth & Marketing",
    summary: "Stop chasing keywords with high volume and zero commercial interest. Focus on low-volume, high-value conversion phrases instead.",
    content: "Many marketing agencies boast about generating thousands of hits. But if those hits are from researchers looking for free definitions, they don't help your bottom line. We analyze the search intent pipeline (informational, commercial, transactional) and explain how to structure articles that capture prospects who are ready to make a purchasing decision.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    date: "May 29, 2026",
    readTime: "8 min read",
    author: {
      name: "Aashish Jhumle",
      role: "Founder",
      avatar: "/photo/founder.png"
    }
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Vikram Malhotra",
    role: "Chief Operating Officer",
    company: "Lumina Labs",
    content: "SmartlyGrow did not just build a website; they reconstructed our entire lead ingestion pipeline. Integrating the AI email draft assistant cut our triage times by 80%. Our online conversion rates are up by 45%. Absolute professionals.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop"
  },
  {
    id: "t2",
    name: "Elena Rostova",
    role: "Founder",
    company: "Zeta Commerce",
    content: "Our custom Next.js storefront loads instantly, and the design tokens they set up in Figma have made updating our branding simple. The team delivers on time, writes extremely clean code, and remains available for long-term guidance.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop"
  },
  {
    id: "t3",
    name: "David Chen",
    role: "VP of Product",
    company: "Apex Ledger",
    content: "The autonomous customer agent built by SmartlyGrow resolves 72% of our support chats instantly. We didn't believe AI agents were this stable, but the guardrails they engineered are foolproof. Highly recommended.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=120&auto=format&fit=crop"
  }
];

export const faqData = [
  {
    question: "What exactly is an 'AI-powered business growth startup'?",
    answer: "Unlike traditional firms that only design graphics or write static pages, we integrate advanced artificial intelligence directly into your digital platforms. This means building sites that load in sub-seconds, setting up AI automation pipelines that handle manual admin work, and configuring custom AI agents that qualify leads and answer support queries 24/7."
  },
  {
    question: "Do you offer custom pricing and package iterations?",
    answer: "Yes, our starter, growth, and enterprise packages are baseline indicators. During our free discovery call, we audit your tools and requirements to construct a tailored proposal matching your timeline and target budgets."
  },
  {
    question: "Who will support and update our systems post-launch?",
    answer: "We offer dedicated post-launch support windows (up to 30 days) with all development projects. You can also opt for our monthly growth packages where we monitor server performance, optimize SEO ranks, publish fresh content, and calibrate your AI models regularly."
  },
  {
    question: "Will our team be able to edit page contents easily?",
    answer: "Absolutely. We build marketing sites with options for structured headless CMS platforms (like Sanity, Strapi, or Contentful). This allows your copywriters and marketing teams to edit text, publish articles, and update images without touching code."
  },
  {
    question: "How do we get started with SmartlyGrow?",
    answer: "Click any of our 'Book a Free Consultation' buttons to fill out a short brief about your project. From there, you can choose a convenient slot on our calendar for a 30-minute discovery call where we map out a solution blueprint."
  }
];
