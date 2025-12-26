import type { UserRequest } from "../datatypes";

export const registerUser = async (user: UserRequest) => {
  const res = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  return res;
}

export const getUserById = async (id: string) => {
  const res = await fetch(`http://localhost:3000/users/${id}`, {
    method: 'GET',
  });
  return res;
}