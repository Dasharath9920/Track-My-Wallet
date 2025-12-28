import { initialTotals } from "./constants";
import { getAllTransactions } from "./core/transaction-web";
import type { AmountByCategory, PaymentResponse, Statistics, StatisticsResponse } from "./datatypes";

export const getNextDueDate = (dueDay: string): string => {
  const day = Number(dueDay.split('T')[0].split('-')[2] ?? 0);
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

export const dashboardStatistics = (statistics: StatisticsResponse, upcomingPayments: PaymentResponse[]) => {
  const data = {
    ['Total Balance']: {
      title: '₹0',
      subTitle: '+₹0 This Month',
      backgroundColor: '#3f6e86',
    },
    ['Monthly Spending']: {
      title: `${formatINR(statistics.totalMonthlySpends)}`,
      subTitle: `+${formatINR(statistics.totalMonthlySpends)} This Month`,
      backgroundColor: '#515f90',
    },
    ['Top Category']: {
      title: statistics.topCategory,
      subTitle: `${formatINR(statistics.topAmount)} This Month`,
      backgroundColor: '#c88d2b',
    },
    ['Upcoming Bills']: {
      title: `${upcomingPayments.length} Bills Due`,
      subTitle: formatINR(upcomingPayments.reduce((acc, payment) => acc + Number(payment.amount), 0)),
      backgroundColor: '#97385b',
    },
  }
  return data;
}

export const getEmptyStats = (): Statistics => {
  const data = {
    ['Total Balance']: {
      title: '₹0',
      subTitle: '+0 This Month',
      backgroundColor: '#3f6e86',
    },
    ['Monthly Spending']: {
      title: `₹0`,
      subTitle: `₹0 This Month`,
      backgroundColor: '#515f90',
    },
    ['Top Category']: {
      title: 'Entertainment',
      subTitle: `₹0 This Month`,
      backgroundColor: '#c88d2b',
    },
    ['Upcoming Bills']: {
      title: `0 Bills Due`,
      subTitle: '0',
      backgroundColor: '#97385b',
    },
  }
  return data;
}

export const getFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`;
}

export const formatINR = (value: number | string) => {
  let amount = value;
  if (typeof value === 'string') {
    amount = Number(value);
  }
  return amount.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}

export const isMobileDevice = (): boolean => {
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  return isMobile;
}