import type { Payment } from "../datatypes";
const API = import.meta.env.VITE_APIURL;

export const addPayment = async (payment: Payment) => {
  const res = await fetch(`${API}/payments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payment)
  });

  return res;
}

export async function getAllPayments(userId: string) {
  let url = `${API}/payments/${userId}`;
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
  let url = `${API}/payments/${userId}/upcoming`;
  const res = await fetch(url, {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch payments');
  }

  const body = await res.json();
  return body.data;
}