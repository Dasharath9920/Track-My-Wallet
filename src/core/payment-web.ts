import type { Payment } from "../datatypes";

export const addPayment = async (payment: Payment) => {
  const res = await fetch(`http://localhost:3000/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payment)
  });

  return res;
}

export async function getAllPayments(userId: string) {
  let url = `http://localhost:3000/payments/${userId}`;
  const res = await fetch(url, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch payments');
  }

  const body = await res.json();
  return body.data;
}

export async function getUpcomingPayments(userId: string) {
  let url = `http://localhost:3000/payments/${userId}/upcoming`;
  const res = await fetch(url, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch payments');
  }

  const body = await res.json();
  return body.data;
}