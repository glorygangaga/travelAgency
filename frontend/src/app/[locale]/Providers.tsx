import { ThemeProvider } from 'next-themes';
import { ModalProvider } from '@/components/ui/modal/ModalProvider';
import { UserWrapper } from './UserWrapper';
import { ReactQueryProvider } from './queryProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <ReactQueryProvider>
        <UserWrapper>
          <ModalProvider>{children}</ModalProvider>
        </UserWrapper>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
