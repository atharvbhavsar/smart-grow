export interface WebsiteProject {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  client: string;
  industry: string;
  year: string;
  liveUrl?: string;
  coverImage: string;
  screenshots: Array<{
    url: string;
    caption: string;
    type?: "desktop" | "mobile" | "feature";
  }>;
  techStack: string[];
  features: string[];
  challenges: string[];
  deliverables: string[];
  metrics?: {
    label: string;
    value: string;
    sublabel: string;
  }[];
}

export interface SocialMediaItem {
  id: string;
  title: string;
  client: string;
  category: "Instagram Posts" | "Carousel Designs" | "Reels & Stories" | "Growth Strategy" | "Profile Optimization";
  imageUrl: string;
  description: string;
  metrics?: string;
  tags: string[];
}

export interface PerformanceMarketingItem {
  id: string;
  title: string;
  client: string;
  platform: "Meta Ads" | "Google Ads" | "Omnichannel" | "YouTube Ads";
  screenshotUrl: string;
  additionalScreenshots?: string[];
  objective: string;
  keyHighlights: string[];
  results?: {
    metric: string;
    value: string;
  }[];
}

export interface VideoEditingItem {
  id: string;
  title: string;
  client: string;
  videoType: "Model Video" | "Broker Video" | "Clips / One-Take" | "Voiceover Video" | "Commercial Reel" | "Social Hook";
  videoUrl: string;
  thumbnailUrl: string;
  duration: string;
  aspectRatio: "16:9" | "9:16";
  description: string;
}

export interface RealEstateItem {
  id: string;
  title: string;
  client: string;
  subcategory: "google-business-profile" | "website" | "social-media";
  imageUrl?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  duration?: string;
  screenshots?: string[];
  description: string;
  deliverables?: string[];
  liveUrl?: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

export interface PosterItem {
  id: string;
  title: string;
  client: string;
  type: "Social Media Poster" | "Promotional Poster" | "Property Poster" | "Marketing Poster";
  imageUrl: string;
  description: string;
}

// 1. WEBSITE PROJECTS (The 4 core requested projects)
export const WEBSITE_PROJECTS: WebsiteProject[] = [
  {
    id: "ideal-property",
    slug: "ideal-property",
    name: "Ideal Property",
    category: "Real Estate & Luxury Housing",
    tagline: "High-Converting Real Estate Portal & Premium Property Listing Experience",
    description: "Designed and engineered a blazing-fast, mobile-first real estate web platform for Ideal Property. Features dynamic property search filters, interactive floor plans, virtual tours, instant WhatsApp lead routing, and ultra-high-converting landing pages for high-ticket residential and commercial properties.",
    client: "Ideal Property Pune",
    industry: "Real Estate & Property Development",
    year: "2025",
    liveUrl: "https://idealproperty.in",
    coverImage: "/ideal-property.png",
    screenshots: [
      { url: "/shree-ganesha.png", caption: "Ideal Property — Homepage Hero & Search Engine", type: "desktop" },
      { url: "/good-willa.png", caption: "Interactive Property Listings & Neighborhood Maps", type: "desktop" },
      { url: "/aniket-tours.png", caption: "Lead Generation Inquiry & Virtual Brochure System", type: "desktop" },
      { url: "/cafe-thumbnail.png", caption: "Mobile Responsive Property Showcase", type: "mobile" }
    ],
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Framer Motion", "MongoDB", "Cloudinary"],
    features: [
      "Sub-second property search with multi-parameter filter engine (BHK, budget, location, amenities)",
      "Automated lead capture with instant CRM and WhatsApp notification integration",
      "Interactive Google Maps and neighborhood landmark highlights",
      "High-resolution image gallery with Cloudinary image optimizations",
      "SEO-optimized schema markup for local real estate search dominance"
    ],
    challenges: [
      "Property buyers dropped off when browsing image-heavy property pages with slow load times.",
      "High bounce rate on third-party aggregator ad traffic."
    ],
    deliverables: [
      "Full Stack Web Application",
      "Property CMS & Admin Hub",
      "High-Ticket Lead Pipeline",
      "Local Real Estate SEO Infrastructure"
    ],
    metrics: [
      { label: "Lead Inquiries", value: "+380%", sublabel: "Monthly verified leads" },
      { label: "Page Load Speed", value: "0.6s", sublabel: "Next.js optimized" },
      { label: "Conversion Rate", value: "5.8%", sublabel: "Ad traffic to booked tour" }
    ]
  },
  {
    id: "lc-fitness-club-pune",
    slug: "lc-fitness-club-pune",
    name: "LC Fitness Club Pune",
    category: "Fitness, Wellness & Gym",
    tagline: "Dynamic Gym Portal, Trainer Directory & Membership Engine",
    description: "Built a high-octane, visually striking digital hub for LC Fitness Club. The platform delivers instant membership trial bookings, personal trainer discovery, class schedules, interactive BMI calculators, and social proof integration that turned the website into their #1 customer acquisition channel.",
    client: "LC Fitness Club",
    industry: "Health, Fitness & Lifestyle",
    year: "2025",
    liveUrl: "https://lcfitness.in",
    coverImage: "/good-willa.png",
    screenshots: [
      { url: "/good-willa.png", caption: "LC Fitness Club — Dynamic Homepage & Membership Showcase", type: "desktop" },
      { url: "/cafe-thumbnail.png", caption: "Trainer Roster & Class Booking Grid", type: "desktop" },
      { url: "/shree-ganesha.png", caption: "Member Transformations & Social Proof", type: "desktop" },
      { url: "/aniket-tours.png", caption: "Mobile-First Membership Onboarding Flow", type: "mobile" }
    ],
    techStack: ["Next.js 15", "React 19", "Tailwind CSS", "Framer Motion", "Node.js"],
    features: [
      "Free 3-day pass booking flow with automated SMS verification",
      "Interactive weekly class timetable with real-time seat tracking",
      "Trainer profile showcase with client transformation sliders",
      "Integrated Google Reviews and social video reels carousel",
      "One-click payment gateway integration for monthly & annual memberships"
    ],
    challenges: [
      "Walk-in footfall was unpredictable without an online trial reservation system.",
      "Generic social presence failed to convey the premium gym equipment and certified trainer roster."
    ],
    deliverables: [
      "Custom Brand Website",
      "Trial Membership Booking Funnel",
      "Trainer Directory & CMS",
      "Local Gym SEO Domination"
    ],
    metrics: [
      { label: "Trial Signups", value: "+450%", sublabel: "Direct online passes" },
      { label: "Member Signups", value: "3.2x", sublabel: "Monthly gym conversions" },
      { label: "Google Rank", value: "#1", sublabel: "Pune Gym keywords" }
    ]
  },
  {
    id: "acharya-gurukulam",
    slug: "acharya-gurukulam",
    name: "Acharya Gurukulam",
    category: "Education & Cultural Academy",
    tagline: "Prestigious Academic Institution Portal & Admissions Engine",
    description: "Engineered a sophisticated, culturally aligned web ecosystem for Acharya Gurukulam. Features comprehensive academic curriculum guides, online student registration, interactive campus virtual tour, fee structure breakdowns, and an automated inquiry portal for parents.",
    client: "Acharya Gurukulam",
    industry: "Education, Vedic Learning & Academy",
    year: "2025",
    liveUrl: "https://acharyagurukulam.org",
    coverImage: "/aniket-tours.png",
    screenshots: [
      { url: "/aniket-tours.png", caption: "Acharya Gurukulam — Grand Hero & Academic Vision", type: "desktop" },
      { url: "/shree-ganesha.png", caption: "Curriculum Pathways & Faculty Directory", type: "desktop" },
      { url: "/good-willa.png", caption: "Campus Facilities & Student Life Gallery", type: "desktop" },
      { url: "/cafe-thumbnail.png", caption: "Online Admission Application Flow", type: "desktop" }
    ],
    techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "PostgreSQL", "Cloudinary"],
    features: [
      "Multi-stage digital admission application portal with document upload",
      "Interactive curriculum browser spanning traditional & modern academic streams",
      "Campus life media gallery with high-speed Cloudinary image transformations",
      "Parent notice board & announcements system with instant alerts",
      "Accessible typography and multi-lingual language readiness"
    ],
    challenges: [
      "Admissions required heavy manual paperwork and physical visits.",
      "Parents outside the city could not easily evaluate the academy's unique pedagogical approach."
    ],
    deliverables: [
      "Institutional Web Portal",
      "Digital Admissions System",
      "Campus Media Hub",
      "Education Schema & SEO"
    ],
    metrics: [
      { label: "Admissions Inquiries", value: "+290%", sublabel: "Online registrations" },
      { label: "Parent Engagement", value: "4.8m", sublabel: "Avg session duration" },
      { label: "Out-of-state Leads", value: "+180%", sublabel: "Pan-India reach" }
    ]
  },
  {
    id: "umed-care-center",
    slug: "umed-care-center",
    name: "Umed Care Center",
    category: "Healthcare, Clinic & Medical Wellness",
    tagline: "Patient-First Healthcare Platform & Appointment Engine",
    description: "Designed a reassuring, clean, medical platform for Umed Care Center. Streamlines patient appointment scheduling, doctor consultations, specialized treatment department overviews, verified patient testimonials, and 24/7 emergency care contact access.",
    client: "Umed Care Center",
    industry: "Healthcare, Medicine & Rehabilitation",
    year: "2025",
    liveUrl: "https://umedcarecenter.com",
    coverImage: "/cafe-thumbnail.png",
    screenshots: [
      { url: "/cafe-thumbnail.png", caption: "Umed Care Center — Clean Healthcare Portal & Emergency Care", type: "desktop" },
      { url: "/good-willa.png", caption: "Doctor Profiles & Specialty Department Guides", type: "desktop" },
      { url: "/shree-ganesha.png", caption: "Instant Appointment Booking Calendar", type: "desktop" },
      { url: "/aniket-tours.png", caption: "Patient Care Guides & Medical FAQs", type: "desktop" }
    ],
    techStack: ["Next.js 15", "React 19", "Tailwind CSS", "Framer Motion", "MongoDB"],
    features: [
      "Instant doctor consultation booking calendar with time-slot selection",
      "Department-wise treatment guides (Cardiology, Orthopedics, Wellness, Rehab)",
      "Emergency 1-click call and hospital navigation routing",
      "Doctor credential cards with patient review badges",
      "Accessible WCAG-compliant design with high-contrast color palette"
    ],
    challenges: [
      "Phone-based appointment booking caused long hold times and lost patient leads.",
      "Lack of clear digital information on treatment procedures caused patient anxiety."
    ],
    deliverables: [
      "Medical & Healthcare Web Portal",
      "Online Appointment Booking Engine",
      "Physician & Department Directory",
      "Local Medical SEO & Google Knowledge Graph"
    ],
    metrics: [
      { label: "Online Appointments", value: "+520%", sublabel: "Direct web bookings" },
      { label: "Call Center Load", value: "-60%", sublabel: "Automated booking reduction" },
      { label: "Patient Satisfaction", value: "98%", sublabel: "Positive feedback score" }
    ]
  }
];

// 2. SOCIAL MEDIA MANAGEMENT & GROWTH ITEMS
export const SOCIAL_MEDIA_ITEMS: SocialMediaItem[] = [
  {
    id: "sm-1",
    title: "High-Converting Real Estate Creative Campaign",
    client: "Ideal Property",
    category: "Instagram Posts",
    imageUrl: "/photo/Screenshot 2026-06-28 005845.png",
    description: "Curated architectural aesthetics, typography hierarchy, and clear property CTA that generated 120+ direct inquiries within 72 hours.",
    metrics: "120+ Inquiries · 45K Impressions",
    tags: ["Real Estate", "Instagram Post", "Graphic Design"]
  },
  {
    id: "sm-2",
    title: "LC Fitness Club Transformation Carousel",
    client: "LC Fitness Club",
    category: "Carousel Designs",
    imageUrl: "/photo/Screenshot 2026-06-28 005854.png",
    description: "10-slide educational and transformation carousel explaining progressive overload and member success story, achieving a 14.2% save rate.",
    metrics: "14.2% Save Rate · 3.8K Shares",
    tags: ["Fitness", "Carousel", "Education"]
  },
  {
    id: "sm-3",
    title: "Healthcare Wellness & Doctor Tips Series",
    client: "Umed Care Center",
    category: "Instagram Posts",
    imageUrl: "/photo/Screenshot 2026-06-28 005900.png",
    description: "Authoritative medical advice graphics with clean typography and friendly physician portraits that established local thought leadership.",
    metrics: "28K Reach · 850 Saves",
    tags: ["Healthcare", "Authority Content", "Doctor Series"]
  },
  {
    id: "sm-4",
    title: "Acharya Gurukulam Heritage & Admission Reels",
    client: "Acharya Gurukulam",
    category: "Reels & Stories",
    imageUrl: "/photo/Screenshot 2026-06-28 005908.png",
    description: "Visual storytelling highlighting cultural education and campus life, driving 180+ organic admission inquiries during seasonal intake.",
    metrics: "180K Video Views · 180+ Inquiries",
    tags: ["Education", "Reels", "Storytelling"]
  },
  {
    id: "sm-5",
    title: "OneCard Exclusive Lifestyle Creatives",
    client: "ONE CARD",
    category: "Instagram Posts",
    imageUrl: "/photo/Screenshot 2026-06-28 005915.png",
    description: "Sleek dark-mode lifestyle posts highlighting metallic card perks, reward multipliers, and seamless mobile banking.",
    metrics: "95K Impressions · 4.8% CTR",
    tags: ["FinTech", "Lifestyle", "Branding"]
  },
  {
    id: "sm-6",
    title: "30-Day Content Calendar & Growth Strategy",
    client: "SmartlyGrow Partner Brands",
    category: "Growth Strategy",
    imageUrl: "/photo/Screenshot 2026-06-28 005922.png",
    description: "Systematic monthly editorial roadmap balancing viral hooks, authority case studies, user-generated content, and conversion offers.",
    metrics: "+340% Follower Growth in 90 Days",
    tags: ["Strategy", "Calendar", "Organic Growth"]
  },
  {
    id: "sm-7",
    title: "Instagram Bio, Highlights & Profile Architecture",
    client: "LC Fitness Club",
    category: "Profile Optimization",
    imageUrl: "/photo/Screenshot 2026-06-28 005927.png",
    description: "Complete profile makeover including bio copywriting, custom brand highlight covers, pinned conversion posts, and link-in-bio funnel.",
    metrics: "2.8x Bio Link Click-Through Rate",
    tags: ["Optimization", "Bio & Highlights", "Funnel"]
  },
  {
    id: "sm-8",
    title: "Promotional Weekend Launch Posters",
    client: "Ideal Property",
    category: "Instagram Posts",
    imageUrl: "/photo/Screenshot 2026-06-28 005936.png",
    description: "Limited-inventory pre-launch announcement banners designed for high urgency and click-to-WhatsApp messaging campaigns.",
    metrics: "85 Site Visits Booked",
    tags: ["Real Estate", "Launch Creative", "Direct Response"]
  }
];

// 3. PERFORMANCE MARKETING ITEMS
export const PERFORMANCE_MARKETING_ITEMS: PerformanceMarketingItem[] = [
  {
    id: "pm-1",
    title: "Meta Ads Performance & Lead Generation Campaign",
    client: "Client Growth Project",
    platform: "Meta Ads",
    screenshotUrl: "/performance/performance-report-1.png",
    objective: "Engineered and scaled high-intent Meta Ads campaigns with targeted audience segmentation, optimized creative testing, and automated lead capture.",
    keyHighlights: [
      "Audience targeting based on location, verified interests, behaviour, and demographics",
      "Dynamic creative testing with high-converting hooks and direct call-to-actions",
      "Instant lead capture with rapid customer response routing",
      "Targeted retargeting to maximize conversion rates and lower cost per acquisition"
    ],
    results: [
      { metric: "Campaign", value: "Meta Ads" },
      { metric: "Lead Engine", value: "Active" },
      { metric: "ROI Focus", value: "High ROAS" }
    ]
  },
  {
    id: "pm-2",
    title: "Scale & Acquisition Campaign Analytics",
    client: "Lead Acquisition Campaign",
    platform: "Meta Ads",
    screenshotUrl: "/performance/performance-report-2.png",
    objective: "Strategic paid acquisition campaign built to reach wider target demographics, generate qualified customer inquiries, and maximize marketing ROI.",
    keyHighlights: [
      "Optimized cost per acquisition across demographic segments",
      "Multi-variant ad performance testing and conversion tracking",
      "Rapid reach expansion beyond organic limits",
      "Comprehensive tracking and data-driven budget allocation"
    ],
    results: [
      { metric: "Targeting", value: "Qualified" },
      { metric: "Ad Spend", value: "Optimized" },
      { metric: "Growth", value: "Accelerated" }
    ]
  }
];

// 4. VIDEO EDITING ITEMS (VIDEO-FIRST)
export const VIDEO_EDITING_ITEMS: VideoEditingItem[] = [
  {
    id: "vid-1",
    title: "Cinematic High-Impact Commercial Reel",
    client: "SmartlyGrow Studio Production",
    videoType: "Commercial Reel",
    videoUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790456519/smartlygrow/public/video-editing-showcase.mp4",
    thumbnailUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790456519/smartlygrow/public/video-editing-showcase.jpg",
    duration: "0:45",
    aspectRatio: "16:9",
    description: "Fast-paced, motion-designed commercial reel highlighting typography, dynamic 3D transitions, sound design, and color grading."
  },
  {
    id: "vid-2",
    title: "Model & Fashion Brand Vertical Showcase",
    client: "Urban Trendsetters",
    videoType: "Model Video",
    videoUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790456312/smartlygrow/public/video/reel1.mp4",
    thumbnailUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790456312/smartlygrow/public/video/reel1.jpg",
    duration: "0:30",
    aspectRatio: "9:16",
    description: "Vibrant portrait video with custom color grade, kinetic subtitles, beat-synced pacing, and high-retention visual hooks."
  },
  {
    id: "vid-3",
    title: "Real Estate Broker Luxury Walkthrough",
    client: "Ideal Property",
    videoType: "Broker Video",
    videoUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790456327/smartlygrow/public/video/reel2.mp4",
    thumbnailUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790456327/smartlygrow/public/video/reel2.jpg",
    duration: "0:40",
    aspectRatio: "9:16",
    description: "Professional broker walk-and-talk video with lower thirds, smooth stabilization, audio cleanup, and call-to-action overlays."
  },
  {
    id: "vid-4",
    title: "One-Take Facility & Gym Tour",
    client: "LC Fitness Club",
    videoType: "Clips / One-Take",
    videoUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790456519/smartlygrow/public/video-editing-showcase.mp4",
    thumbnailUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790456519/smartlygrow/public/video-editing-showcase.jpg",
    duration: "0:55",
    aspectRatio: "16:9",
    description: "Seamless single-take camera flow through premium gym zones with dynamic speed ramps and upbeat electronic audio mastering."
  },
  {
    id: "vid-5",
    title: "Doctor Consultation & Healthcare Voiceover",
    client: "Umed Care Center",
    videoType: "Voiceover Video",
    videoUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790456312/smartlygrow/public/video/reel1.mp4",
    thumbnailUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790456312/smartlygrow/public/video/reel1.jpg",
    duration: "0:35",
    aspectRatio: "9:16",
    description: "Empathetic medical explanation video with professional voiceover, custom B-roll integration, and animated infographic callouts."
  },
  {
    id: "vid-6",
    title: "High-Retention Social Hook Video",
    client: "ONE CARD",
    videoType: "Social Hook",
    videoUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790456327/smartlygrow/public/video/reel2.mp4",
    thumbnailUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790456327/smartlygrow/public/video/reel2.jpg",
    duration: "0:25",
    aspectRatio: "9:16",
    description: "High-retention UGC-style hook video crafted specifically to prevent drop-off in the first 3 seconds of Instagram and YouTube feeds."
  }
];

// 5. REAL ESTATE DEDICATED DATA (3 SUBCATEGORIES)
export const REAL_ESTATE_DATA = {
  googleBusinessProfile: [
    {
      id: "re-gbp-1",
      title: "Turning Google Maps into a consistent source of high-intent property enquiries",
      client: "Ideal Property",
      subcategory: "google-business-profile" as const,
      imageUrl: "/ideal-property-gmb.png",
      screenshots: [
        "/ideal-property-gmb.png"
      ],
      description: "We optimized Ideal Property’s local presence to improve visibility for commercial and industrial real-estate searches across Pune.",
      deliverables: [
        "Google Maps Visibility — Improved rankings for high-intent local searches.",
        "Direct Enquiries — Connected Maps visitors directly to calls and WhatsApp.",
        "Local Authority — Optimized business information, media, citations, and reviews."
      ],
      stats: []
    }
  ],
  website: [
    {
      id: "re-web-1",
      title: "Discover Your Dream Home — High-Performance Real Estate Portal",
      client: "Ideal Property",
      subcategory: "website" as const,
      imageUrl: "/ideal-property-website.png",
      screenshots: [
        "/ideal-property-website.png"
      ],
      liveUrl: "https://www.idealproperty.in",
      description: "Engineered a custom, mobile-first web platform for Ideal Property with fast property filters, luxury presentation, and instant WhatsApp inquiry routing.",
      deliverables: [
        "Mobile-First Property Search — Fast location and property type search engine.",
        "Direct Enquiries — Integrated call and WhatsApp lead capture funnels.",
        "Ultra-Fast Next.js Performance — Sub-second loading speeds optimized for mobile."
      ],
      stats: []
    }
  ],
  socialMedia: [
    {
      id: "re-sm-1",
      title: "NIBM Luxury Property Walkthrough Reel",
      client: "Ideal Property",
      subcategory: "social-media" as const,
      videoUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790461885/smartlygrow/video_editing/video_3373.mp4",
      thumbnailUrl: "https://res.cloudinary.com/wo9m0q6n/image/upload/v1790461887/smartlygrow/video_editing/video_3373_thumb.jpg",
      duration: "0:39",
      description: "High-retention architectural walkthrough reel highlighting prime luxury property layouts, amenities, and location connectivity."
    },
    {
      id: "re-sm-2",
      title: "Modern Interior & Flat Walkthrough Tour",
      client: "Ideal Property",
      subcategory: "social-media" as const,
      videoUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790462601/smartlygrow/real_estate/video_1997.mp4",
      thumbnailUrl: "https://res.cloudinary.com/wo9m0q6n/image/upload/v1790462604/smartlygrow/real_estate/video_1997_thumb.jpg",
      duration: "0:49",
      description: "Engaging indoor walkthrough showcasing luxury flat specifications, natural lighting, and modern finishes."
    },
    {
      id: "re-sm-3",
      title: "Real Estate Buyer Advisory & Market Guidance",
      client: "Ideal Property",
      subcategory: "social-media" as const,
      videoUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790462665/smartlygrow/real_estate/video_1962.mp4",
      thumbnailUrl: "https://res.cloudinary.com/wo9m0q6n/image/upload/v1790462667/smartlygrow/real_estate/video_1962_thumb.jpg",
      duration: "0:28",
      description: "Founder-led advisory reel giving direct, transparent real estate buying tips and market insights for Pune property seekers."
    },
    {
      id: "re-sm-4",
      title: "20+ Years Market Experience & Trust",
      client: "Ideal Property",
      subcategory: "social-media" as const,
      videoUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790462724/smartlygrow/real_estate/video_1959.mp4",
      thumbnailUrl: "https://res.cloudinary.com/wo9m0q6n/image/upload/v1790462727/smartlygrow/real_estate/video_1959_thumb.jpg",
      duration: "0:34",
      description: "Authority-building reel highlighting two decades of real estate advisory, trust, and proven client satisfaction."
    }
  ]
};

// 6. BRANDING / CREATIVE CONTENT DATA
export const BRANDING_CREATIVE_DATA = {
  branding: [
    {
      id: "brand-1",
      title: "Brand Logo & Emblem",
      client: "Ideal Property",
      imageUrl: "/ideal-property-logo.png",
      description: ""
    },
    {
      id: "brand-2",
      title: "Business Stationery & Card",
      client: "Ideal Property",
      imageUrl: "/ideal-property-card.png",
      description: ""
    },
    {
      id: "brand-3",
      title: "Brand Landscape Signage",
      client: "Ideal Property",
      imageUrl: "/ideal-property-banner.png",
      description: ""
    }
  ],
  videos: [
    {
      id: "bv-1",
      title: "NIBM Luxury Property Model Reel",
      client: "Ideal Property",
      type: "Model Videos" as const,
      videoUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790456668/smartlygrow/video_editing/IMG_1863_MOV.mov",
      thumbnailUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790456668/smartlygrow/video_editing/IMG_1863_MOV.jpg",
      duration: "0:35",
      description: "Cinematic model-led property walkthrough reel with on-screen hook and high-energy pacing."
    },
    {
      id: "bv-2",
      title: "Pune Property Market Model Reel",
      client: "Ideal Property",
      type: "Model Videos" as const,
      videoUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790456725/smartlygrow/video_editing/IMG_1868_MOV.mov",
      thumbnailUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790456725/smartlygrow/video_editing/IMG_1868_MOV.jpg",
      duration: "0:30",
      description: "High-retention model presenter reel engaging social viewers with direct market questions and calls-to-action."
    },
    {
      id: "bv-3",
      title: "Real Estate Property Tour · Clip 01",
      client: "Ideal Property",
      type: "Clips / One-Take Videos" as const,
      videoUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790456418/smartlygrow/public/video/video-01.mov",
      thumbnailUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790456418/smartlygrow/public/video/video-01.jpg",
      duration: "0:37",
      description: "Seamless single-take continuous walkthrough highlighting property architecture, space flow, and ambient interiors."
    },
    {
      id: "bv-4",
      title: "Real Estate Property Tour · Clip 02",
      client: "Ideal Property",
      type: "Clips / One-Take Videos" as const,
      videoUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790456505/smartlygrow/public/video/video-02.mov",
      thumbnailUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790456505/smartlygrow/public/video/video-02.jpg",
      duration: "0:36",
      description: "Dynamic one-take indoor presentation capturing luxury fittings, natural lighting, and prime room aesthetics."
    },
    {
      id: "bv-5",
      title: "Real Estate Property Tour · Clip 03",
      client: "Ideal Property",
      type: "Clips / One-Take Videos" as const,
      videoUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790457152/smartlygrow/videos/IMG_1863__1__MOV.mov",
      thumbnailUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790457152/smartlygrow/videos/IMG_1863__1__MOV.jpg",
      duration: "0:47",
      description: "Full single-shot perspective showcase emphasizing layout spaciousness, design craftsmanship, and key highlights."
    },
    {
      id: "bv-6",
      title: "Real Estate Buyer Advisory & Insights",
      client: "Ideal Property",
      type: "Broker Videos" as const,
      videoUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790461670/smartlygrow/video_editing/video_1868.mp4",
      thumbnailUrl: "https://res.cloudinary.com/wo9m0q6n/image/upload/v1790461671/smartlygrow/video_editing/video_1868_thumb.jpg",
      duration: "0:36",
      description: "Founder & broker advisory video giving transparent advice on high-ticket real estate purchases."
    },
    {
      id: "bv-7",
      title: "20+ Years Market Experience Authority",
      client: "Ideal Property",
      type: "Broker Videos" as const,
      videoUrl: "https://res.cloudinary.com/wo9m0q6n/video/upload/v1790461784/smartlygrow/video_editing/video_2556.mp4",
      thumbnailUrl: "https://res.cloudinary.com/wo9m0q6n/image/upload/v1790461786/smartlygrow/video_editing/video_2556_thumb.jpg",
      duration: "0:31",
      description: "Authority-building broker presentation highlighting 20+ years in the Pune property market."
    }
  ],
  posters: [
    {
      id: "post-1",
      title: "Social Media Commercial Poster 01",
      client: "Ideal Property",
      type: "Commercial Poster" as const,
      imageUrl: "/poster-01.png",
      description: "High-impact promotional campaign creative with crisp typography and striking visual balance."
    },
    {
      id: "post-2",
      title: "Social Media Commercial Poster 02",
      client: "Ideal Property",
      type: "Commercial Poster" as const,
      imageUrl: "/poster-02.png",
      description: "Engaging commercial visual design tailored for multi-platform digital reach and engagement."
    },
    {
      id: "post-3",
      title: "Social Media Commercial Poster 03",
      client: "Ideal Property",
      type: "Commercial Poster" as const,
      imageUrl: "/poster-03.png",
      description: "Tailored brand creative highlighting key offers and clean visual hierarchy."
    },
    {
      id: "post-4",
      title: "Social Media Commercial Poster 04",
      client: "Ideal Property",
      type: "Commercial Poster" as const,
      imageUrl: "/poster-04.png",
      description: "Bold marketing and event showcase poster crafted for high conversion and brand recall."
    }
  ]
};
