import React, { type ReactNode } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CMSContextProvider } from '../cms/useCMS';

interface AllProvidersProps {
  children: ReactNode;
  initialEntries?: string[];
}

export const AllProviders: React.FC<AllProvidersProps> = ({ children, initialEntries = ['/'] }) => {
  return (
    <CMSContextProvider>
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </CMSContextProvider>
  );
};

export const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { initialEntries?: string[] }
) => {
  const { initialEntries, ...renderOptions } = options || {};
  return render(ui, {
    wrapper: (props) => <AllProviders initialEntries={initialEntries} {...props} />,
    ...renderOptions
  });
};

export * from '@testing-library/react';
export { customRender as render };
