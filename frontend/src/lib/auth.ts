
export async function fetchUser() {
  const res = await fetch('/api/user/profile', {
    method: "GET",
    credentials: 'include',
    headers: {'Content-type': 'application/json',},
  });
  if (!res.ok) return null;
  const data = await res.json();

  return data;
}


export async function logoutUser() {
  const res = await fetch('/api/auth/logout', {
    method: "POST",
    credentials: 'include',
    headers: {'Content-type': 'application/json',},
  });

  if (!res.ok) return null;
  const data = await res.json();

  return data;
}

export async function revalidateToken() {
  const res = await fetch('/api/auth/revalidate', {
    method: "POST",
    credentials: 'include',
    headers: {'Content-type': 'application/json',},
  });
  if (!res.ok) return null;
  const data = await res.json();

  return data;

}