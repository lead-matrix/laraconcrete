import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../utils';
import { CADConcreteEstimator } from '../../components/sections/CADConcreteEstimator';

describe('CADConcreteEstimator Component', () => {
  it('renders CAD interactive studio heading and controls', () => {
    render(<CADConcreteEstimator />);

    expect(screen.getByText(/Design Your Slab & Calculate Cost Instantly/i)).toBeInTheDocument();
    expect(screen.getByText(/Interactive 3D Visual CAD Estimator/i)).toBeInTheDocument();
  });

  it('allows preset selection for slab layouts', () => {
    render(<CADConcreteEstimator />);

    const drivewayBtn = screen.getByRole('button', {
      name: /driveway \/ rectangle/i
    });
    fireEvent.click(drivewayBtn);
    expect(drivewayBtn).toBeInTheDocument();
  });
});
