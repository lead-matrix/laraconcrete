import { describe, it, expect } from 'vitest';
import { render, screen } from './utils';
import { Navbar } from '../components/layout/Navbar';
import { MissionControl } from '../pages/MissionControl';
import { EstimatorModule } from '../pages/EstimatorModule';
import { SuperAdminModule } from '../pages/SuperAdminModule';

describe('Contractor Operating System™ Core Architecture', () => {
  it('renders Contractor OS brand and Navbar', () => {
    render(<Navbar />);
    expect(screen.getByText(/Contractor OS/i)).toBeInTheDocument();
    expect(screen.getByText(/Enterprise SaaS Platform/i)).toBeInTheDocument();
  });

  it('renders Mission Control Morning Briefing', () => {
    render(<MissionControl />);
    expect(screen.getByText(/Carlos/i)).toBeInTheDocument();
    expect(screen.getByText(/Business Health Score/i)).toBeInTheDocument();
    expect(screen.getByText(/Decisions Made Today/i)).toBeInTheDocument();
  });

  it('renders Smart Estimator Direct-Cost Engine', () => {
    render(<EstimatorModule />);
    expect(screen.getByText(/Direct-Cost & Profit Margin Estimator/i)).toBeInTheDocument();
    expect(screen.getByText(/Margin Protection Safeguards/i)).toBeInTheDocument();
  });

  it('renders Super Admin Control Center with Configurable Footer Attribution', () => {
    render(<SuperAdminModule />);
    expect(screen.getByText(/Multi-Tenant SaaS Administration/i)).toBeInTheDocument();
    expect(screen.getByText(/Configurable Footer Attribution/i)).toBeInTheDocument();
  });
});
