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

  it('renders Mission Control Dashboard metrics', () => {
    render(<MissionControl />);
    expect(screen.getByText(/Mission Control Dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/Monthly Cash Flow/i)).toBeInTheDocument();
    expect(screen.getByText(/Active Sales Pipeline/i)).toBeInTheDocument();
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
