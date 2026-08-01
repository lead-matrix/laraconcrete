export interface HeroData {
  headline: string;
  subheadline: string;
  ctaText: string;
}

export interface StatData {
  id: string;
  value: string;
  label: string;
  category: string;
}

export interface TestimonialData {
  id: string;
  name: string;
  company: string;
  role: string;
  quote: string;
  avatarUrl?: string;
  linkedInUrl?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  clientIndustry: string;
  summary: string;
  metric: {
    value: string;
    label: string;
  };
  problem: string;
  strategy: string;
  design: string;
  techStack: string[];
  results: string;
  lessons: string;
  isPublic: boolean;
  isPasswordProtected: boolean;
  passwordHash?: string; // Stored in plain text for local validation simplicity
}

export interface PlaybookData {
  id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  readTime: string;
  content: string; // Markdown text
  date: string;
  isPublished: boolean;
}

export interface TimelineData {
  id: string;
  year: string;
  title: string;
  subtitle: string;
}

export interface ClientLogoData {
  id: string;
  name: string;
  industry: string;
  isConfidential: boolean;
  financialBracket?: string; // e.g. "$12M Roofing Company"
}

export interface NowEntry {
  id: string;
  text: string;
  category: 'building' | 'learning' | 'reading' | 'focus';
}

export interface TechStackItem {
  id: string;
  name: string;
  category: 'core' | 'backend' | 'integrations' | 'tools';
}

export interface ValueMatrixItem {
  id: string;
  problem: string;
  solution: string;
  outcome: string;
}

export interface OperatingPrinciple {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface SiteSettings {
  siteTitle: string;
  footerText: string;
  contactEmail: string;
  adminCode: string;
  askMrbContext: string; // The system prompt context for the Ask MRB AI assistant
}

export interface AnalyticsData {
  visitors: number;
  countries: number;
  leads: number;
  averageTimeSec: number;
  projectsCount: number;
  revenueGenerated: string;
  lighthouseScore: number;
  deploymentStatus: 'healthy' | 'building' | 'failed';
  apiHealth: number; // 0-100%
}
