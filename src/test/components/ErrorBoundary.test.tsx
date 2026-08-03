import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../utils';
import { ErrorBoundary } from '../../components/ui/ErrorBoundary';

const ProblemChild = () => {
  throw new Error('Test Explosion Error');
};

describe('ErrorBoundary Component', () => {
  it('renders fallback UI when a child component throws', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText(/Something Went Wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Explosion Error/i)).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});
