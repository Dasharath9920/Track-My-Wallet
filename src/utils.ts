import { initialTotals } from "./constants";
import { getAllTransactions } from "./core/transaction-web";
import type { AmountByCategory } from "./datatypes";

export const getNextDueDate = (day: number) => {
  const date = new Date();
  const today = date.getDate();

  if (today == day - 1) return 'Tomorrow';
  if (today == day) return 'Today';

  if (today < day) {
    return date.toLocaleString('defualt', { month: 'short' }) + ', ' + day;
  } else {
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    return nextMonth.toLocaleString('defualt', { month: 'short' }) + ', ' + day;
  }
}

export const getLastNDaysDataGroupByCategory = async (userId: string, days: number) => {
  const res = await getAllTransactions(userId, days);
  const data = res.reduce((acc: AmountByCategory, transaction) => {
    acc[transaction.category] += Number(transaction.amount);
    return acc;
  }, { ...initialTotals });


  return data;
}