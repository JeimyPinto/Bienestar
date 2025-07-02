"use client";

import { useCallback, useEffect, useState } from "react";
import getToken from "../lib/getToken";
import getUsertoken from "../lib/getUserToken";
import isTokenExpired from "../lib/isTokenExpired";
import { User } from "../../types";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isExpired, setIsExpired] = useState<boolean>(false);

  // Obtiene y decodifica el token
  const refresh = useCallback(async () => {
    const t = getToken();
    setToken(t);
    if (t) {
      setIsExpired(isTokenExpired(t));
      try {
        const userDecoded = await getUsertoken(t);
        if (userDecoded && typeof userDecoded === "object" && "id" in userDecoded) {
          setUser(userDecoded as User);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
      setIsExpired(true);
    }
  }, []);

  // Cargar al montar
  useEffect(() => {
    refresh();
  }, [refresh]);

  // Logout: borra token y usuario
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsExpired(true);
  }, []);

  return { token, user, isExpired, logout, refresh };
}
