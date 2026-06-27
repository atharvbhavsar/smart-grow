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
  category: 'Digital Products' | 'AI Solutions' | 'Creative Services' | 'Growth Services';
  tagline: string;
  description: string;
  client: string;
  impact: string;
  challenge: string;
  solution: string;
  technologies: string[];
  results: string[];
  image: string;
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
  {
    id: "vessel-saas",
    title: "Vessel AI - SaaS Client Dashboard",
    category: "Digital Products",
    tagline: "High-performance client portal with real-time AI usage data",
    description: "Vessel AI needed a premium customer portal to showcase system usage metrics, allow API key self-generation, and manage subscription billing pipelines.",
    client: "Vessel AI",
    impact: "+140% User Activation",
    challenge: "Vessel's previous dashboard was slow, prone to database locking, and had a confusing UI which led to a high volume of setup-related support tickets.",
    solution: "We built a Next.js client app utilizing Supabase for low-latency queries, created interactive real-time usage charts with Plotly, and integrated automatic Stripe checkout. We added subtle entry animations and skeletons for a smooth premium feel.",
    technologies: ["Next.js", "React", "Tailwind CSS", "Supabase", "Plotly.js", "Stripe API"],
    results: [
      "Reduced setup support requests by 65% in the first month.",
      "Improved LCP loading speed to 1.1 seconds worldwide.",
      "Increased user trial activation rate by 140% through intuitive onboarding steps."
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "sentinel-automation",
    title: "Sentinel Health - AI Email Agent",
    category: "AI Solutions",
    tagline: "Autonomous customer inquiry parsing and automated clinic routing",
    description: "Sentinel Health operates 12 clinics. They needed an automated solution to analyze incoming medical inquiries, extract patient details, and route cases.",
    client: "Sentinel Health Group",
    impact: "-85% Handling Time",
    challenge: "Staff spent 4 hours every morning manually sorting emails, reading through clinical backgrounds, and copying patient details into their legacy EHR system.",
    solution: "We designed a secure Python-based AI automation pipeline. It parses incoming emails via Claude 3.5 Sonnet, flags urgent medical conditions, generates draft responses, and pushes structured patient profiles directly into the clinic CRM.",
    technologies: ["Python", "Claude 3.5 Sonnet", "Make.com", "Hubspot CRM API", "AWS Lambda"],
    results: [
      "Saved 28 employee-hours per week from routine administrative triage.",
      "Reduced email response times from an average of 6 hours to 90 seconds.",
      "Achieved 99.4% accuracy in classification and routing across 12 physical branches."
    ],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "nexis-branding",
    title: "Nexis Capital - Brand Evolution",
    category: "Creative Services",
    tagline: "Rebranding a venture capital firm with clean design assets",
    description: "Nexis Capital wanted to shed their traditional corporate look and reposition themselves as an elite, tech-forward venture fund supporting modern tech founders.",
    client: "Nexis Capital",
    impact: "$80M Capital Raised",
    challenge: "Their visual materials felt outdated and did not appeal to modern, hyper-growth startup founders raising Seed and Series A financing rounds.",
    solution: "We overhauled their brand guidelines, designed a crisp geometric logo, created a cohesive dark/light slate color palette, and built a custom interactive marketing site with digital pitch deck resources.",
    technologies: ["Brand System", "Figma", "Next.js", "Tailwind CSS", "Motion Graphics"],
    results: [
      "Delivered a complete, scalable design token system utilized across all marketing pages.",
      "Supported the visual marketing materials for their new $80M Series III tech fund.",
      "Increased digital pitch deck downloads by 210% in the first two weeks."
    ],
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "apex-seo",
    title: "Apex Logistics - Search Authority",
    category: "Growth Services",
    tagline: "Dominating supply-chain search terms to drive B2B inquiries",
    description: "Apex wanted to rank #1 for nationwide freight shipping queries, moving away from expensive paid advertising to secure long-term organic leads.",
    client: "Apex Logistics LLC",
    impact: "+400% Organic Leads",
    challenge: "Apex paid $12+ per click on Google Search Ads, leading to high client acquisition costs and low relative margins.",
    solution: "We carried out a technical SEO audit, resolved site speed bottlenecks, mapped keyword intent targets, and deployed 32 high-value keyword clusters, securing backlinks from authoritative industry journals.",
    technologies: ["SEO Architecture", "Technical Audit", "Content Strategy", "Ahrefs", "Beehiiv"],
    results: [
      "Attained #1 organic position for 'enterprise freight logistics' and 18 related terms.",
      "Increased organic B2B lead generation by 400% in 90 days.",
      "Decreased client acquisition costs by 70% by replacing paid ad budgets with organic traffic."
    ],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop"
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
    content: "SmartyGrow did not just build a website; they reconstructed our entire lead ingestion pipeline. Integrating the AI email draft assistant cut our triage times by 80%. Our online conversion rates are up by 45%. Absolute professionals.",
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
    content: "The autonomous customer agent built by SmartyGrow resolves 72% of our support chats instantly. We didn't believe AI agents were this stable, but the guardrails they engineered are foolproof. Highly recommended.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=120&auto=format&fit=crop"
  }
];

export const faqData = [
  {
    question: "What exactly is an 'AI-powered business growth agency'?",
    answer: "Unlike traditional agencies that only design graphics or write static pages, we integrate advanced artificial intelligence directly into your digital platforms. This means building sites that load in sub-seconds, setting up AI automation pipelines that handle manual admin work, and configuring custom AI agents that qualify leads and answer support queries 24/7."
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
    question: "How do we get started with SmartyGrow?",
    answer: "Click any of our 'Book a Free Consultation' buttons to fill out a short brief about your project. From there, you can choose a convenient slot on our calendar for a 30-minute discovery call where we map out a solution blueprint."
  }
];
