import type { AsideTypes } from '../types/aside.types';
import { lazy } from 'react';

const Login = lazy(() => import('@/components/Auth/Login'));

import {
  CircleQuestionMark,
  CircleUser,
  Compass,
  type LucideIcon,
  Settings,
  TableOfContents,
  GalleryVerticalEnd,
} from 'lucide-react';

export const ASIDE_MAIN_DATA: AsideTypes = [
  { icon: 'Compass', text: 'Подбор тура', href: '/#Find' },
  { icon: 'GalleryVerticalEnd', text: 'Галерея', href: '/#Gallary' },
  { icon: 'TableOfContents', text: 'Деятельность', href: '/#About' },
  { icon: 'CircleUser', text: 'Аккаунт', element: <Login /> },
  {
    icon: 'Settings',
    text: 'Настройки',
    isNew: true,
    extentions: [
      {
        element: (
          <div className='flex items-center flex-col gap-2 w-48'>
            <h1 className='text-xl font-bold'>Тема</h1>
          </div>
        ),
        data: 'Тема',
      },
      {
        element: (
          <div className='flex items-center flex-col gap-2 w-48'>
            <h1 className='text-xl font-bold'>Язык</h1>
          </div>
        ),
        data: 'Язык',
      },
    ],
  },
  { icon: 'CircleQuestionMark', text: 'FAQ', href: '/faq' },
];

export const iconMap: Record<string, LucideIcon> = {
  Compass,
  Settings,
  CircleUser,
  GalleryVerticalEnd,
  TableOfContents,
  CircleQuestionMark,
};
