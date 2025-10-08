import { ThemeProvider } from 'next-themes';
import { ModalProvider } from '@/components/modal/ModalProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      <ModalProvider>{children}</ModalProvider>
    </ThemeProvider>
  );
}
