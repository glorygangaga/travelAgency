'use client';

import { motion } from 'framer-motion';
import { Globe, ShieldCheck, Users, PhoneCall, MapPinned } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import ValueCard from './ValueCard';

export default function AboutPage() {
  const t = useTranslations('ABOUT');
  const router = useRouter();

  return (
    <section className='min-h-screen bg-background text-foreground'>
      <article className='relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-5'>
        <div className='container mx-auto text-center'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-4xl md:text-6xl font-bold tracking-tight'
          >
            {t('US')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='max-w-3xl mx-auto text-lg text-muted-foreground'
          >
            {t('DO')}
          </motion.p>
        </div>
      </article>

      <article className='grid gap-3 mb-7 max-w-6xl mx-auto justify-items-center p-4 bg-white border border-black/15 dark:bg-black/60 rounded-lg'>
        <div className='grid grid-cols-3 gap-12 items-center py-5'>
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='col-span-2'
          >
            <h2 className='text-3xl font-semibold'>{t('WHO.WHO')}</h2>
            <p className='text-muted-foreground mb-2'>{t('WHO.TEXT1')}</p>
            <p className='text-muted-foreground'>{t('WHO.TEXT2')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className='relative rounded-2xl bg-muted flex items-center justify-center'
          >
            <MapPinned className='w-24 h-24 text-primary' />
          </motion.div>
        </div>
      </article>

      <article className='bg-muted/40 py-5 max-w-6xl mx-auto'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-semibold text-center mb-14'>{t('VALUES.VALUES')}</h2>

          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-8'>
            <ValueCard icon={<ShieldCheck />} title={t('VALUES.TITLE1')} text={t('VALUES.TEXT1')} />
            <ValueCard icon={<Users />} title={t('VALUES.TITLE2')} text={t('VALUES.TEXT2')} />
            <ValueCard icon={<Globe />} title={t('VALUES.TITLE3')} text={t('VALUES.TEXT3')} />
            <ValueCard icon={<PhoneCall />} title={t('VALUES.TITLE4')} text={t('VALUES.TEXT4')} />
          </div>
        </div>
      </article>

      <div className='max-w-6xl mx-auto justify-items-center p-4 bg-white border border-black/15 dark:bg-black/60 rounded-lg mb-10'>
        <article className='container mx-auto px-4 py-5'>
          <div className='max-w-4xl mx-auto text-center'>
            <h2 className='text-3xl font-semibold mb-6'>{t('WHY.WHY')}</h2>
            <p className='text-muted-foreground mb-6'>{t('WHY.TEXT1')}</p>
            <p className='text-muted-foreground'>{t('WHY.TEXT2')}</p>
          </div>
        </article>

        <article className='bg-primary text-primary-foreground py-10'>
          <div className='container mx-auto px-4 text-center'>
            <h2 className='text-3xl font-semibold mb-6'>{t('READY.READY')}</h2>
            <p className='mb-8 text-primary-foreground/80'>{t('READY.TEXT')}</p>
            <button
              onClick={() => router.push('/tours')}
              className='relative p-0.5 mb-7 inline-flex items-center justify-center font-bold overflow-hidden transition-all hover:scale-[102%] rounded-md'
            >
              <span className='w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] absolute'></span>
              <span className='relative px-6 py-3 transition-all ease-out rounded-md duration-400'>
                <span className='relative text-white'>{t('READY.BUTTON')}</span>
              </span>
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
