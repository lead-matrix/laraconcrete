import React, { createContext, useContext, useState } from 'react';
import type { UserRole, Permission, User } from './types';
import { useTenant } from './tenantContext';

const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  'Platform Owner': [
    'tenant.manage',
    'tenant.view_all',
    'billing.manage',
    'users.manage',
    'crm.view',
    'crm.edit',
    'crm.delete',
    'estimator.view',
    'estimator.create',
    'estimator.override_margin',
    'projects.view',
    'projects.edit',
    'projects.dispatch',
    'customer_portal.access',
    'feature_flags.manage',
    'audit_logs.view',
    'attribution.toggle'
  ],
  'Platform Admin': [
    'tenant.manage',
    'tenant.view_all',
    'users.manage',
    'crm.view',
    'crm.edit',
    'estimator.view',
    'projects.view',
    'audit_logs.view'
  ],
  'Business Owner': [
    'billing.manage',
    'users.manage',
    'crm.view',
    'crm.edit',
    'crm.delete',
    'estimator.view',
    'estimator.create',
    'estimator.override_margin',
    'projects.view',
    'projects.edit',
    'projects.dispatch',
    'audit_logs.view'
  ],
  'Office Manager': [
    'crm.view',
    'crm.edit',
    'estimator.view',
    'estimator.create',
    'projects.view',
    'projects.edit'
  ],
  'Project Manager': [
    'crm.view',
    'estimator.view',
    'estimator.create',
    'projects.view',
    'projects.edit',
    'projects.dispatch'
  ],
  'Crew Leader': [
    'projects.view',
    'projects.edit'
  ],
  'Employee': [
    'projects.view'
  ],
  'Customer': [
    'customer_portal.access'
  ]
};

const DEFAULT_USERS: Record<UserRole, User> = {
  'Platform Owner': {
    id: 'user-001',
    tenantId: 'tenant-apex-001',
    name: 'Mahmudur R Bhuiyan',
    email: 'mahmudur@contractor-os.com',
    role: 'Platform Owner',
    status: 'active'
  },
  'Platform Admin': {
    id: 'user-002',
    tenantId: 'tenant-apex-001',
    name: 'Sarah Connor',
    email: 'sarah.admin@contractor-os.com',
    role: 'Platform Admin',
    status: 'active'
  },
  'Business Owner': {
    id: 'user-003',
    tenantId: 'tenant-apex-001',
    name: 'Carlos Mendez',
    email: 'carlos@apexcontracting.com',
    role: 'Business Owner',
    status: 'active'
  },
  'Office Manager': {
    id: 'user-004',
    tenantId: 'tenant-apex-001',
    name: 'Elena Rostova',
    email: 'elena@apexcontracting.com',
    role: 'Office Manager',
    status: 'active'
  },
  'Project Manager': {
    id: 'user-005',
    tenantId: 'tenant-apex-001',
    name: 'David Vance',
    email: 'david@apexcontracting.com',
    role: 'Project Manager',
    status: 'active'
  },
  'Crew Leader': {
    id: 'user-006',
    tenantId: 'tenant-apex-001',
    name: 'Marcus Brody',
    email: 'marcus@apexcontracting.com',
    role: 'Crew Leader',
    status: 'active'
  },
  'Employee': {
    id: 'user-007',
    tenantId: 'tenant-apex-001',
    name: 'Jason Croft',
    email: 'jason@apexcontracting.com',
    role: 'Employee',
    status: 'active'
  },
  'Customer': {
    id: 'user-008',
    tenantId: 'tenant-apex-001',
    name: 'Robert Vance (Client)',
    email: 'rvance@vancecold.com',
    role: 'Customer',
    status: 'active'
  }
};

interface RBACContextType {
  currentUser: User;
  activeRole: UserRole;
  switchRole: (role: UserRole) => void;
  hasPermission: (permission: Permission) => boolean;
  availableRoles: UserRole[];
}

const RBACContext = createContext<RBACContextType | undefined>(undefined);

export const RBACProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentTenant } = useTenant();
  const [activeRole, setActiveRole] = useState<UserRole>('Platform Owner');

  const currentUser = {
    ...DEFAULT_USERS[activeRole],
    tenantId: currentTenant.id
  };

  const switchRole = (role: UserRole) => {
    setActiveRole(role);
  };

  const hasPermission = (permission: Permission): boolean => {
    const permissions = ROLE_PERMISSIONS[activeRole] || [];
    return permissions.includes(permission);
  };

  return (
    <RBACContext.Provider
      value={{
        currentUser,
        activeRole,
        switchRole,
        hasPermission,
        availableRoles: Object.keys(ROLE_PERMISSIONS) as UserRole[]
      }}
    >
      {children}
    </RBACContext.Provider>
  );
};

export const useRBAC = () => {
  const context = useContext(RBACContext);
  if (!context) {
    throw new Error('useRBAC must be used within an RBACProvider');
  }
  return context;
};
