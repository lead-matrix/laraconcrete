export type UserRole =
  | 'Platform Owner'
  | 'Platform Admin'
  | 'Business Owner'
  | 'Office Manager'
  | 'Project Manager'
  | 'Crew Leader'
  | 'Employee'
  | 'Customer';

export type Permission =
  | 'tenant.manage'
  | 'tenant.view_all'
  | 'billing.manage'
  | 'users.manage'
  | 'crm.view'
  | 'crm.edit'
  | 'crm.delete'
  | 'estimator.view'
  | 'estimator.create'
  | 'estimator.override_margin'
  | 'projects.view'
  | 'projects.edit'
  | 'projects.dispatch'
  | 'customer_portal.access'
  | 'feature_flags.manage'
  | 'audit_logs.view'
  | 'attribution.toggle';

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  domain?: string;
  logoUrl?: string;
  primaryColor: string;
  plan: 'Starter' | 'Pro' | 'Enterprise';
  status: 'active' | 'suspended' | 'trialing';
  footerAttributionEnabled: boolean; // Configurable footer attribution toggle
  whiteLabelEnabled: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  tenantId: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  phone?: string;
  status: 'active' | 'invited' | 'disabled';
}

export interface Customer {
  id: string;
  tenantId: string;
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  address: string;
  status: 'Lead' | 'Active Customer' | 'VIP' | 'Past';
  totalSpent: number;
  notes?: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  tenantId: string;
  title: string;
  customerName: string;
  email: string;
  phone: string;
  stage: 'New Lead' | 'Site Visit' | 'Estimate Sent' | 'Negotiation' | 'Won' | 'Lost';
  estimatedValue: number;
  assignedTo: string;
  notes: string;
  createdAt: string;
}

export interface EstimateLineItem {
  id: string;
  description: string;
  category: 'Materials' | 'Labor' | 'Equipment' | 'Subcontractor' | 'Permits';
  quantity: number;
  unit: 'sq ft' | 'cu yd' | 'linear ft' | 'hours' | 'flat rate';
  unitCost: number;
  totalCost: number;
}

export interface Estimate {
  id: string;
  tenantId: string;
  estimateNumber: string;
  customerName: string;
  customerEmail: string;
  projectTitle: string;
  status: 'Draft' | 'Sent' | 'Approved' | 'Declined' | 'Invoiced';
  items: EstimateLineItem[];
  directCostTotal: number;
  overheadMultiplier: number; // e.g. 1.15 for 15% overhead
  targetProfitMarginPct: number; // e.g. 35%
  calculatedPrice: number;
  depositRequiredPct: number;
  createdAt: string;
  validUntil: string;
}

export interface Job {
  id: string;
  tenantId: string;
  title: string;
  customerName: string;
  address: string;
  status: 'Scheduled' | 'In Progress' | 'Inspection' | 'Completed' | 'On Hold';
  crewLeader: string;
  crewMembersCount: number;
  startDate: string;
  endDate: string;
  progressPct: number;
}

export interface AuditLog {
  id: string;
  tenantId: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: string;
  resource: string;
  details: string;
  ipAddress: string;
  timestamp: string;
}

export interface FeatureFlag {
  id: string;
  tenantId: string;
  key: string;
  name: string;
  description: string;
  enabled: boolean;
}
