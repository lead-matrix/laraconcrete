import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../utils';
import { Navbar } from '../../components/layout/Navbar';

describe('Navbar Component', () => {
  it('renders branding and primary phone CTA', () => {
    render(<Navbar />);

    expect(screen.getByLabelText(/ZenBid Pro Home/i)).toBeInTheDocument();
    expect(screen.getAllByText(/\(316\) 993-0376/i).length).toBeGreaterThan(0);
  });

  it('toggles mobile menu drawer on button click', () => {
    render(<Navbar />);

    const menuToggle = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(menuToggle).toBeInTheDocument();

    fireEvent.click(menuToggle);
    expect(screen.getAllByText(/Services/i).length).toBeGreaterThan(0);
  });

  it('triggers estimate modal opening when clicking Free Estimate', () => {
    render(<Navbar />);

    const quoteButtons = screen.getAllByRole('button', { name: /free estimate/i });
    expect(quoteButtons.length).toBeGreaterThan(0);
    fireEvent.click(quoteButtons[0]);
  });
});
