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
  name: string;
  totalMonths: number;
  monthsRemaining: number;
  amount: number;
  dueDate: number;
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

export interface InitialState {
  user: UserResponse | null,
  payments: Payment[],
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