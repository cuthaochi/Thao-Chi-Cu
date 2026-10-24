export type NavTab = 
  | 'home'
  | 'faq'
  | 'download'
  | 'game'
  | 'deposit'
  | 'loan'
  | 'products'
  | 'branches';

export interface FaqStep {
  step: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface FaqTopic {
  id: string;
  title: string;
  shortDesc: string;
  iconName: string;
  videoUrl: string;
  steps: FaqStep[];
}

export interface BranchOffice {
  id: string;
  stt: number;
  name: string;
  address: string;
  phone: string;
  photoUrl: string;
  googleMapsUrl: string;
  workingHours?: string;
}

export interface BranchInfo {
  id: string;
  name: string;
  region: string;
  logoUrl?: string;
  hotline: string;
  offices: BranchOffice[];
}

export interface ProductItem {
  id: string;
  name: string;
  category: 'personal' | 'household' | 'enterprise' | 'promo' | 'auction';
  categoryLabel: string;
  imageUrl: string;
  highlightText: string;
  description?: string;
  benefits?: string[];
}

export interface LoanScheduleRow {
  period: number;
  date: string;
  openingBalance: number;
  principal: number;
  interest: number;
  totalPayment: number;
  closingBalance: number;
}

export interface LoanCalculationResult {
  firstPayment: number;
  lastPayment: number;
  totalPrincipal: number;
  totalInterest: number;
  totalPayment: number;
  schedule: LoanScheduleRow[];
}
