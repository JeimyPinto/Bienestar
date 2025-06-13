import getToken from "./getToken";

// Extrae el usuario del token JWT
function getUsertoken(token: string) {
  try {
    const base64Url = token.split(".")[1];
    let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    while (base64.length % 4 !== 0) {
      base64 += "=";
    }
    const payload = JSON.parse(atob(base64));
    return payload && payload.user ? payload.user : null;
  } catch {
    return null;
  }
}

// Devuelve el usuario extraído del token, o null si no hay token o es inválido
export default function getUserToken() {
  const token = getToken();
  if (!token) return null;
  return getUsertoken(token);
}
