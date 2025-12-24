export interface User {
  firstName: string;
  lastName: string;
  imgUrl: string;
  email: string;
};

export interface Payment {
  name: string;
  totalMonths: number;
  monthsRemaining: number;
  amount: number;
  dueDate: number;
}

export interface Transaction {
  category: string;
  amount: number;
  customCategory?: string;
  date: string;
}

export interface InitialState {
  user: User | null,
  payments: Payment[],
  transactions: Transaction[],
}

export const StoreActions = {
  UPDATE_USER: 'update_user',
  ADD_PAYMENT: 'add_payment',
  ADD_TRANSACTION: 'add_transaction',
} as const;

export type StoreActions = typeof StoreActions[keyof typeof StoreActions];

export const modalTypes = {
  Transaction: 'transaction',
  MonthlyPayment: 'monthlyPayment'
} as const;

export type modalTypes = typeof modalTypes[keyof typeof modalTypes];