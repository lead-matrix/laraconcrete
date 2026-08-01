import type {
  HeroData,
  StatData,
  TestimonialData,
  ProjectData,
  PlaybookData,
  TimelineData,
  ClientLogoData,
  NowEntry,
  TechStackItem,
  ValueMatrixItem,
  OperatingPrinciple,
  SiteSettings,
  AnalyticsData
} from '../types/cms';

export interface CMSProvider {
  getHero(): Promise<HeroData>;
  updateHero(data: HeroData): Promise<void>;

  getStats(): Promise<StatData[]>;
  updateStats(data: StatData[]): Promise<void>;

  getTestimonials(): Promise<TestimonialData[]>;
  updateTestimonials(data: TestimonialData[]): Promise<void>;

  getProjects(): Promise<ProjectData[]>;
  updateProjects(data: ProjectData[]): Promise<void>;
  verifyProjectPassword(id: string, code: string): Promise<boolean>;

  getPlaybooks(): Promise<PlaybookData[]>;
  updatePlaybooks(data: PlaybookData[]): Promise<void>;

  getTimeline(): Promise<TimelineData[]>;
  updateTimeline(data: TimelineData[]): Promise<void>;

  getClientLogos(): Promise<ClientLogoData[]>;
  updateClientLogos(data: ClientLogoData[]): Promise<void>;

  getNowEntries(): Promise<NowEntry[]>;
  updateNowEntries(data: NowEntry[]): Promise<void>;

  getTechStack(): Promise<TechStackItem[]>;
  updateTechStack(data: TechStackItem[]): Promise<void>;

  getValueMatrix(): Promise<ValueMatrixItem[]>;
  updateValueMatrix(data: ValueMatrixItem[]): Promise<void>;

  getOperatingPrinciples(): Promise<OperatingPrinciple[]>;
  updateOperatingPrinciples(data: OperatingPrinciple[]): Promise<void>;

  getSettings(): Promise<SiteSettings>;
  updateSettings(data: SiteSettings): Promise<void>;

  getAnalytics(): Promise<AnalyticsData>;
  updateAnalytics(data: AnalyticsData): Promise<void>;
}
