// frontend/app/services/services/remission.ts
import { Remission } from "../interface/remission";

const url = `${process.env.NEXT_PUBLIC_API_URL}/remissions`;

export async function getAll(token?: string) {
  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok || data.details) {
    return { error: true, message: data.message, details: data.details };
  }
  return { error: false, ...data };
}

export async function getById(id: string, token?: string) {
  const res = await fetch(`${url}/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok || data.details) {
    return { error: true, message: data.message, details: data.details };
  }
  return { error: false, ...data };
}

export async function create(remission: Remission, token?: string) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(remission),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok || data.details) {
    return { error: true, message: data.message, details: data.details };
  }
  return { error: false, ...data };
}

export async function update(id: string, remission: Remission, token?: string) {
  const res = await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(remission),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok || data.details) {
    return { error: true, message: data.message, details: data.details };
  }
  return { error: false, ...data };
}