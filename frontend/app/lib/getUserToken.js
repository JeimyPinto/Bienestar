export function getUserPayloadFromToken(token) {
  const user = JSON.parse(atob(token.split(".")[1]));
  if (!user) {
    return null;
  }
  return user;
}
