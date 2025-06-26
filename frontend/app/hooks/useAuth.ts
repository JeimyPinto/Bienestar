import { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import getToken from "../lib/getToken";
import getUsertoken from "../lib/getUserToken";
import isTokenExpired from "../lib/isTokenExpired";
import { User } from "../types";

export function useAuth() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  // Obtiene y decodifica el token
  const refresh = useCallback(() => {
    const t = getToken();
    setToken(t);
    if (t) {
      setIsExpired(isTokenExpired(t));
      try {
        const userDecoded = getUsertoken(t);
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

  useEffect(() => {
    if (isExpired && pathname !== "/") {
      router.push("/auth");
    }
  }, [isExpired, pathname, router]);

  // Logout: borra token y usuario
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsExpired(true);
  }, []);

  return { token, user, isExpired, logout, refresh };
}
