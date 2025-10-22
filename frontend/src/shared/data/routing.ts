export const adminRoutes = ['/admin/dashboard'] as const;
export const moderatorRotes = ['/moderator/dashboard'] as const;
export const protectedRoutes = ['/account', ...adminRoutes, ...moderatorRotes] as const;

export function isProtectedRoute(path: string): boolean {
  return protectedRoutes.some(route => path.startsWith(route));
}

export function isAdminRoute(path: string): boolean {
  return adminRoutes.some(route => path.startsWith(route));
}

export function isModeratorRoute(path: string): boolean {
  return moderatorRotes.some(route => path.startsWith(route));
}

export const NO_INDEX_PAGE = {
  robots: {
    index: false,
    follow: false,
    nosnippet: true,
    noarchive: true,
    nocache: true,
    noimageindex: true,
    nositelinkssearchbox: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      nocache: true,
      noarchive: true,
      nosnippet: true,
      nositelinkssearchbox: true,
    },
  },

}