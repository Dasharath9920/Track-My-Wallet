import type { AMOUNT_CATEGORIES } from "./components/Dashboard/data";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export interface UserResponse {
  user_id: string;
  firstName: string;
  lastName: string;
  email: string;
  created_at: Date;
  updated_at: Date;
};

export interface Payment {
  user_id: string;
  name: string;
  totalMonths: number;
  monthsRemaining: number;
  amount: number;
  dueDate: string;
}

export interface Transaction {
  user_id: string;
  category: string;
  amount: number;
  customCategory?: string;
  date_of_transaction: string;
}

export interface TransactionResponse {
  id: string;
  user_id: string;
  category: keyof typeof AMOUNT_CATEGORIES;
  amount: number;
  custom_category?: string;
  date_of_transaction: string;
  created_at: Date;
  updated_at: Date;
}

export interface PaymentResponse {
  id: string;
  user_id: string;
  name: string;
  total_months: number;
  months_remaining: number;
  amount: number;
  due_date: string;
  created_at: Date;
  updated_at: Date;
}

export interface DashboardCard {
  title: string;
  subTitle: string;
  backgroundColor: string;
}

export type Statistics = Record<string, DashboardCard>;

export type StatisticsResponse = {
  totalMonthlySpends: number,
  topCategory: string,
  topAmount: number,
}

export interface InitialState {
  user: UserResponse | null,
  payments: PaymentResponse[],
  transactions: TransactionResponse[],
  statistics: Statistics,
  overviewChart: TransactionGroupByDay[],
  pieChart: PieChartData[],
  upcomingPayments: PaymentResponse[],
  hideAmount: boolean;
}

export const StoreActions = {
  UPDATE_USER: 'update_user',
  UPDATE_PAYMENTS: 'update_payments',
  UPDATE_TRANSACTIONS: 'update_transactions',
  UPDATE_STATISTICS: 'update_statistics',
  UPDATE_OVERVIEW_CHART: 'update_overview_chart',
  UPDATE_PIE_CHART: 'update_pie_chart',
  UPDATE_UPCOMING_PAYMENTS: 'update_upcoming_payments',
  UPDATE_HIDE_AMOUNT: 'update_hide_amount',
} as const;

export type StoreActions = typeof StoreActions[keyof typeof StoreActions];

export type AmountByCategory = Record<keyof typeof AMOUNT_CATEGORIES, number>;

export type TransactionGroupByDay = { day: string, amount: number };

export type PieChartData = {
  category: string,
  value: number,
  name: string,
};

export const modalTypes = {
  Transaction: 'transaction',
  MonthlyPayment: 'monthlyPayment'
} as const;

export type modalTypes = typeof modalTypes[keyof typeof modalTypes];