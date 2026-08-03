import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../utils';
import { ContactSection } from '../../components/sections/ContactSection';

describe('ContactSection Component', () => {
  it('renders contact form with heading and inputs', () => {
    render(<ContactSection />);

    expect(screen.getByText(/Request Your Free On-Site Estimate/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/e\.g\. Robert Vance/i)).toBeInTheDocument();
  });

  it('submits form successfully with user inputs', async () => {
    render(<ContactSection />);

    const nameInput = screen.getByPlaceholderText(/e\.g\. Robert Vance/i);
    const phoneInput = screen.getByPlaceholderText(/\(316\) 555-0199/i);

    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(phoneInput, { target: { value: '3169930376' } });

    const submitBtn = screen.getByRole('button', {
      name: /submit free quote request/i
    });
    fireEvent.click(submitBtn);

    expect(await screen.findByText(/Thank You, Test User!/i)).toBeInTheDocument();
  });
});
