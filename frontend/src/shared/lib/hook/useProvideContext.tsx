import { Context, useContext } from 'react';

export function useProviderContext<T>(contextVal: Context<T | null>) {
  const context = useContext(contextVal);
  if (!context) {
    throw new Error('useContext must be used within an AppProvider');
  }
  return context;
}
