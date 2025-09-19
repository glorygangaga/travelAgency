import { memo } from 'react';
import { Theme } from '../Theme/Theme';
import { useTranslations } from 'next-intl';

export function FooterElement() {
  const t = useTranslations();
  return (
    <footer className='py-3 border-t dark:bg-black/70 backdrop-blur-xl z-[1] border-black/20 dark:border-white/10 sticky bottom-0'>
      <div className='flex justify-between px-2 gap-5 items-center'>
        <Theme />
        <span className='max-md:text-xs'>
          &copy; {new Date().getFullYear()} {t('SITE_NAME')}. {t('RIGHTS')}
        </span>
      </div>
    </footer>
  );
}

export const Footer = memo(FooterElement);
