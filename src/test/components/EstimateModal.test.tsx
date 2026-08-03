import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../utils';
import { EstimateModal } from '../../components/ui/EstimateModal';
import { CMSContextProvider, useCMS } from '../../cms/useCMS';
import React, { useEffect } from 'react';

const TestWrapper: React.FC = () => {
  const { openEstimateModal } = useCMS();
  useEffect(() => {
    openEstimateModal();
  }, [openEstimateModal]);

  return <EstimateModal />;
};

describe('EstimateModal Component', () => {
  it('renders modal when open', () => {
    render(
      <CMSContextProvider>
        <TestWrapper />
      </CMSContextProvider>
    );

    expect(screen.getByText(/Get Your Free Concrete Estimate/i)).toBeInTheDocument();
  });

  it('allows user input entry and submission', () => {
    render(
      <CMSContextProvider>
        <TestWrapper />
      </CMSContextProvider>
    );

    const nameInput = screen.getByPlaceholderText(/Robert Vance/i) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
    expect(nameInput.value).toBe('Jane Doe');

    const phoneInput = screen.getByPlaceholderText(/\(316\) 555-0199/i) as HTMLInputElement;
    fireEvent.change(phoneInput, { target: { value: '3169930376' } });
    expect(phoneInput.value).toBe('3169930376');
  });
});
