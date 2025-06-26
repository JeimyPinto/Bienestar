export default function getCookie(name: string): string | null {
  const cookie = document.cookie;
  const value = cookie.split('; ').find(row => row.startsWith(name + '='));
  return value ? value.split('=')[1] : null;
}
