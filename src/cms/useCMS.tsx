import React, { createContext, useContext, useState } from 'react';
import type {
  QuoteLead,
  CustomerPortalProject,
  WarrantyRecord,
  ConcreteService,
  ProjectShowcaseItem
} from '../types/concrete';
import {
  INITIAL_LEADS,
  SAMPLE_CUSTOMER_PORTAL,
  WARRANTY_RECORDS,
  CONCRETE_SERVICES,
  PROJECT_SHOWCASE
} from '../data/concreteData';

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

interface CMSContextType {
  // Leads & CRM State
  leads: QuoteLead[];
  addLead: (lead: Omit<QuoteLead, 'id' | 'createdAt' | 'status'>) => void;
  updateLeadStatus: (id: string, status: QuoteLead['status']) => void;
  
  // Customer Portal
  portalProject: CustomerPortalProject;
  updatePortalStep: (step: 1 | 2 | 3 | 4 | 5 | 6) => void;
  
  // Services & Showcase Management (CMS)
  services: ConcreteService[];
  projects: ProjectShowcaseItem[];

  // Warranty Lookup
  warrantySearchId: string;
  activeWarranty: WarrantyRecord | null;
  searchWarranty: (id: string) => WarrantyRecord | null;

  // Language State
  language: 'EN' | 'ES';
  setLanguage: (lang: 'EN' | 'ES') => void;

  // Modals & UI Controls
  isEstimateModalOpen: boolean;
  openEstimateModal: (preselectedService?: string) => void;
  closeEstimateModal: () => void;
  selectedServiceForModal: string;

  // Active Service Specs Drawer Modal
  activeServiceDrawer: ConcreteService | null;
  openServiceDrawer: (srv: ConcreteService) => void;
  closeServiceDrawer: () => void;

  // AI Chatbot State
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;

  // Toast Notification
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<QuoteLead[]>(INITIAL_LEADS);
  const [portalProject, setPortalProject] = useState<CustomerPortalProject>(SAMPLE_CUSTOMER_PORTAL);
  const [services] = useState<ConcreteService[]>(CONCRETE_SERVICES);
  const [projects] = useState<ProjectShowcaseItem[]>(PROJECT_SHOWCASE);
  const [warrantySearchId, setWarrantySearchId] = useState('');
  const [activeWarranty, setActiveWarranty] = useState<WarrantyRecord | null>(null);
  const [language, setLanguage] = useState<'EN' | 'ES'>('EN');

  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false);
  const [selectedServiceForModal, setSelectedServiceForModal] = useState('');
  const [activeServiceDrawer, setActiveServiceDrawer] = useState<ConcreteService | null>(null);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: 'Hello! I am your Lara Concrete Expert. How can I help you today? I can provide concrete thickness recommendations, cost estimates, or schedule a free site visit. Call us anytime at (316) 993-0376!',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addLead = (leadData: Omit<QuoteLead, 'id' | 'createdAt' | 'status'>) => {
    const newLead: QuoteLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'New'
    };
    setLeads((prev) => [newLead, ...prev]);
    showToast('Quote Request Received! A Lara Concrete estimator will call you within 15 minutes.');
  };

  const updateLeadStatus = (id: string, status: QuoteLead['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
    showToast(`Lead status updated to ${status}`);
  };

  const updatePortalStep = (step: 1 | 2 | 3 | 4 | 5 | 6) => {
    setPortalProject((prev) => ({ ...prev, currentStep: step }));
    showToast(`Customer Portal updated to Step ${step}`);
  };

  const searchWarranty = (id: string): WarrantyRecord | null => {
    setWarrantySearchId(id);
    const found = WARRANTY_RECORDS.find(
      (w) => w.warrantyId.toLowerCase() === id.trim().toLowerCase()
    );
    setActiveWarranty(found || null);
    if (!found) {
      showToast('Warranty ID not found. Please verify certificate code LARA-W-2026-XXXX');
    }
    return found || null;
  };

  const openEstimateModal = (preselectedService = '') => {
    setSelectedServiceForModal(preselectedService);
    setIsEstimateModalOpen(true);
  };

  const closeEstimateModal = () => {
    setIsEstimateModalOpen(false);
  };

  const openServiceDrawer = (srv: ConcreteService) => {
    setActiveServiceDrawer(srv);
  };

  const closeServiceDrawer = () => {
    setActiveServiceDrawer(null);
  };

  const sendChatMessage = (text: string) => {
    const userMsg: ChatMessage = {
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);

    // AI Bot response simulation logic
    setTimeout(() => {
      let botResponse = '';
      const lower = text.toLowerCase();

      if (lower.includes('cost') || lower.includes('price') || lower.includes('estimate') || lower.includes('how much')) {
        botResponse = language === 'ES' 
          ? 'Nuestros precios promedio van de $11 a $16 por pie cuadrado para concreto reforzado de 4000 PSI con varilla. ¡Pruebe nuestra Calculadora CAD o solicite un presupuesto sin costo!'
          : 'Our average pricing ranges from $11.50 to $16.00 per sq ft for heavy-duty 4000 PSI rebar-reinforced concrete. You can use our interactive CAD Calculator on this page or request a free estimate!';
      } else if (lower.includes('driveway') || lower.includes('entrad')) {
        botResponse = language === 'ES'
          ? 'Para entradas de autos (driveways), recomendamos un grosor de 5 pulgadas con concreto de 4000 PSI y malla o varilla de 1/2".'
          : 'For vehicle driveways, we recommend a 5-inch thick slab with 4000 PSI concrete and #4 rebar on 18-inch centers for maximum durability.';
      } else if (lower.includes('stamp') || lower.includes('patio')) {
        botResponse = language === 'ES'
          ? '¡El concreto estampado es nuestra especialidad! Ofrecemos patrones de pizarra Ashlar, madera y piedra con sellador acrílico de alto brillo.'
          : 'Stamped concrete is our specialty! We offer Ashlar slate, wood plank, and cobble patterns with integral color and high-gloss sealer.';
      } else if (lower.includes('warranty') || lower.includes('garantía')) {
        botResponse = language === 'ES'
          ? 'Todas nuestras obras incluyen una garantía estructural escrita de 10 años. Puede verificar su número de garantía en la sección Warranty Center.'
          : 'All our pours include a written 10-Year Structural Warranty against major cracking and settlement. Check our Warranty Center on this site!';
      } else {
        botResponse = language === 'ES'
          ? '¡Excelente pregunta! Nuestro equipo de Lara Concrete LLC está listo para ayudarle. Déjenos su número de teléfono o haga clic en "Get Free Estimate".'
          : 'Great question! Our master concrete team is available to assist. Leave your phone number or click "Get Free Estimate" to talk to an estimator right away.';
      }

      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: botResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 800);
  };

  return (
    <CMSContext.Provider
      value={{
        leads,
        addLead,
        updateLeadStatus,
        portalProject,
        updatePortalStep,
        services,
        projects,
        warrantySearchId,
        activeWarranty,
        searchWarranty,
        language,
        setLanguage,
        isEstimateModalOpen,
        openEstimateModal,
        closeEstimateModal,
        selectedServiceForModal,
        activeServiceDrawer,
        openServiceDrawer,
        closeServiceDrawer,
        chatMessages,
        sendChatMessage,
        isChatOpen,
        setIsChatOpen,
        toastMessage,
        showToast
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSContextProvider');
  }
  return context;
};
