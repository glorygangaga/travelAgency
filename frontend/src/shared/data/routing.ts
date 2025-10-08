export const adminRoutes = ['/admin/dashboard'] as const;
export const protectedRoutes = ['/account', ...adminRoutes] as const;

export function isProtectedRoute(path: string): boolean {
  return protectedRoutes.some(route => path.startsWith(route));
}

export function isAdminRoute(path: string): boolean {
  return adminRoutes.some(route => path.startsWith(route));
}