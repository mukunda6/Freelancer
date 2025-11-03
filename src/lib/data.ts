
import { PlaceHolderImages } from "./placeholder-images";

export type Project = {
  id: string;
  title: string;
  description: string;
  requirements: string;
  features: string;
  impact: string;
  budget: number;
  category: string;
  postedBy: string;
  imageUrl: string;
  imageHint: string;
  skills: string[];
  duration: string;
  videoUrl?: string;
};

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform Redesign',
    description: 'Retail Co, a growing online fashion retailer, was struggling with a dated and clunky Shopify store. The user experience was poor, especially on mobile devices, leading to high bounce rates and cart abandonment.',
    requirements: 'The primary requirement was a comprehensive overhaul of the platform to create a modern, intuitive, and high-converting shopping experience. This included a full UX audit, development of a new design system, and a custom Shopify theme that aligned with their refreshed brand identity. The site needed to be fully responsive, with a focus on mobile-first design, and integrate seamlessly with their existing inventory management system.',
    features: '- Custom Shopify theme with a modern, clean design.\n- Mobile-first, responsive layout for all devices.\n- Intuitive navigation and product discovery.\n- Streamlined checkout process to reduce cart abandonment.\n- Integration with a new design system for brand consistency.',
    impact: "The redesigned platform was a massive success, boosting conversion rates by 40% in the first quarter. The mobile-first design and improved navigation reduced the bounce rate by 25%, and the client reported a significant increase in customer satisfaction and repeat business.",
    budget: 5000,
    category: 'Web Development',
    postedBy: 'Retail Co',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-image-1')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-image-1')?.imageHint || '',
    skills: ['UI/UX', 'Shopify', 'React', 'Design Systems'],
    duration: '6 Weeks',
    videoUrl: 'https://hailuoai.video/share/ai-video/pwR4J1pmR00W?source-scene=shared&source-media=shared_link'
  },
  {
    id: '2',
    title: 'Mobile App for Fitness Tracking',
    description: 'FitLife Inc. wanted to create a best-in-class, cross-platform mobile app for fitness enthusiasts to track their workouts, nutrition, and progress.',
    requirements: 'The app needed to be built with React Native for a consistent experience on both iOS and Android. Key requirements included real-time data synchronization with wearables (like Apple Watch and Fitbit), social sharing capabilities, and a robust backend to handle user data securely. The UI/UX had to be engaging and motivating to encourage daily use.',
    features: '- Real-time workout and nutrition tracking.\n- Integration with popular fitness wearables.\n- Social sharing features to build a community.\n- AI-driven personalized fitness and meal plans.\n- Gamified progress tracking with achievements and leaderboards.',
    impact: "The app was an instant hit, achieving over 50,000 downloads in the first three months with a 4.8-star rating. The intuitive UI and personalized features led to high user retention. The social sharing feature created a viral loop, driving organic downloads and building a strong user community.",
    budget: 8000,
    category: 'Mobile Development',
    postedBy: 'FitLife Inc.',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-image-2')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-image-2')?.imageHint || '',
    skills: ['React Native', 'Firebase', 'UI/UX', 'Mobile Design'],
    duration: '3 Months'
  },
  {
    id: '3',
    title: 'Brand Identity and Logo Design',
    description: 'A stealth-mode fintech startup needed to establish a strong, trustworthy brand presence before its public launch to attract investors and early adopters.',
    requirements: 'The project involved developing a complete brand identity from the ground up. This included creating a modern and memorable logo, defining a comprehensive color palette and typography system, and producing a full brand style guide. The visual identity needed to convey security, innovation, and user-friendliness to a tech-savvy audience.',
    features: '- A modern, memorable logo and brand mark.\n- A comprehensive brand style guide.\n- A defined color palette and typography system.\n- Templates for marketing materials and presentations.\n- Social media branding assets.',
    impact: "The professional brand identity was crucial in the client's successful pre-launch marketing. It helped them build credibility and played a significant role in their pitch decks, contributing to them securing their first round of seed funding within two months of the brand launch.",
    budget: 2500,
    category: 'Design',
    postedBy: 'Fintech Startup',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-image-3')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-image-3')?.imageHint || '',
    skills: ['Branding', 'Logo Design', 'Illustration', 'Style Guides'],
    duration: '4 Weeks'
  },
    {
    id: '4',
    title: 'Content Strategy for SaaS Blog',
    description: 'CloudCorp, a B2B SaaS provider, was struggling to generate organic traffic and leads through their blog. They needed a strategy to establish their authority in the industry.',
    requirements: 'The project required the creation of a comprehensive, six-month content strategy. This involved in-depth keyword research, a thorough competitive analysis, the development of topic clusters around core product features, and the creation of a detailed content calendar with briefs for each article. The content needed to be optimized for search engines and targeted at their ideal customer profile.',
    features: '- In-depth keyword research and competitive analysis.\n- Development of topic clusters and a content calendar.\n- SEO-optimized blog post briefs and templates.\n- A strategy for content promotion and link building.\n- Performance tracking and reporting framework.',
    impact: "The data-driven content strategy yielded exceptional results. Organic search traffic to the blog increased by 150% over six months. The targeted content resonated with their audience, generating over 200 new marketing qualified leads (MQLs) and significantly boosting their sales pipeline.",
    budget: 3000,
    category: 'Marketing',
    postedBy: 'CloudCorp',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-image-4')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-image-4')?.imageHint || '',
    skills: ['SEO', 'Content Strategy', 'Marketing', 'Keyword Research'],
    duration: 'Ongoing'
  },
  {
    id: '5',
    title: 'AI-Powered Chatbot Integration',
    description: 'Supportify, a customer service software company, wanted to leverage AI to improve their support efficiency and reduce response times.',
    requirements: 'The project involved integrating a Genkit-based AI chatbot into their existing customer support portal. The chatbot needed to be trained on an extensive library of company documentation, help articles, and historical support tickets. It had to be designed to handle common customer queries, provide instant answers, and intelligently escalate complex issues to human agents with full context.',
    features: '- Genkit-powered chatbot for instant query resolution.\n- Training on company-specific knowledge base.\n- Intelligent-escalation to human agents.\n- Integration with existing support software (Zendesk).\n- Analytics dashboard to track chatbot performance.',
    impact: "The AI chatbot transformed their customer support operations. It successfully automated 60% of common customer queries, freeing up human agents. This led to an 80% reduction in average agent response time and a noticeable improvement in customer satisfaction (CSAT) scores.",
    budget: 4500,
    category: 'AI/ML',
    postedBy: 'Supportify',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-image-5')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-image-5')?.imageHint || '',
    skills: ['Genkit', 'AI/ML', 'Node.js', 'Customer Support'],
    duration: '1 Month'
  },
  {
    id: '6',
    title: 'Data Visualization Dashboard',
    description: 'Metrics Inc., a data analytics firm, needed a way to provide their clients with real-time insights from complex datasets stored in Firestore.',
    requirements: 'The task was to build a dynamic data visualization dashboard using Next.js and Recharts. The dashboard needed to display key sales and marketing KPIs, with interactive charts and date-range filters to allow for deep-dive analysis. High performance was critical, even with large volumes of data, so the implementation had to be optimized for speed and responsiveness.',
    features: '- Interactive charts and graphs for KPIs.\n- Real-time data fetching from Firestore.\n- Date-range and custom filters for data segmentation.\n- Export functionality for charts and data (PDF, CSV).\n- A secure, multi-tenant architecture to serve multiple clients.',
    impact: "The interactive dashboard provided stakeholders with at-a-glance, actionable insights, replacing static weekly reports. This real-time data access empowered their marketing team to make faster decisions, leading to a 15% improvement in marketing campaign ROI. The dashboard became an essential tool for their daily operations.",
    budget: 6000,
    category: 'Data Analytics',
    postedBy: 'Metrics Inc.',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-image-6')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-image-6')?.imageHint || '',
    skills: ['Recharts', 'Firebase', 'Data Visualization', 'Next.js'],
    duration: '2 Months'
  }
];

export type Milestone = {
  id: string;
  title: string;
  status: 'Completed' | 'In Progress' | 'Pending';
  progress: number;
  dueDate: string;
};

export const milestones: Milestone[] = [
  { id: 'm1', title: 'Phase 1: Discovery & Research', status: 'Completed', progress: 100, dueDate: '2024-07-10' },
  { id: 'm2', title: 'Phase 2: UX/UI Design', status: 'In Progress', progress: 60, dueDate: '2024-07-25' },
  { id: 'm3', title: 'Phase 3: Frontend Development', status: 'Pending', progress: 15, dueDate: '2024-08-15' },
  { id: 'm4', title: 'Phase 4: Backend Integration', status: 'Pending', progress: 0, dueDate: '2024-09-01' },
];

export type Invoice = {
  id: string;
  client: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  dueDate: string;
};

export const invoices: Invoice[] = [
  { id: 'inv1', client: 'Creative Inc.', amount: 1500, status: 'Paid', dueDate: '2024-07-01' },
  { id: 'inv2', client: 'Solutions LLC', amount: 2000, status: 'Pending', dueDate: '2024-07-20' },
  { id: 'inv3', client: 'Innovate Co.', amount: 1200, status: 'Pending', dueDate: '2024-07-28' },
  { id: 'inv4', client: 'DataDrive', amount: 3500, status: 'Overdue', dueDate: '2024-06-15' },
];

export type Message = {
    id: string;
    client: string;
    subject: string;
    timestamp: string;
    isRead: boolean;
};

export const messages: Message[] = [
    { id: 'msg1', client: 'Solutions LLC', subject: 'Question about the latest mockups', timestamp: '2h ago', isRead: false },
    { id: 'msg2', client: 'Creative Inc.', subject: 'Feedback on Phase 1', timestamp: '1d ago', isRead: true },
    { id: 'msg3', client: 'DataDrive', subject: 'Urgent: Invoice Overdue', timestamp: '3d ago', isRead: true },
    { id: 'msg4', client: 'Innovate Co.', subject: 'Project Kick-off Meeting', timestamp: '5d ago', isRead: true },
] as Message[];

export type Referral = {
  id: string;
  clientName: string;
  clientAvatar: string;
  projectDescription: string;
  status: 'Pending' | 'Accepted' | 'Declined';
  date: string;
};

export const referrals: Referral[] = [
  {
    id: 'ref1',
    clientName: 'TechCorp',
    clientAvatar: PlaceHolderImages.find(p => p.id === 'client-avatar-1')?.imageUrl || '',
    projectDescription: 'They need a new landing page for their upcoming product launch. It\'s a quick turnaround project, but they have a good budget. I told them you were the best.',
    status: 'Pending',
    date: '2024-07-15'
  },
  {
    id: 'ref2',
    clientName: 'Innovate LLC',
    clientAvatar: PlaceHolderImages.find(p => p.id === 'client-avatar-2')?.imageUrl || '',
    projectDescription: 'This is for a larger project to build an internal dashboard for their sales team. Should be a 3-month contract.',
    status: 'Accepted',
    date: '2024-06-28'
  },
  {
    id: 'ref3',
    clientName: 'MarketRise',
    clientAvatar: PlaceHolderImages.find(p => p.id === 'client-avatar-3')?.imageUrl || '',
    projectDescription: 'A small graphic design job for some social media assets.',
    status: 'Declined',
    date: '2024-06-10'
  },
  {
    id: 'ref4',
    clientName: 'Growth Partners',
    clientAvatar: 'https://picsum.photos/seed/growthpartners/100/100',
    projectDescription: 'Looking for a full-stack developer for a long-term project. They are a great team to work with.',
    status: 'Pending',
    date: '2024-07-20'
  }
];


export type Proposal = {
    id: string;
    freelancerName: string;
    freelancerAvatar: string;
    projectName: string;
    bid: number;
    coverLetter: string;
    status: 'Pending' | 'Accepted' | 'Declined';
    date: string;
};

export const proposals: Proposal[] = [
    {
        id: 'prop1',
        freelancerName: 'Jane Doe',
        freelancerAvatar: PlaceHolderImages.find(p => p.id === 'user-avatar')?.imageUrl || '',
        projectName: 'E-commerce Platform Redesign',
        bid: 4800,
        coverLetter: "I've redesigned over 20 Shopify stores, consistently boosting conversion rates by 15% or more. My focus on mobile-first UX and clean design aligns perfectly with your goals.",
        status: 'Pending',
        date: '2024-07-18'
    },
    {
        id: 'prop2',
        freelancerName: 'John Smith',
        freelancerAvatar: 'https://picsum.photos/seed/johnsmith/100/100',
        projectName: 'E-commerce Platform Redesign',
        bid: 5200,
        coverLetter: 'As a full-stack developer with deep expertise in Shopify Liquid and headless commerce, I can deliver a high-performance, scalable, and beautiful storefront for Retail Co.',
        status: 'Pending',
        date: '2024-07-17'
    },
    {
        id: 'prop3',
        freelancerName: 'Emily White',
        freelancerAvatar: 'https://picsum.photos/seed/emilywhite/100/100',
        projectName: 'Mobile App for Fitness Tracking',
        bid: 7500,
        coverLetter: 'I am a React Native specialist and a fitness enthusiast. I have built three successful fitness apps and I\'m excited by the opportunity to work on this project for FitLife Inc.',
        status: 'Accepted',
        date: '2024-07-15'
    }
];

export type Testimonial = {
    id: string;
    projectId?: string;
    clientName: string;
    clientTitle: string;
    clientAvatar: string;
    quote: string;
};

export const testimonials: Testimonial[] = [
    {
        id: 'test1',
        projectId: '1',
        clientName: 'John Doe',
        clientTitle: 'CEO, Retail Co',
        clientAvatar: 'https://picsum.photos/seed/johndoe/100/100',
        quote: "Working with Jane was a game-changer. Her attention to detail and understanding of our brand vision resulted in a website that not only looks stunning but also performs exceptionally well. Our conversion rates have never been better."
    },
    {
        id: 'test2',
        projectId: '2',
        clientName: 'Sarah Smith',
        clientTitle: 'Founder, FitLife Inc.',
        clientAvatar: 'https://picsum.photos/seed/sarahsmith/100/100',
        quote: "The fitness app exceeded all our expectations. It's intuitive, beautiful, and our users absolutely love it. The engagement metrics are through the roof, and it's all thanks to the incredible work done on this project."
    },
    {
        id: 'test-ref2',
        clientName: 'Innovate LLC',
        clientTitle: 'COO, Innovate LLC',
        clientAvatar: PlaceHolderImages.find(p => p.id === 'client-avatar-2')?.imageUrl || '',
        quote: "This freelancer is our go-to partner for critical projects. Their ability to quickly understand our needs and deliver high-quality results is unmatched. Highly recommended."
    },
];

export type Competition = {
  id: string;
  title: string;
  prize: number;
  deadline: string;
  entries: number;
  status: 'Live' | 'Judging' | 'Completed';
};

let competitionsData: Competition[] = [
  {
    id: 'comp1',
    title: 'Design a new company logo',
    prize: 1000,
    deadline: '2024-08-15',
    entries: 25,
    status: 'Live'
  },
    {
    id: 'comp2',
    title: 'Explainer Video Animation',
    prize: 2500,
    deadline: '2024-08-10',
    entries: 12,
    status: 'Live'
  }
];

// This is now the single source of truth for competitions.
export const competitions: Competition[] = competitionsData;

// This function mutates the original array, which is why the re-render works.
export function addCompetitionEntry(competitionId: string) {
    const competition = competitionsData.find(c => c.id === competitionId);
    if (competition) {
        competition.entries += 1;
    }
}

export type Competitor = {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  rank: number;
  earnings: number;
  tags: string[];
};

export const competitors: Competitor[] = [
  { id: 'c1', name: 'Alex Ray', avatar: 'https://picsum.photos/seed/alexray/100/100', specialty: 'React & Node.js Expert', rank: 1, earnings: 120000, tags: ['Top Rated', 'Rising Talent'] },
  { id: 'c2', name: 'Ben Carter', avatar: 'https://picsum.photos/seed/bencarter/100/100', specialty: 'UI/UX & Brand Designer', rank: 2, earnings: 115000, tags: ['Top Rated'] },
  { id: 'c3', name: 'Casey Smith', avatar: 'https://picsum.photos/seed/caseysmith/100/100', specialty: 'Mobile App Developer (iOS & Android)', rank: 3, earnings: 110000, tags: ['Top Rated'] },
  { id: 'c4', name: 'Drew Evans', avatar: 'https://picsum.photos/seed/drewevans/100/100', specialty: 'AI & Machine Learning Engineer', rank: 4, earnings: 105000, tags: ['Top Rated'] },
  { id: 'c5', name: 'Eli Finch', avatar: 'https://picsum.photos/seed/elifinch/100/100', specialty: 'Content Strategy & SEO', rank: 5, earnings: 98000, tags: ['Rising Talent'] },
  { id: 'c6', name: 'Frank Green', avatar: 'https://picsum.photos/seed/frankgreen/100/100', specialty: 'Data Scientist', rank: 6, earnings: 95000, tags: [] },
  { id: 'c7', name: 'Grace Hill', avatar: 'https://picsum.photos/seed/gracehill/100-100', specialty: 'Shopify Developer', rank: 7, earnings: 92000, tags: ['Top Rated'] },
  { id: 'c8', name: 'Henry Ives', avatar: 'https://picsum.photos/seed/henryives/100/100', specialty: 'Graphic Designer', rank: 8, earnings: 89000, tags: [] },
  { id: 'c9', name: 'Ivy Jones', avatar: 'https://picsum.photos/seed/ivyjones/100/100', specialty: 'Full-Stack Developer', rank: 9, earnings: 88000, tags: ['Rising Talent'] },
  { id: 'c10', name: 'Jack King', avatar: 'https://picsum.photos/seed/jackking/100/100', specialty: 'Marketing Automation Specialist', rank: 10, earnings: 85000, tags: [] },
];
    

    

    

    

    