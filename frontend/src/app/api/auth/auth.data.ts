export const AUTH_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth`;


export const GetDefaultReq = (): RequestInit => {
  return {
    method: "POST",
    headers: {
      'Content-type': 'application/json',
    },
  };
}