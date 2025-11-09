import { FAQ_DATA, FAQ_DATA_EN, FAQ_DATA_ES } from '@/shared/data/names.data';
import { FaqData } from './FaqData';

interface FaqPageProps {
  params: { locale: string };
}

export async function Faq({ params }: FaqPageProps) {
  const { locale } = await params;

  const data =
    locale === 'en' ? FAQ_DATA_EN : locale === 'es' ? FAQ_DATA_ES : locale === 'ru' ? FAQ_DATA : [];

  const title =
    locale === 'en'
      ? 'Frequently Asked Questions'
      : locale === 'es'
      ? 'Preguntas Frecuentes'
      : 'Частозадаваемые вопросы';

  return (
    <section className='max-w-4xl mb-7 mx-auto dark:bg-black/60 bg-white/60 p-4 rounded-lg backdrop-blur-3xl'>
      <h1 className='text-center text-4xl font-bold mb-5 '>{title}</h1>
      <ul className='grid gap-3 mb-4'>
        {data.map((faq) => (
          <FaqData faq={faq} key={faq.question} />
        ))}
      </ul>
    </section>
  );
}
