export type Currency = 'INR' | 'USD';

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currency: Currency;
  currentAmount: number;
  contributions: Contribution[];
  createdAt: Date;
}

export interface Contribution {
  id: string;
  amount: number;
  date: Date;
  goalId: string;
}

export interface ExchangeRate {
  rate: number;
  lastUpdated: Date;
  fromCurrency: Currency;
  toCurrency: Currency;
}

export interface DashboardStats {
  totalTarget: number;
  totalSaved: number;
  overallProgress: number;
  goalCount: number;
}
