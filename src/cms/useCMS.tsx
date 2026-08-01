import React, { createContext, useContext, useState, useEffect } from 'react';
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

export interface CompanyDetails {
  phone1: string;
  phone2: string;
  email: string;
  address: string;
  guaranteeText: string;
  yearsInBusiness: number;
}

export interface FAQItem {
  q: string;
  a: string;
}

interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

interface CMSContextType {
  // Admin Live Editing State
  isAdminEditMode: boolean;
  setIsAdminEditMode: (active: boolean) => void;
  
  companyDetails: CompanyDetails;
  updateCompanyDetails: (details: Partial<CompanyDetails>) => void;
  
  services: ConcreteService[];
  updateService: (id: string, updated: Partial<ConcreteService>) => void;
  addService: (newService: ConcreteService) => void;
  deleteService: (id: string) => void;

  faqs: FAQItem[];
  updateFAQ: (index: number, question: string, answer: string) => void;
  addFAQ: (faq: FAQItem) => void;
  deleteFAQ: (index: number) => void;
  resetCMSDefaults: () => void;

  // Leads & CRM State
  leads: QuoteLead[];
  addLead: (lead: Omit<QuoteLead, 'id' | 'createdAt' | 'status'>) => void;
  updateLeadStatus: (id: string, status: QuoteLead['status']) => void;
  
  // Customer Portal
  portalProject: CustomerPortalProject;
  updatePortalStep: (step: 1 | 2 | 3 | 4 | 5 | 6) => void;
  
  // Projects
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

const DEFAULT_COMPANY: CompanyDetails = {
  phone1: '(316) 993-0376',
  phone2: '(316) 249-9873',
  email: 'estimates@laraconcrete.com',
  address: '4100 E 21st St, Wichita, KS 67208',
  guaranteeText: 'Licensed & Insured ($2M Guarantee)',
  yearsInBusiness: 15
};

const DEFAULT_FAQS: FAQItem[] = [
  {
    q: 'How much does a concrete driveway cost per square foot in 2026?',
    a: 'Standard 4,000 PSI broom-finish concrete driveways range from $11.50 to $13.50 per square foot installed. Decorative stamped concrete driveways range from $14.50 to $18.50 per square foot, including #4 rebar reinforcement on 18-inch centers and site prep.'
  },
  {
    q: 'Why does Lara Concrete LLC use 4,000 PSI concrete instead of 3,000 PSI?',
    a: '3,000 PSI concrete is suitable for indoor house footings, but it lacks the compressive density to survive heavy pickup trucks and freeze-thaw winter cycles. We pour a minimum of 4,000+ PSI with fiber mesh matrix for superior longevity.'
  },
  {
    q: 'How long must I wait before driving a vehicle on my new concrete driveway?',
    a: 'You can walk on the slab after 24 hours. Light passenger vehicles (sedans) can park on the slab after 7 days (70% strength). Heavy trucks and RVs should wait the full 28 days for 100% cure capacity.'
  },
  {
    q: 'What is the difference between Rebar Grid and Wire Mesh?',
    a: 'Wire mesh often gets stepped on during the pour and ends up sitting on the dirt beneath the slab—rendering it useless. We insist on #4 Grade 60 Rebar (1/2" steel) tied on 18-inch centers and supported by concrete chairs to ensure true structural reinforcement.'
  },
  {
    q: 'Do you handle municipal building permits and utility locates?',
    a: 'Yes! Lara Concrete LLC handles all municipal building permits, city ROW (right-of-way) inspections, and 811 utility locate calls before any equipment touches your property.'
  }
];

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminEditMode, setIsAdminEditMode] = useState(false);

  // Persistent Company Details
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>(() => {
    const saved = localStorage.getItem('lara_companyDetails');
    return saved ? JSON.parse(saved) : DEFAULT_COMPANY;
  });

  // Persistent Services
  const [services, setServices] = useState<ConcreteService[]>(() => {
    const saved = localStorage.getItem('lara_services');
    return saved ? JSON.parse(saved) : CONCRETE_SERVICES;
  });

  // Persistent FAQs
  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    const saved = localStorage.getItem('lara_faqs');
    return saved ? JSON.parse(saved) : DEFAULT_FAQS;
  });

  const [leads, setLeads] = useState<QuoteLead[]>(INITIAL_LEADS);
  const [portalProject, setPortalProject] = useState<CustomerPortalProject>(SAMPLE_CUSTOMER_PORTAL);
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
      text: `Hello! I am your Lara Concrete Expert. How can I help you today? Call us anytime at ${companyDetails.phone1}!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save changes to LocalStorage whenever companyDetails, services, or faqs change
  useEffect(() => {
    localStorage.setItem('lara_companyDetails', JSON.stringify(companyDetails));
  }, [companyDetails]);

  useEffect(() => {
    localStorage.setItem('lara_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('lara_faqs', JSON.stringify(faqs));
  }, [faqs]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const updateCompanyDetails = (details: Partial<CompanyDetails>) => {
    setCompanyDetails((prev) => ({ ...prev, ...details }));
    showToast('Company settings updated!');
  };

  const updateService = (id: string, updated: Partial<ConcreteService>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updated } : s))
    );
    showToast('Service updated successfully!');
  };

  const addService = (newService: ConcreteService) => {
    setServices((prev) => [newService, ...prev]);
    showToast(`Added new service: ${newService.title}`);
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    showToast('Service removed!');
  };

  const updateFAQ = (index: number, question: string, answer: string) => {
    setFaqs((prev) =>
      prev.map((f, idx) => (idx === index ? { q: question, a: answer } : f))
    );
    showToast('FAQ updated!');
  };

  const addFAQ = (faq: FAQItem) => {
    setFaqs((prev) => [...prev, faq]);
    showToast('New FAQ added!');
  };

  const deleteFAQ = (index: number) => {
    setFaqs((prev) => prev.filter((_, idx) => idx !== index));
    showToast('FAQ deleted!');
  };

  const resetCMSDefaults = () => {
    setCompanyDetails(DEFAULT_COMPANY);
    setServices(CONCRETE_SERVICES);
    setFaqs(DEFAULT_FAQS);
    localStorage.removeItem('lara_companyDetails');
    localStorage.removeItem('lara_services');
    localStorage.removeItem('lara_faqs');
    showToast('Reset all CMS content to original defaults!');
  };

  const addLead = (leadData: Omit<QuoteLead, 'id' | 'createdAt' | 'status'>) => {
    const newLead: QuoteLead = {
      ...leadData,
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'New'
    };
    setLeads((prev) => [newLead, ...prev]);
    showToast(`Quote lead received for ${leadData.customerName}! We will reach out shortly.`);
  };

  const updateLeadStatus = (id: string, status: QuoteLead['status']) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === id ? { ...lead, status } : lead))
    );
    showToast(`Lead status updated to ${status}`);
  };

  const updatePortalStep = (step: 1 | 2 | 3 | 4 | 5 | 6) => {
    setPortalProject((prev) => ({
      ...prev,
      currentStep: step
    }));
    showToast(`Project Portal advanced to Step ${step}!`);
  };

  const searchWarranty = (id: string): WarrantyRecord | null => {
    setWarrantySearchId(id);
    const found = WARRANTY_RECORDS.find(
      (w) => w.warrantyId.toLowerCase() === id.trim().toLowerCase()
    );
    setActiveWarranty(found || null);
    if (found) {
      showToast(`Warranty Verified: ${found.customerName} (${found.status})`);
    } else {
      showToast('No warranty record found matching that ID.');
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

    setTimeout(() => {
      let botResponse = `Thank you for asking about "${text}". At Lara Concrete LLC, we pour high-strength 4,000 PSI concrete reinforced with #4 rebar. Give us a call at ${companyDetails.phone1} or click "Get Free Estimate" to book a site visit!`;
      const lower = text.toLowerCase();
      if (lower.includes('cost') || lower.includes('price')) {
        botResponse = 'Our standard 4,000 PSI concrete driveways range from $11.50 to $13.50/sq ft installed including excavation, rebar, and finishing. Stamped decorative patios range from $14.50 to $18.50/sq ft.';
      } else if (lower.includes('thickness') || lower.includes('slab')) {
        botResponse = 'For driveways and heavy vehicles, we recommend 5 inches of 4,000 PSI concrete over a 4" aggregate base. For patios, 4 inches is standard!';
      } else if (lower.includes('warranty')) {
        botResponse = 'Every Lara Concrete installation comes with our 10-Year Written Structural Warranty covering major settlement, freeze-thaw scaling, and deep cracking.';
      }

      const botMsg: ChatMessage = {
        sender: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  return (
    <CMSContext.Provider
      value={{
        isAdminEditMode,
        setIsAdminEditMode,
        companyDetails,
        updateCompanyDetails,
        services,
        updateService,
        addService,
        deleteService,
        faqs,
        updateFAQ,
        addFAQ,
        deleteFAQ,
        resetCMSDefaults,
        leads,
        addLead,
        updateLeadStatus,
        portalProject,
        updatePortalStep,
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
