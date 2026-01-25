import { getTranslations } from 'next-intl/server';

export async function About() {
  const t = await getTranslations();

  const infos: string[] = [
    t('HOME.ABOUT.ADDITIONAL.TEXT1'),
    t('HOME.ABOUT.ADDITIONAL.TEXT2'),
    t('HOME.ABOUT.ADDITIONAL.TEXT3'),
  ] as const;

  return (
    <section className='grid gap-3 mb-7 justify-items-center p-4 bg-white border border-black/15 dark:bg-black/60 rounded-lg'>
      <h1 className='font-bold text-center text-4xl'>{t('HOME.ABOUT.TITLE')}</h1>
      <h2 className='text-2xl'>
        {t('HOME.ABOUT.WELCOME')} <span className='font-bold'>{t('SITE_NAME')}</span>!
      </h2>
      <h2>{t('HOME.ABOUT.TEXT1')}</h2>
      <h2>{t('HOME.ABOUT.TEXT2')}</h2>
      <h2>
        {t('HOME.ABOUT.TEXT3.FIRST')} {t('SITE_NAME')} {t('HOME.ABOUT.TEXT3.SECOND')}
      </h2>
      <ul className='grid gap-4 w-full max-xl:grid-cols-1 grid-cols-3'>
        {infos.map((info) => (
          <li
            key={info}
            className='px-3 py-6 dark:bg-white/10 bg-black/5 rounded-lg flex justify-center items-center text-center font-bold text-lg shadow-[5px_5px_15px_0px_rgba(0,0,0,0.20)]'
          >
            {info}
          </li>
        ))}
      </ul>
    </section>
  );
}
