export function GetDefaultMethods(method: string): RequestInit {
  return {
    method,
    credentials: 'include',
    headers: {'Content-type': 'application/json',},
  }
}

export async function FetchDefault(url: string, method: string) {
  const res = await fetch(url, GetDefaultMethods(method));
  if (!res.ok) return null;
  const data = await res.json();

  return data;
}