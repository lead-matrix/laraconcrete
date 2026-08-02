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
  projectsCompleted: number;
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
  yearsInBusiness: 15,
  projectsCompleted: 1247
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
      const lower = text.toLowerCase();
      let botResponse = `Thank you for reaching out to Lara Concrete LLC! We pour high-strength 4,000+ PSI concrete reinforced with #4 rebar. Give us a call at ${companyDetails.phone1} or click "Get Free Estimate" below for a fast 15-min call back!`;

      if (lower.includes('cost') || lower.includes('price') || lower.includes('much') || lower.includes('rate')) {
        botResponse = '💰 Our standard 4,000 PSI broom-finish driveways run $11.50–$13.50/sq ft installed (includes excavation, rebar & finishing). Stamped decorative patios are $14.50–$18.50/sq ft. Commercial slabs from $9–$12/sq ft depending on thickness.';
      } else if (lower.includes('thickness') || lower.includes('slab') || lower.includes('depth') || lower.includes('inch')) {
        botResponse = '📐 For driveways & heavy vehicle areas we pour 5" thick 4,000 PSI over a 4" compacted aggregate base. Patios are standard 4". Garage shop floors with car lifts we go 5–6". Foundations are engineered per load requirements.';
      } else if (lower.includes('warranty') || lower.includes('guarantee') || lower.includes('crack')) {
        botResponse = '🛡️ Every Lara Concrete installation includes a 10-Year Written Structural Warranty covering major settlement, freeze-thaw scaling, deep cracking & drainage failures. Warranty ID lookup is available on our website!';
      } else if (lower.includes('permit') || lower.includes('utility') || lower.includes('city') || lower.includes('inspect')) {
        botResponse = '📋 Yes — Lara Concrete LLC handles all municipal building permits, city right-of-way (ROW) inspections, and 811 Kansas One-Call utility locates before any equipment touches your property. No paperwork headaches for you!';
      } else if (lower.includes('stamp') || lower.includes('decor') || lower.includes('pattern') || lower.includes('color')) {
        botResponse = '🎨 We offer 12+ stamped concrete patterns including Ashlar Slate, European Cobblestone, Wood Plank, Flagstone, and Herringbone Brick. Colors include charcoal, sandstone, terra cotta, and custom tints. Dual-color release agents available!';
      } else if (lower.includes('financ') || lower.includes('payment') || lower.includes('monthly') || lower.includes('loan')) {
        botResponse = '💳 Yes! We offer flexible financing starting at $0 down with low monthly payments. Projects as low as $149/month OAC. Apply in minutes — ask about our financing options when you call (316) 993-0376!';
      } else if (lower.includes('how long') || lower.includes('timeline') || lower.includes('schedule') || lower.includes('when') || lower.includes('days')) {
        botResponse = '📅 Most residential driveways (600–2,000 sq ft) take 1–2 days to form & pour, plus 7–28 days to cure. We typically schedule within 1–3 weeks of estimate approval. Weather permitting — we pour in temps above 40°F.';
      } else if (lower.includes('repair') || lower.includes('resurface') || lower.includes('crack') || lower.includes('seal') || lower.includes('fix')) {
        botResponse = '🔧 We offer concrete crack routing & sealing, mudjacking/slabjacking, overlay resurfacing, epoxy coating, and full removal & replacement. Send us a photo of the damage for a fast repair estimate!';
      } else if (lower.includes('area') || lower.includes('wichita') || lower.includes('derby') || lower.includes('andover') || lower.includes('maize') || lower.includes('goddard') || lower.includes('serve')) {
        botResponse = '📍 We serve all of Wichita and the surrounding Kansas Metro: Derby, Andover, Maize, Goddard, Bel Aire, Haysville, Mulvane, Valley Center, and Park City. Free on-site estimates anywhere in Sedgwick & Butler County!';
      } else if (lower.includes('rebar') || lower.includes('wire mesh') || lower.includes('fiber') || lower.includes('reinforc')) {
        botResponse = '⚙️ We use #4 Grade 60 rebar (1/2") tied on 18" centers, supported by concrete chairs — not wire mesh that sinks to the bottom. Structural fiber mesh additives are also available as a hybrid system for maximum crack resistance.';
      } else if (lower.includes('commercial') || lower.includes('business') || lower.includes('warehouse') || lower.includes('loading') || lower.includes('dock')) {
        botResponse = '🏭 For commercial projects we offer laser-screed flatwork, loading dock aprons, truck courts, warehouse floors (FF/FL rated), tilt-up panels, and curb & gutter work. ACI-certified flatwork finishers on every commercial pour.';
      } else if (lower.includes('weather') || lower.includes('winter') || lower.includes('freeze') || lower.includes('rain') || lower.includes('hot')) {
        botResponse = '🌡️ We pour concrete in temps 40°F–95°F. In cold weather we use heated blankets & accelerants. In summer heat we use ice-cooled water and retarders to extend workability. Rain within 4–8 hours of a pour can damage the finish — we reschedule to protect quality.';
      } else if (lower.includes('hola') || lower.includes('habla') || lower.includes('español') || lower.includes('espanol') || lower.includes('spanish')) {
        botResponse = '¡Hola! Sí, hablamos español. Estamos listos para ayudarle con su proyecto de concreto. Llámenos al (316) 993-0376 o haga clic en el botón de idioma arriba para cambiar a Español.';
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
