import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CMSContextProvider, useCMS } from './cms/useCMS';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { AdminPortal } from './pages/AdminPortal';
import { EstimateModal } from './components/ui/EstimateModal';
import { BilingualAIChatbot } from './components/ui/BilingualAIChatbot';
import { FloatingBar } from './components/ui/FloatingBar';
import { AdminPinGate } from './components/ui/AdminPinGate';
import { CheckCircle2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { toastMessage } = useCMS();

  return (
    <Router>
      <div className="min-h-screen flex flex-col relative bg-[#F6F6F6] text-[#2D2D2D] selection:bg-[#F58220] selection:text-white">
        <Navbar />

        <main className="flex-grow">
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
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />

        {/* Global Modals & Floating Widgets */}
        <EstimateModal />
        <BilingualAIChatbot />
        <FloatingBar />

        {/* Global Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-[#1A1A1A] text-white border-2 border-[#F58220] px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-fadeIn max-w-md text-xs font-bold">
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
    <CMSContextProvider>
      <AppContent />
    </CMSContextProvider>
  );
}
