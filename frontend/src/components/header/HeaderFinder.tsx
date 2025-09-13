'use client';

import { useEffect, useState } from 'react';
import { useModal } from '../modal/ModalProvider';

export function HeaderFinder() {
  const [canClose, setCanClose] = useState<boolean>(false);
  const { open, isOpen, close } = useModal();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.code === 'KeyK' && !isOpen) {
        e.preventDefault();
        setCanClose(true);
        open(<div>Finder</div>);
      } else if ((e.ctrlKey || e.metaKey) && e.code === 'KeyK' && isOpen && canClose) {
        e.preventDefault();
        setCanClose(false);
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return null;
}
