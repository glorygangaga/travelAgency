import { AsideContext } from '@/components/aside/Aside';
import { useContext } from 'react';

export interface AppContextType {
  hovered: boolean;
  CloseMenu?: () => void;
  isMobile: boolean;
}

export function useAsideContext() {
  const context = useContext(AsideContext);
  if (!context) {
    throw new Error('useAsideContext must be used within an AppProvider');
  }
  return context;
}
