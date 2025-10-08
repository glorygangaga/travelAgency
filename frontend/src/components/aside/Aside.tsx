'use client';

import { motion } from 'framer-motion';
import { createContext, useState, type FC } from 'react';

import { AsideHeader } from './AsideHeader';
import AsideItems from './AsideItems';
import { AppContextType } from '@/hook/useAsideContext';

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
  return (
    <AsideContext.Provider value={{ hovered, CloseMenu }}>
      <motion.aside
        layout
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className='flex flex-col gap-4 px-2 max-md:pt-2 pt-8 border-r z-10 border-black/20 dark:border-white/10 fixed left-0 max-md:h-min h-screen text-md group max-md:w-full min-w-[70px] bg-gray-100 max-md:bg-white dark:bg-black'
        initial={{ width: '70px' }}
        animate={{ width: hovered ? '220px' : '70px' }}
      >
        <AsideHeader />
        <AsideItems />
      </motion.aside>
    </AsideContext.Provider>
  );
};

export default Aside;
