import React, { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { TenantProvider } from '../core/tenantContext';
import { RBACProvider } from '../core/rbacContext';

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <TenantProvider>
      <RBACProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </RBACProvider>
    </TenantProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
