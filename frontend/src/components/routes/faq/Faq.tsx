import { FAQ_DATA } from '@/shared/data/names.data';
import { ChevronDown } from 'lucide-react';

export function Faq() {
  return (
    <section className='max-w-4xl mb-7 mx-auto dark:bg-black/60 bg-white/60 p-4 rounded-lg backdrop-blur-3xl'>
      <h1 className='text-center text-4xl font-bold mb-5 '>Частозадаваемые вопросы</h1>
      <ul className='grid gap-3 mb-4'>
        {FAQ_DATA.map((faq) => (
          <li key={faq.question} className='bg-black/10 p-3 rounded-lg dark:bg-white/10'>
            <details className='group overflow-hidden transition-all duration-1000'>
              <summary className='flex justify-between items-center select-none cursor-pointer marker:content-none transition-margin'>
                <h1 className='group-open:mb-2 font-bold text-xl'>{faq.question}</h1>
                <ChevronDown className='transition-transform group-open:rotate-180 group-hover:translate-y-1' />
              </summary>
              <div className='overflow-hidden transition-all max-h-0 group-open:max-h-96 dark:bg-black/20 bg-white/20 p-2 rounded-lg'>
                {faq.answer.map((answ) => (
                  <p key={answ} className='before:content-["•"] before:mr-2'>
                    {answ}
                  </p>
                ))}
              </div>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
