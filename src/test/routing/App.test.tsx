import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../../App';

describe('App Routing', () => {
  it('renders home page on root path', async () => {
    render(<App />);

    expect(await screen.findByText(/Building Strong/i)).toBeInTheDocument();
  });
});
