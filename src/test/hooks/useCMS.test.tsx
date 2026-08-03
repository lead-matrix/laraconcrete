import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { CMSContextProvider, useCMS } from '../../cms/useCMS';

const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <CMSContextProvider>{children}</CMSContextProvider>
);

describe('useCMS Hook', () => {
  it('provides company details and state management functions', () => {
    const { result } = renderHook(() => useCMS(), { wrapper });

    expect(result.current.companyDetails).toBeDefined();
    expect(result.current.companyDetails.phone1).toBe('(316) 993-0376');
    expect(result.current.isEstimateModalOpen).toBe(false);
  });

  it('toggles estimate modal state', () => {
    const { result } = renderHook(() => useCMS(), { wrapper });

    act(() => {
      result.current.openEstimateModal();
    });
    expect(result.current.isEstimateModalOpen).toBe(true);

    act(() => {
      result.current.closeEstimateModal();
    });
    expect(result.current.isEstimateModalOpen).toBe(false);
  });

  it('triggers toast notifications', () => {
    const { result } = renderHook(() => useCMS(), { wrapper });

    act(() => {
      result.current.showToast('Test Notification');
    });
    expect(result.current.toastMessage).toBe('Test Notification');
  });
});
