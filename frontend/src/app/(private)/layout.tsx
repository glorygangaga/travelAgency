import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
