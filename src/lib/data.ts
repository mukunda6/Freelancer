import { PlaceHolderImages } from "./placeholder-images";

export type Project = {
  id: string;
  title: string;
  description: string;
  impact: string;
  budget: number;
  category: string;
  postedBy: string;
  imageUrl: string;
  imageHint: string;
  skills: string[];
};

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform Redesign',
    description: 'A comprehensive overhaul of a Shopify store to improve user experience, mobile responsiveness, and modernizing the brand\'s digital presence. The project involved a full UX audit, a new design system, and custom theme development.',
    impact: "Boosted conversion rates by 40% and reduced bounce rate by 25% through a complete UX and visual overhaul.",
    budget: 5000,
    category: 'Web Development',
    postedBy: 'Retail Co',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-image-1')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-image-1')?.imageHint || '',
    skills: ['UI/UX', 'Shopify', 'React']
  },
  {
    id: '2',
    title: 'Mobile App for Fitness Tracking',
    description: 'A cross-platform mobile app for iOS and Android that tracks user workouts, nutrition, and progress. It features real-time data sync, social sharing, and personalized fitness plans.',
    impact: "Achieved 50,000+ downloads in the first 3 months and a 4.8-star app store rating by focusing on an intuitive and motivating user interface.",
    budget: 8000,
    category: 'Mobile Development',
    postedBy: 'FitLife Inc.',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-image-2')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-image-2')?.imageHint || '',
    skills: ['React Native', 'Firebase', 'UI/UX']
  },
  {
    id: '3',
    title: 'Brand Identity and Logo Design',
    description: 'Developed a complete brand identity for a new fintech startup, including a modern logo, a comprehensive color palette, typography guidelines, and a full brand style guide to ensure consistency across all marketing materials.',
    impact: "Established a strong, trustworthy brand identity that helped the client secure their first round of seed funding within two months of launch.",
    budget: 2500,
    category: 'Design',
    postedBy: 'Fintech Startup',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-image-3')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-image-3')?.imageHint || '',
    skills: ['Branding', 'Logo Design', 'Illustration']
  },
    {
    id: '4',
    title: 'Content Strategy for SaaS Blog',
    description: 'Created a six-month content strategy to drive organic growth for a B2B SaaS platform. The project involved in-depth keyword research, competitive analysis, topic clustering, and creating a detailed content calendar.',
    impact: "Increased organic search traffic by 150% and generated over 200 new marketing qualified leads in 6 months.",
    budget: 3000,
    category: 'Marketing',
    postedBy: 'CloudCorp',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-image-4')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-image-4')?.imageHint || '',
    skills: ['SEO', 'Content Strategy', 'Marketing']
  },
  {
    id: '5',
    title: 'AI-Powered Chatbot Integration',
    description: 'Integrated a Genkit-based AI chatbot into an existing customer support portal. The chatbot was trained on company documentation to handle common queries, escalate complex issues, and reduce support ticket volume.',
    impact: "Automated 60% of common customer support queries, reducing agent response time by 80% and improving customer satisfaction scores.",
    budget: 4500,
    category: 'AI/ML',
    postedBy: 'Supportify',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-image-5')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-image-5')?.imageHint || '',
    skills: ['Genkit', 'AI/ML', 'Node.js']
  },
  {
    id: '6',
    title: 'Data Visualization Dashboard',
    description: 'Built a real-time data visualization dashboard using Recharts and Next.js to display sales and marketing KPIs from a Firestore database. The dashboard provided stakeholders with actionable insights at a glance.',
    impact: "Provided key stakeholders with real-time data, leading to a 15% improvement in marketing campaign ROI.",
    budget: 6000,
    category: 'Data Analytics',
    postedBy: 'Metrics Inc.',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-image-6')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-image-6')?.imageHint || '',
    skills: ['Recharts', 'Firebase', 'Data Visualization']
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
    status: 'Declined', date: '2024-06-10' },
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
    projectId: string;
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
    }
];
