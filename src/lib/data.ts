import { PlaceHolderImages } from "./placeholder-images";

export type Project = {
  id: string;
  title: string;
  description: string;
  budget: number;
  category: string;
  postedBy: string;
  imageUrl: string;
  imageHint: string;
};

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform Redesign',
    description: 'We are looking for an experienced developer to redesign our Shopify store. Focus on improving UX and mobile responsiveness.',
    budget: 5000,
    category: 'Web Development',
    postedBy: 'Retail Co',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-image-1')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-image-1')?.imageHint || '',
  },
  {
    id: '2',
    title: 'Mobile App for Fitness Tracking',
    description: 'Create a cross-platform mobile app for iOS and Android that tracks user workouts and diet. React Native experience is a must.',
    budget: 8000,
    category: 'Mobile Development',
    postedBy: 'FitLife Inc.',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-image-2')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-image-2')?.imageHint || '',
  },
  {
    id: '3',
    title: 'Brand Identity and Logo Design',
    description: 'A new startup in the fintech space needs a complete brand identity package, including logo, color palette, and style guide.',
    budget: 2500,
    category: 'Design',
    postedBy: 'Fintech Startup',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-image-3')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-image-3')?.imageHint || '',
  },
    {
    id: '4',
    title: 'Content Strategy for SaaS Blog',
    description: 'Develop a 6-month content strategy to increase organic traffic. Includes keyword research, topic ideation, and content calendar.',
    budget: 3000,
    category: 'Marketing',
    postedBy: 'CloudCorp',
    imageUrl: PlaceHolderImages.find(p => p.id === 'project-image-4')?.imageUrl || '',
    imageHint: PlaceHolderImages.find(p => p.id === 'project-image-4')?.imageHint || '',
  },
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
  { id: 'm3', title: 'Phase 3: Frontend Development', status: 'Pending', progress: 0, dueDate: '2024-08-15' },
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
