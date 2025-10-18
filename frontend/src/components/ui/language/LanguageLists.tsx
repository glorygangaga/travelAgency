'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'ru', name: 'Русский' },
] as const;

export function LanguageLists() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <ul className='grid gap-1'>
      {languages.map((lang) => (
        <li key={lang.code}>
          <button
            className={`w-full p-2 rounded-lg transition-colors hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer text-left ${
              locale === lang.code ? 'bg-black/10 dark:bg-white/10' : ''
            }`}
            onClick={() => locale !== lang.code && changeLanguage(lang.code)}
          >
            {lang.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
