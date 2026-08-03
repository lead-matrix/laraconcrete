import type { CMSProvider } from './index';
import type {
  HeroData,
  StatData,
  TestimonialData,
  ProjectData,
  PlaybookData,
  TimelineData,
  ClientLogoData,
  NowEntry,
  TechStackItem,
  ValueMatrixItem,
  OperatingPrinciple,
  SiteSettings,
  AnalyticsData
} from '../types/cms';

// Default initial data for MRB Founder OS
const DEFAULT_HERO: HeroData = {
  headline: 'I design the digital infrastructure behind high-performing home service businesses.',
  subheadline: 'Websites. Systems. AI. Growth. Everything built to convert.',
  ctaText: 'Explore Strategy Lab'
};

const DEFAULT_STATS: StatData[] = [
  { id: 'stat-1', value: '18', label: 'Systems Deployed', category: 'Scale' },
  { id: 'stat-2', value: '412', label: 'Automated Runs/Day', category: 'Volume' },
  { id: 'stat-3', value: '4.9s → 0.8s', label: 'Page Speed Avg', category: 'Performance' },
  { id: 'stat-4', value: '3,182', label: 'Cups of Coffee', category: 'Fuel' }
];

const DEFAULT_TESTIMONIALS: TestimonialData[] = [
  {
    id: 't-1',
    name: 'David Miller',
    role: 'Founder',
    company: 'ABC Roofing',
    quote:
      'MRB did not just build a website. He completely rewired our booking pipeline. We are booking jobs while we sleep now.',
    linkedInUrl: 'https://linkedin.com/in/david-miller'
  },
  {
    id: 't-2',
    name: 'Sarah Collins',
    role: 'Director of Operations',
    company: 'National HVAC Brand',
    quote:
      'The performance optimization alone increased our mobile lead submissions by 37%. Absolute game-changer for our national marketing ad spend.',
    linkedInUrl: 'https://linkedin.com/in/sarah-collins'
  }
];

const DEFAULT_PROJECTS: ProjectData[] = [
  {
    id: 'p-1',
    title: 'Automating ABC Roofing Booking Funnels',
    slug: 'abc-roofing',
    clientName: 'ABC Roofing',
    clientIndustry: 'Roofing',
    summary:
      'Automating customer ingestion and scheduling pipelines resulting in massive lead capture increase.',
    metric: { value: '+320%', label: 'Lead Growth' },
    problem:
      'ABC Roofing was spending $8,000/mo on local service ads, but dropping 40% of incoming leads because office managers were busy in consultations or out of hours. Customer inquiries through the contact form were answered hours later, losing the speed-to-lead advantage.',
    strategy:
      'We implemented a real-time ingestion pipeline. Using high-speed static landing pages connected to an instant SMS gateway, we built a workflow that routes leads directly to field agents based on geographic proximity. We structured automated AI callbacks that engage lost leads immediately.',
    design:
      'Clean, mobile-first design built with a focus on ease-of-use under sunlight. High contrast buttons, micro-incentives to input postal codes, and instant scheduling modals.',
    techStack: ['Next.js', 'Tailwind CSS', 'Supabase', 'Twilio', 'Zapier'],
    results:
      'Captured 450+ qualified bookings within the first 90 days. Reduced lead response time from 3 hours to less than 45 seconds, resulting in a +320% increase in converted digital bookings.',
    lessons:
      'Speed-to-lead is the single most critical differentiator in local markets. A beautiful website that replies tomorrow loses to a fast system that text messages inside 60 seconds.',
    isPublic: true,
    isPasswordProtected: false
  },
  {
    id: 'p-2',
    title: 'Dynamic Routing & Dispatch Engine',
    slug: 'prime-hvac',
    clientName: 'Prime HVAC',
    clientIndustry: 'HVAC',
    summary:
      'Building a dispatch orchestration tool that routes technicians dynamically based on traffic and skillset.',
    metric: { value: '89 Leads', label: 'In 30 Days' },
    problem:
      'Dispatcher inefficiencies resulted in technicians driving back and forth across town, reducing average billable hours from 6.5 to 4.2 hours per technician per day.',
    strategy:
      'Create an optimized routing grid using live Google Maps Distance Matrix APIs and custom technician skill tags. The website integrates this schedule dynamically, offering discount slots for adjacent neighborhoods.',
    design:
      'Map-centric dispatch screen featuring live technician locations, queue density visualizers, and simplified status updates for field crew.',
    techStack: ['React', 'Google APIs', 'Node.js', 'Resend', 'n8n'],
    results:
      'Daily billable hours per tech increased from 4.2 to 5.9. The automated discount slot engine generated 89 incremental qualified bookings within 30 days of release.',
    lessons:
      'Connecting pricing systems directly to logistics and schedule availability creates immense marketing leverage.',
    isPublic: true,
    isPasswordProtected: false
  },
  {
    id: 'p-3',
    title: 'Enterprise CRM Estimator Integration',
    slug: 'confidential-roofing',
    clientName: 'Confidential Client',
    clientIndustry: 'Roofing ($12M Company)',
    summary:
      'A secure, password-protected custom estimation portal integrating with field management systems.',
    metric: { value: '2.4 Hours', label: 'Saved per Proposal' },
    problem:
      'Sales teams were taking hours to construct complex commercial roofing proposals, leading to bidding delays and lost contracts.',
    strategy:
      'Construct a closed-loop quoting application that queries live vendor materials databases, calculates labor algorithms, and outputs formatted proposals connected to CRM.',
    design:
      'Enterprise-grade tabbed CMS that visualizes material margin structures and dynamically generates printable PDF quotes.',
    techStack: ['Vite', 'React', 'Tailwind', 'PostgreSQL', 'Prisma'],
    results:
      'Bid generation times plummeted from 2.5 hours to under 6 minutes. Proposal win-rate climbed by 14% due to speed and clarity of reporting.',
    lessons:
      'Internal tools that empower sales forces are just as valuable as external lead generation landing pages.',
    isPublic: false,
    isPasswordProtected: true,
    passwordHash: 'mrb2026' // Access code for this protected project
  }
];

const DEFAULT_PLAYBOOKS: PlaybookData[] = [
  {
    id: 'b-1',
    title: 'Why Home Service Websites Fail to Convert',
    slug: 'home-service-fails',
    summary:
      'The critical mistakes local business websites make, and why standard web development agencies keep delivering low-converting systems.',
    category: 'Conversion Systems',
    readTime: '6 min read',
    date: 'July 12, 2026',
    isPublished: true,
    content: `Most local businesses think they need a website that looks like a brochure. They hire an agency, pay $5,000, and get a site with stock photos of people pointing at clipboard designs.

Here is why that site fails:
1. **Speed is ignored**: Loading a heavy WordPress template on a 3G connection in a customer's attic takes 7 seconds. Users bounce instantly.
2. **Missing Frictionless CTAs**: Asking a user to fill out a 12-field form just to get a call back is conversion suicide.
3. **No Speed-to-Lead Link**: If a lead fills out your form at 9:00 PM, and your staff responds at 9:00 AM, that client has already called 4 competitors.

**The Fix:**
Build with edge-native React. Hook the form up to an instant webhook that text messages the customer inside 30 seconds. Automate booking instantly.`
  },
  {
    id: 'b-2',
    title: 'Building Business Assets Instead of Simple Webpages',
    slug: 'assets-vs-pages',
    summary:
      'Shifting the perspective from viewing a website as an marketing expense to structuring it as a core digital asset.',
    category: 'Architecture Notes',
    readTime: '4 min read',
    date: 'June 28, 2026',
    isPublished: true,
    content: `When you build a standard website, you build an expense. When you build an integrated system, you build a capital asset.

An asset has tangible value:
- It automates customer data entry.
- It qualifies leads *before* your sales team gets on the phone.
- It dynamically calculates scheduling and route capacity.

Stop paying for templates. Invest in systems that optimize labor and operations.`
  },
  {
    id: 'b-3',
    title: 'The AI Local Stack: What Home Services Actually Need',
    slug: 'ai-local-stack',
    summary:
      'Forget LLM wrappers that output generic text. Here is how local contractors utilize AI for operations, booking triage, and reviews.',
    category: 'AI Playbooks',
    readTime: '8 min read',
    date: 'May 14, 2026',
    isPublished: true,
    content: `AI shouldn't write blog posts for your plumbing company. No one reads them.

AI should do this:
1. **Lead Qualification**: Parse incoming request descriptions ("my toilet is overflowed and leaking into the basement") and classify urgency instantly.
2. **Review Generation**: Automatically review-sentiment screen and follow up with happy customers using custom-tailored Google review prompts.
3. **Call Triage**: Feed audio transcripts into classification systems to auto-create tickets inside the CRM.

This is where AI drives ROI.`
  }
];

const DEFAULT_TIMELINE: TimelineData[] = [
  {
    id: 'tl-1',
    year: '2022',
    title: 'Began Systems Consulting',
    subtitle: 'Crafting custom automation setups for local trade firms.'
  },
  {
    id: 'tl-2',
    year: '2023',
    title: 'Custom Database Formulations',
    subtitle: 'Designed custom estimator engines and booking backends.'
  },
  {
    id: 'tl-3',
    year: '2024',
    title: 'Focused on Home Service Infrastructure',
    subtitle: 'Specialized in scaling roofing, plumbing, and HVAC systems.'
  },
  {
    id: 'tl-4',
    year: '2025',
    title: 'Built Custom Growth SaaS Platforms',
    subtitle: 'Structured automated dispatch and speed-to-lead frameworks.'
  },
  {
    id: 'tl-5',
    year: '2026',
    title: 'Deploying MRB',
    subtitle: 'Pioneering unified digital infrastructure for home trades.'
  }
];

const DEFAULT_LOGOS: ClientLogoData[] = [
  { id: 'l-1', name: 'ABC Roofing', industry: 'Roofing', isConfidential: false },
  { id: 'l-2', name: 'Elite Plumbing', industry: 'Plumbing', isConfidential: false },
  { id: 'l-3', name: 'Prime HVAC', industry: 'HVAC', isConfidential: false },
  { id: 'l-4', name: 'BlueSky Electric', industry: 'Electrical', isConfidential: false },
  {
    id: 'l-5',
    name: 'Confidential Client',
    industry: 'Roofing',
    isConfidential: true,
    financialBracket: '$12M Roofing Company'
  },
  {
    id: 'l-6',
    name: 'Confidential Client',
    industry: 'HVAC',
    isConfidential: true,
    financialBracket: 'National HVAC Brand'
  }
];

const DEFAULT_NOW: NowEntry[] = [
  {
    id: 'nw-1',
    text: 'Building the core SaaS estimation and booking engine for MRB',
    category: 'building'
  },
  {
    id: 'nw-2',
    text: 'Integrating real-time spatial routing models for field crew dispatch optimization',
    category: 'learning'
  },
  {
    id: 'nw-3',
    text: 'Reading "Anything You Want" by Derek Sivers and "High Output Management" by Andy Grove',
    category: 'reading'
  },
  {
    id: 'nw-4',
    text: 'Focusing on scaling home service trade companies through hyper-speed web infrastructure',
    category: 'focus'
  }
];

const DEFAULT_TECH: TechStackItem[] = [
  { id: 'tc-1', name: 'Next.js', category: 'core' },
  { id: 'tc-2', name: 'React', category: 'core' },
  { id: 'tc-3', name: 'Tailwind CSS', category: 'core' },
  { id: 'tc-4', name: 'Supabase', category: 'backend' },
  { id: 'tc-5', name: 'Prisma', category: 'backend' },
  { id: 'tc-6', name: 'PostgreSQL', category: 'backend' },
  { id: 'tc-7', name: 'OpenAI', category: 'integrations' },
  { id: 'tc-8', name: 'Twilio API', category: 'integrations' },
  { id: 'tc-9', name: 'Stripe API', category: 'integrations' },
  { id: 'tc-10', name: 'Resend', category: 'integrations' },
  { id: 'tc-11', name: 'n8n', category: 'tools' },
  { id: 'tc-12', name: 'Zapier', category: 'tools' },
  { id: 'tc-13', name: 'Vercel Edge', category: 'tools' },
  { id: 'tc-14', name: 'Cloudflare', category: 'tools' }
];

const DEFAULT_VALUEMATRIX: ValueMatrixItem[] = [
  {
    id: 'vm-1',
    problem: 'Slow website load on 3G in remote attic locations.',
    solution: 'Migrate to Vite-compiled, Edge-cached React static infrastructure.',
    outcome: 'Load speed falls from 4.9s to 0.8s, bouncing drops by 22%.'
  },
  {
    id: 'vm-2',
    problem: 'Lost leads due to delayed manual dispatch response.',
    solution: 'Integrate custom webhooks routed straight to Twilio SMS and tech devices.',
    outcome: 'Response time drops below 45 seconds, booking rates climb +320%.'
  },
  {
    id: 'vm-3',
    problem: 'Scheduling conflicts causing billing leakages.',
    solution: 'Build automated GPS-optimized dispatch planning engine via n8n.',
    outcome: 'Technician billable hours jump from 4.2 to 5.9 hours per day.'
  }
];

const DEFAULT_PRINCIPLES: OperatingPrinciple[] = [
  {
    id: 'op-1',
    number: '01',
    title: 'Business First',
    description:
      'Code is useless unless it drives calls, quotes, bookings, and revenue for the firm.'
  },
  {
    id: 'op-2',
    number: '02',
    title: 'Performance Matters',
    description:
      'A 1-second delay is a 7% drop in conversions. We optimize for extreme speed on cellular attic signals.'
  },
  {
    id: 'op-3',
    number: '03',
    title: 'Systems Beat Hacks',
    description:
      'Build unified pipelines with strict data routing. Shortcuts create bug-ridden maintenance debt.'
  },
  {
    id: 'op-4',
    number: '04',
    title: 'Long-term Infrastructure',
    description:
      'Create structures that remain valuable assets of the company, not temporary marketing tools.'
  },
  {
    id: 'op-5',
    number: '05',
    title: 'AI Where It Counts',
    description:
      'Utilize automated classifiers and speech-to-text models to cut admin labor, not write generic copy.'
  }
];

const DEFAULT_SETTINGS: SiteSettings = {
  siteTitle: 'MRB — Systems Architect & Growth Engineer',
  footerText: 'Designed and engineered by MRB. Building digital assets.',
  contactEmail: 'mrb@mrb.life',
  adminCode: 'mrb2026',
  askMrbContext:
    'You are the AI representation of MRB (Founder, Systems Architect, and Growth Engineer). Your philosophy is that websites are not resumes; they are business assets. You specialize in building digital infrastructure for home service businesses (roofing, plumbing, HVAC, electrical). You are direct, strategic, value metrics, speed, automation, and long-term thinking. Answer user questions briefly in 2-3 sentences max.'
};

const DEFAULT_ANALYTICS: AnalyticsData = {
  visitors: 1284,
  countries: 41,
  leads: 182,
  averageTimeSec: 142,
  projectsCount: 18,
  revenueGenerated: '$4.2M',
  lighthouseScore: 99,
  deploymentStatus: 'healthy',
  apiHealth: 100
};

// LocalStorage Helper functions
const getStoreValue = <T>(key: string, defaultValue: T): T => {
  if (
    typeof window === 'undefined' ||
    !window.localStorage ||
    typeof window.localStorage.getItem !== 'function'
  ) {
    return defaultValue;
  }
  try {
    const value = localStorage.getItem(`mrb_cms_${key}`);
    if (!value) {
      localStorage.setItem(`mrb_cms_${key}`, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(value);
  } catch {
    return defaultValue;
  }
};

const setStoreValue = <T>(key: string, value: T): void => {
  if (
    typeof window !== 'undefined' &&
    window.localStorage &&
    typeof window.localStorage.setItem === 'function'
  ) {
    try {
      localStorage.setItem(`mrb_cms_${key}`, JSON.stringify(value));
    } catch {
      // ignore storage errors
    }
  }
};

export class LocalCMSProvider implements CMSProvider {
  async getHero(): Promise<HeroData> {
    return getStoreValue('hero', DEFAULT_HERO);
  }
  async updateHero(data: HeroData): Promise<void> {
    setStoreValue('hero', data);
  }

  async getStats(): Promise<StatData[]> {
    return getStoreValue('stats', DEFAULT_STATS);
  }
  async updateStats(data: StatData[]): Promise<void> {
    setStoreValue('stats', data);
  }

  async getTestimonials(): Promise<TestimonialData[]> {
    return getStoreValue('testimonials', DEFAULT_TESTIMONIALS);
  }
  async updateTestimonials(data: TestimonialData[]): Promise<void> {
    setStoreValue('testimonials', data);
  }

  async getProjects(): Promise<ProjectData[]> {
    return getStoreValue('projects', DEFAULT_PROJECTS);
  }
  async updateProjects(data: ProjectData[]): Promise<void> {
    setStoreValue('projects', data);
  }
  async verifyProjectPassword(id: string, code: string): Promise<boolean> {
    const projects = await this.getProjects();
    const p = projects.find((proj) => proj.id === id);
    if (!p) return false;
    return p.passwordHash === code;
  }

  async getPlaybooks(): Promise<PlaybookData[]> {
    return getStoreValue('playbooks', DEFAULT_PLAYBOOKS);
  }
  async updatePlaybooks(data: PlaybookData[]): Promise<void> {
    setStoreValue('playbooks', data);
  }

  async getTimeline(): Promise<TimelineData[]> {
    return getStoreValue('timeline', DEFAULT_TIMELINE);
  }
  async updateTimeline(data: TimelineData[]): Promise<void> {
    setStoreValue('timeline', data);
  }

  async getClientLogos(): Promise<ClientLogoData[]> {
    return getStoreValue('logos', DEFAULT_LOGOS);
  }
  async updateClientLogos(data: ClientLogoData[]): Promise<void> {
    setStoreValue('logos', data);
  }

  async getNowEntries(): Promise<NowEntry[]> {
    return getStoreValue('now', DEFAULT_NOW);
  }
  async updateNowEntries(data: NowEntry[]): Promise<void> {
    setStoreValue('now', data);
  }

  async getTechStack(): Promise<TechStackItem[]> {
    return getStoreValue('tech', DEFAULT_TECH);
  }
  async updateTechStack(data: TechStackItem[]): Promise<void> {
    setStoreValue('tech', data);
  }

  async getValueMatrix(): Promise<ValueMatrixItem[]> {
    return getStoreValue('valuematrix', DEFAULT_VALUEMATRIX);
  }
  async updateValueMatrix(data: ValueMatrixItem[]): Promise<void> {
    setStoreValue('valuematrix', data);
  }

  async getOperatingPrinciples(): Promise<OperatingPrinciple[]> {
    return getStoreValue('principles', DEFAULT_PRINCIPLES);
  }
  async updateOperatingPrinciples(data: OperatingPrinciple[]): Promise<void> {
    setStoreValue('principles', data);
  }

  async getSettings(): Promise<SiteSettings> {
    return getStoreValue('settings', DEFAULT_SETTINGS);
  }
  async updateSettings(data: SiteSettings): Promise<void> {
    setStoreValue('settings', data);
  }

  async getAnalytics(): Promise<AnalyticsData> {
    return getStoreValue('analytics', DEFAULT_ANALYTICS);
  }
  async updateAnalytics(data: AnalyticsData): Promise<void> {
    setStoreValue('analytics', data);
  }
}
