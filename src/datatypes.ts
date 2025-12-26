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
  customCategory?: string;
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

export interface InitialState {
  user: UserResponse | null,
  payments: PaymentResponse[],
  transactions: TransactionResponse[],
}

export const StoreActions = {
  UPDATE_USER: 'update_user',
  UPDATE_PAYMENTS: 'update_payments',
  UPDATE_TRANSACTIONS: 'update_transactions',
} as const;

export type StoreActions = typeof StoreActions[keyof typeof StoreActions];

export type AmountByCategory = Record<keyof typeof AMOUNT_CATEGORIES, number>;

export const modalTypes = {
  Transaction: 'transaction',
  MonthlyPayment: 'monthlyPayment'
} as const;

export type modalTypes = typeof modalTypes[keyof typeof modalTypes];