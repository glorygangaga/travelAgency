import { useTranslations } from 'next-intl';
import { LanguageLists } from './LanguageLists';

export default function Page() {
  const t = useTranslations();

  return (
    <div className='grid gap-3'>
      <h1 className='font-bold text-3xl'>{t('ASIDE.Language')}</h1>
      <LanguageLists />
    </div>
  );
}
