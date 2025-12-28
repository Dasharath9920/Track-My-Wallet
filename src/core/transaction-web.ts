import type { Transaction, TransactionResponse, TransactionGroupByDay } from "../datatypes";
const API = import.meta.env.VITE_APIURL;

export async function addTransaction(transaction: Transaction) {
  const res = await fetch(`${API}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transaction)
  });
  return res;
}

export async function getAllTransactions(userId: string, days?: number): Promise<TransactionResponse[]> {
  let url = `{${API}}/transactions/${userId}`;
  if (days) {
    url = `${API}/transactions/${userId}?days=${days}`
  }
  const res = await fetch(url, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch transactions');
  }

  const body = await res.json();
  return body.data;
}

export async function getAllTransactionsGroupByDay(userId: string, days?: number): Promise<TransactionGroupByDay[]> {
  let url = `${API}/transactions/${userId}/group-by-day?days=${days}`
  const res = await fetch(url, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch transactions');
  }

  const body = await res.json();
  return body.data;
}