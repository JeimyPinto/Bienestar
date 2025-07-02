import { Request } from "../interface/request";

const url = `${process.env.NEXT_PUBLIC_API_URL}/requests`;

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

export async function getAllActive(token?: string) {
  const res = await fetch(`${url}/active`, {
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

export async function getById(id: number, token?: string) {
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

export async function create(request: Request, token?: string) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(request),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok || data.details) {
    return { error: true, message: data.message, details: data.details };
  }
  return { error: false, ...data };
}

export async function update(id: number, request: Request, token?: string) {
  const res = await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify(request),
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok || data.details) {
    return { error: true, message: data.message, details: data.details };
  }
  return { error: false, ...data };
}

export async function getByUserId(userId: number, token?: string) {
  const res = await fetch(`${url}/user/${userId}`, {
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
