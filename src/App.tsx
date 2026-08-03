import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { CMSContextProvider, useCMS } from './cms/useCMS';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { EstimateModal } from './components/ui/EstimateModal';
import { BilingualAIChatbot } from './components/ui/BilingualAIChatbot';
import { FloatingBar } from './components/ui/FloatingBar';
import { AdminPinGate } from './components/ui/AdminPinGate';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { CheckCircle2 } from 'lucide-react';

const AdminPortal = lazy(() =>
  import('./pages/AdminPortal').then((m) => ({ default: m.AdminPortal }))
);

const PageLoader: React.FC = () => (
  <div className="py-20 flex items-center justify-center min-h-[50vh]">
    <div className="w-10 h-10 border-3 border-[#F58220] border-t-transparent rounded-full animate-spin" />
  </div>
);

const AppContent: React.FC = () => {
  const { toastMessage } = useCMS();

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative bg-white text-[#1F2937] selection:bg-[#F58220] selection:text-white">
        <Navbar />

        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/admin"
                element={
                  <AdminPinGate>
                    <AdminPortal />
                  </AdminPinGate>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />

        {/* Global Modals & Floating Widgets */}
        <EstimateModal />
        <BilingualAIChatbot />
        <FloatingBar />

        {/* Global Toast Notification */}
        {toastMessage && (
          <div
            role="status"
            aria-live="polite"
            className="fixed top-20 right-4 z-50 bg-[#1A1A1A] text-white border-2 border-[#F58220] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-fadeIn max-w-md text-xs font-bold"
          >
            <CheckCircle2 className="w-4 h-4 text-[#F58220] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </Router>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <CMSContextProvider>
        <AppContent />
        <Analytics />
      </CMSContextProvider>
    </ErrorBoundary>
  );
}
