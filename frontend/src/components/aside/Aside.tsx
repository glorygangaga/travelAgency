'use client';

import { motion } from 'framer-motion';
import { createContext, useEffect, useState, type FC } from 'react';

import { AsideHeader } from './AsideHeader';
import AsideItems from './AsideItems';
import { AppContextType } from '@/shared/lib/hook/useAsideContext';

export const AsideContext = createContext<null | AppContextType>(null);

type Props = {
  CloseMenu?: () => void;
};

export const textVariants = {
  initial: { opacity: 0, scale: 0 },
  exit: { opacity: 0, scale: 0 },
  animate: { opacity: 1, scale: 1 },
};

const Aside: FC<Props> = ({ CloseMenu }) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth < 600);
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return (
    <AsideContext.Provider value={{ hovered, CloseMenu, isMobile }}>
      <motion.aside
        layout
        key={isMobile ? 'mobile' : 'desktop'}
        onMouseEnter={() => !isMobile && setHovered(true)}
        onMouseLeave={() => !isMobile && setHovered(false)}
        className='flex flex-col gap-4 px-2 max-md:pt-2 pt-8 border-r z-10 border-black/20 dark:border-white/10 fixed left-0 max-md:h-min h-screen text-md group max-md:w-full min-w-[70px] bg-gray-100 max-md:bg-white dark:bg-black'
        animate={{
          width: isMobile ? '100%' : hovered ? '230px' : '70px',
        }}
        transition={{
          width: isMobile ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 },
        }}
      >
        <AsideHeader />
        <AsideItems />
      </motion.aside>
    </AsideContext.Provider>
  );
};

export default Aside;
