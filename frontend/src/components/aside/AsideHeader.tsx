import { Earth } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { useAsideContext } from '@/hook/useAsideContext';

type Props = {
  CloseMenu?: () => void;
};

export function AsideHeader({ CloseMenu }: Props) {
  const t = useTranslations();
  const { hovered } = useAsideContext();

  return (
    <Link
      className='flex items-center group-hover:gap-2 max-md:gap-2 justify-center text-2xl font-bold mb-4'
      href='/'
      onClick={() => CloseMenu && CloseMenu()}
    >
      <Earth />
      {hovered && (
        <AnimatePresence mode='popLayout'>
          <motion.span
            className='hidden max-w-0 invisible opacity-0 group-hover:max-w-fit max-md:max-w-fit max-md:opacity-100 group-hover:opacity-100 max-md:visible group-hover:visible max-md:block group-hover:block transition-opacity duration-500 ease-in-out'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {t('SITE_NAME')}
          </motion.span>
        </AnimatePresence>
      )}
    </Link>
  );
}
