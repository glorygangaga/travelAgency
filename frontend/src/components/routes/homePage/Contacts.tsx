import { LucideIcon, Phone, Mail, MapPin } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

const infos: { data: string[]; icon: LucideIcon }[] = [
  { data: ['+7 (912) 345-6789', '+1 (803) 327-7549', '+34 (680) 926-0823'], icon: Phone },
  { data: ['travel@gmail.com', 'travelagency@gmail.com'], icon: Mail },
  {
    data: [
      '19, Московская улица, г. Москва',
      '31 Valley View Drive Brooklyn, NY 11224',
      'Plaza de España 90, Madrid 12740',
    ],
    icon: MapPin,
  },
];

export async function Contacts() {
  const t = await getTranslations();

  return (
    <section className='mb-7 max-w-4xl w-fit mx-auto' id='Contacts'>
      <h1 className='font-bold text-center text-4xl mb-2'>{t('CONTACTS')}</h1>
      <ul className='dark:bg-black/60 rounded-lg grid grid-cols-3 p-5 gap-y-3 max-lg:grid-cols-1 shadow-[10px_10px_50px_0px_rgba(0,0,0,0.20)]'>
        {infos.map((info, index) => (
          <li key={index} className='flex gap-3 justify-center items-center'>
            <info.icon width={24} className='min-w-6' />
            <ul className='grid gap-2'>
              {info.data.map((text) => (
                <li
                  key={text}
                  className={`${
                    info.data.length < 2 ? '' : "before:content-['•'] before:mr-2"
                  } text-sm`}
                >
                  {text}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
