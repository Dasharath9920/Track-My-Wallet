import type { User } from "../datatypes";
const API = import.meta.env.VITE_APIURL;

export const registerUser = async (user: User) => {
  const res = await fetch(`${API}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  return res;
}

export const loginUser = async (body: { email: string, password: string }) => {
  const res = await fetch(`${API}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  return res;
}

export const getUserById = async (id: string) => {
  const res = await fetch(`${API}/users/${id}`, {
    method: 'GET',
  });
  return res;
}
