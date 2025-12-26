import type { Transaction, TransactionResponse } from "../datatypes";

export async function addTransaction(transaction: Transaction) {
  const res = await fetch(`http://localhost:3000/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transaction)
  });
  return res;
}

export async function getAllTransactions(userId: string, days?: number): Promise<TransactionResponse[]> {
  let url = `http://localhost:3000/transactions/${userId}`;
  if (days) {
    url = `http://localhost:3000/transactions/${userId}?days=${days}`
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