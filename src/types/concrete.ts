export interface ConcreteService {
  id: string;
  title: string;
  slug: string;
  category: 'residential' | 'commercial' | 'decorative' | 'structural';
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  popular: boolean;
  basePricePerSqFt: number;
  typicalThicknessInches: number;
  rebarOptions: string[];
  finishTypes: string[];
  features: string[];
  image: string;
}

export interface ProjectShowcaseItem {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Decorative' | 'Foundations' | 'Driveways' | 'Patios';
  location: string;
  sqFt: number;
  psi: number;
  durationDays: number;
  costRange: string;
  completionDate: string;
  materialsUsed: string[];
  beforeImage: string;
  duringImage: string;
  afterImage: string;
  droneViewImage?: string;
  customerReview: {
    author: string;
    rating: number;
    text: string;
    verified: boolean;
  };
}

export interface FleetItem {
  id: string;
  name: string;
  type: 'Truck' | 'Trailer' | 'Laser Screed' | 'Skid Steer' | 'Mixer' | 'Pump Truck';
  specs: string;
  capacity: string;
  livery: string;
  image: string;
  safetyScore: string;
  description: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  category: 'PSI Mix' | 'Reinforcement' | 'Joints' | 'Sealer' | 'Stamp Pattern' | 'Color Tint';
  description: string;
  specs: string;
  durabilityYears: number;
  image: string;
  recommendedUse: string;
}

export interface WarrantyRecord {
  warrantyId: string;
  customerName: string;
  propertyAddress: string;
  projectType: string;
  completionDate: string;
  coverageYears: number;
  status: 'Active' | 'Under Inspection' | 'Claim Filed';
  coverageDetails: string[];
}

export interface SEOCityData {
  slug: string;
  name: string;
  state: string;
  zipCodes: string[];
  projectsCompleted: number;
  avgProjectCost: string;
  dispatchTimeHours: number;
  testimonialCount: number;
  topServices: string[];
  featuredProjectTitle: string;
  featuredProjectImage: string;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  summary: string;
  contentMarkdown: string;
  tags: string[];
  heroImage: string;
}

export interface CustomerPortalProject {
  id: string;
  quoteId: string;
  customerName: string;
  address: string;
  projectType: string;
  contractAmount: number;
  paidAmount: number;
  currentStep: 1 | 2 | 3 | 4 | 5 | 6;
  stepLabels: string[];
  scheduledDate: string;
  estimatedCompletion: string;
  projectManagerName: string;
  projectManagerPhone: string;
  sitePhotos: string[];
  invoices: {
    invoiceNo: string;
    date: string;
    amount: number;
    status: 'Paid' | 'Pending';
  }[];
  contractPdfUrl: string;
  inspectionReportUrl: string;
}

export interface QuoteLead {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  serviceType: string;
  estimatedSqFt: number;
  estimatedBudget: number;
  status: 'New' | 'Site Visit Scheduled' | 'Estimate Sent' | 'Approved' | 'In Progress' | 'Completed';
  preferredContact: 'Call' | 'SMS' | 'Email';
  notes: string;
  photoUrl?: string;
}

export interface CADEstimateState {
  shape: 'rectangle' | 'l-shape' | 'circle' | 'patio-custom';
  lengthFt: number;
  widthFt: number;
  depthInches: number;
  psiMix: 3000 | 4000 | 5000;
  reinforcement: 'none' | 'wire-mesh' | 'fiber-mesh' | 'rebar-18' | 'rebar-12';
  finish: 'broom' | 'stamped' | 'stained' | 'exposed-aggregate' | 'polished';
  excavationNeeded: boolean;
  wasteFactorPct: number;
}
