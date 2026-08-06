import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TenantProvider } from './core/tenantContext';
import { RBACProvider } from './core/rbacContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Page Modules
import { MissionControl } from './pages/MissionControl';
import { CRMModule } from './pages/CRMModule';
import { EstimatorModule } from './pages/EstimatorModule';
import { ProjectsModule } from './pages/ProjectsModule';
import { CustomerPortal } from './pages/CustomerPortal';
import { SuperAdminModule } from './pages/SuperAdminModule';

const PageLoader: React.FC = () => (
  <div className="py-20 flex flex-col items-center justify-center min-h-[50vh] space-y-3">
    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
    <span className="text-xs font-mono text-slate-400">Loading Contractor OS...</span>
  </div>
);

export default function App() {
  return (
    <TenantProvider>
      <RBACProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-[#090d16] text-[#e2e8f0] font-sans selection:bg-blue-600 selection:text-white">
            <Navbar />

            <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<MissionControl />} />
                  <Route path="/crm" element={<CRMModule />} />
                  <Route path="/estimator" element={<EstimatorModule />} />
                  <Route path="/jobs" element={<ProjectsModule />} />
                  <Route path="/portal" element={<CustomerPortal />} />
                  <Route path="/superadmin" element={<SuperAdminModule />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </main>

            <Footer />
          </div>
        </Router>
      </RBACProvider>
    </TenantProvider>
  );
}
