import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Tenant, FeatureFlag } from './types';

// Mock multi-tenant database for Contractor Operating System™
const INITIAL_TENANTS: Tenant[] = [
  {
    id: 'tenant-apex-001',
    name: 'Apex Contracting Group',
    slug: 'apex-contracting',
    domain: 'apex.contractor-os.com',
    primaryColor: '#3b82f6',
    plan: 'Enterprise',
    status: 'active',
    footerAttributionEnabled: true, // Platform attribution visible in footer
    whiteLabelEnabled: true,
    createdAt: '2025-01-15'
  },
  {
    id: 'tenant-titan-002',
    name: 'Titan Heavy Construction',
    slug: 'titan-construction',
    domain: 'titan.contractor-os.com',
    primaryColor: '#10b981',
    plan: 'Pro',
    status: 'active',
    footerAttributionEnabled: true,
    whiteLabelEnabled: false,
    createdAt: '2025-03-10'
  },
  {
    id: 'tenant-vanguard-003',
    name: 'Vanguard Structural Solutions',
    slug: 'vanguard-structural',
    domain: 'vanguard.contractor-os.com',
    primaryColor: '#6366f1',
    plan: 'Enterprise',
    status: 'active',
    footerAttributionEnabled: false, // White label client who disabled footer attribution
    whiteLabelEnabled: true,
    createdAt: '2025-05-20'
  }
];

const INITIAL_FEATURE_FLAGS: FeatureFlag[] = [
  {
    id: 'ff-1',
    tenantId: 'tenant-apex-001',
    key: 'smart_estimator_ai',
    name: 'AI Smart Estimator Safeguards',
    description: 'Enforces hard floor profit margin locks to prevent underpriced quotes.',
    enabled: true
  },
  {
    id: 'ff-2',
    tenantId: 'tenant-apex-001',
    key: 'customer_portal_deposits',
    name: 'Instant Customer Portal Deposits',
    description: 'Allows clients to pay security deposits directly on estimate approval.',
    enabled: true
  },
  {
    id: 'ff-3',
    tenantId: 'tenant-apex-001',
    key: 'crew_dispatch_gps',
    name: 'Field Crew Dispatch & Real-Time Tracking',
    description: 'Enables GPS job check-ins and field photo uploads.',
    enabled: true
  }
];

interface TenantContextType {
  currentTenant: Tenant;
  availableTenants: Tenant[];
  switchTenant: (tenantId: string) => void;
  updateTenantSettings: (updatedTenant: Partial<Tenant>) => void;
  featureFlags: FeatureFlag[];
  toggleFeatureFlag: (flagId: string) => void;
  isPlatformOwner: boolean;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export const TenantProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tenants, setTenants] = useState<Tenant[]>(() => {
    const saved = localStorage.getItem('cos_tenants');
    return saved ? JSON.parse(saved) : INITIAL_TENANTS;
  });

  const [activeTenantId, setActiveTenantId] = useState<string>(() => {
    const savedId = localStorage.getItem('cos_active_tenant_id');
    return savedId || INITIAL_TENANTS[0].id;
  });

  const [featureFlags, setFeatureFlags] = useState<FeatureFlag[]>(INITIAL_FEATURE_FLAGS);

  useEffect(() => {
    localStorage.setItem('cos_tenants', JSON.stringify(tenants));
  }, [tenants]);

  useEffect(() => {
    localStorage.setItem('cos_active_tenant_id', activeTenantId);
  }, [activeTenantId]);

  const currentTenant = tenants.find((t) => t.id === activeTenantId) || tenants[0];

  const switchTenant = (tenantId: string) => {
    const target = tenants.find((t) => t.id === tenantId);
    if (target) {
      setActiveTenantId(tenantId);
    }
  };

  const updateTenantSettings = (updatedProps: Partial<Tenant>) => {
    setTenants((prev) =>
      prev.map((t) => (t.id === activeTenantId ? { ...t, ...updatedProps } : t))
    );
  };

  const toggleFeatureFlag = (flagId: string) => {
    setFeatureFlags((prev) =>
      prev.map((flag) => (flag.id === flagId ? { ...flag, enabled: !flag.enabled } : flag))
    );
  };

  return (
    <TenantContext.Provider
      value={{
        currentTenant,
        availableTenants: tenants,
        switchTenant,
        updateTenantSettings,
        featureFlags,
        toggleFeatureFlag,
        isPlatformOwner: true // Can be toggled in RBAC
      }}
    >
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};
