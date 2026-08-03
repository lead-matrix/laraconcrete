import { describe, it, expect } from 'vitest';
import { render, screen } from '../utils';
import { Hero } from '../../components/sections/Hero';

describe('Hero Component', () => {
  it('renders main heading and trust badges', () => {
    render(<Hero />);

    expect(screen.getByText(/Building Strong/i)).toBeInTheDocument();
    expect(screen.getByText(/ZenBid Pro SaaS Platform/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Licensed & Insured/i).length).toBeGreaterThan(0);
  });

  it('renders call to action buttons', () => {
    render(<Hero />);

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
