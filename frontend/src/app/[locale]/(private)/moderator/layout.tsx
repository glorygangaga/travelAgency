import { ModeratorLists } from '@/components/routes/private/moderator/lists/ModeratorLists';
import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <ModeratorLists />
      {children}
    </>
  );
}
