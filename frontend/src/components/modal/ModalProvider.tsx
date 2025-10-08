'use client';

import { createContext, useCallback, useContext, useState, ReactNode, useEffect } from 'react';
import { Modal } from './Modal';

type ModalContent = ReactNode;

interface ModalContextType {
  open: (content: ModalContent) => void;
  close: () => void;
  isOpen: boolean;
}

const ModalContext = createContext<ModalContextType | null>(null);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used inside ModalProvider');
  return context;
}

export function ModalProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<ModalContent>(null);

  const open = useCallback((node: ModalContent) => setContent(node), []);

  const close = useCallback(() => setContent(null), []);
  const isOpen = content !== null;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const body = document.body;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (isOpen) {
      body.style.overflow = 'hidden';
      document.body.style.paddingRight = scrollBarWidth + 'px';
    } else {
      body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }, [isOpen]);

  return (
    <ModalContext.Provider value={{ open, close, isOpen }}>
      <Modal isOpen={isOpen} onClose={close}>
        {content}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
}
