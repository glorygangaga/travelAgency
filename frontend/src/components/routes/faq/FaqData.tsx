import { ChevronDown } from 'lucide-react';

interface Props {
  faq: {
    question: string;
    answer: string[];
  };
}

export function FaqData({ faq }: Props) {
  return (
    <li className='bg-black/10 p-3 rounded-lg dark:bg-white/10'>
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
  );
}
