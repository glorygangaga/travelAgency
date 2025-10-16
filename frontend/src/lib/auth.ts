import { FetchDefault } from "./data";

export const fetchUser = async () => FetchDefault('/api/user/profile', 'GET');
export const logoutUser = async() => FetchDefault('/api/auth/logout', 'POST');
export const revalidateToken = async  () => FetchDefault('/api/auth/revalidate', 'POST');
