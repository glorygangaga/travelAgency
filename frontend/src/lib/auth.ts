export async function fetchUser() {
  const res = await fetch('/api/auth/verify');
  if (!res.ok) return null;

  return res.json();
}
