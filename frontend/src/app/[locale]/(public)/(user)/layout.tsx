import type { PropsWithChildren } from 'react';
import { UserWrapper } from './UserWrapper';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return <UserWrapper>{children}</UserWrapper>;
}
