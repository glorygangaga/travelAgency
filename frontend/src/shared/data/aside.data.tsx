import type { AsideTypes } from '../types/aside.types';
import { lazy, Suspense } from 'react';

const Login = lazy(() => import('@/components/Auth/login/Login'));
const Language = lazy(() => import('@/components/language/Language'));
import { Theme } from '@/components/Theme/Theme';

import {
  CircleQuestionMark,
  CircleUser,
  Compass,
  type LucideIcon,
  Settings,
  TableOfContents,
  GalleryVerticalEnd,
} from 'lucide-react';
import { LoginSkeleton } from '@/components/Auth/login/LoginSkeleton';
import { LanguageSkeleton } from '@/components/language/LanguageSkeleton';

export const iconMap: Record<string, LucideIcon> = {
  Compass,
  Settings,
  CircleUser,
  GalleryVerticalEnd,
  TableOfContents,
  CircleQuestionMark,
};

export const getAsideData = (t: (key: string) => string): AsideTypes => [
  {
    icon: 'Compass',
    text: t('ASIDE.Selection'),
    href: '/find',
  },
  {
    icon: 'GalleryVerticalEnd',
    text: t('ASIDE.Gallary'),
    href: '/gallary',
  },
  {
    icon: 'TableOfContents',
    text: t('ASIDE.Activity'),
    href: '/about',
  },
  {
    icon: 'CircleUser',
    text: t('ASIDE.Account'),
    element: (
      <Suspense fallback={<LoginSkeleton />}>
        <Login />
      </Suspense>
    ),
  },
  {
    icon: 'Settings',
    text: t('ASIDE.Settings'),
    isNew: true,
    extentions: [
      {
        element: (
          <div className='flex items-center flex-col gap-2'>
            <h1 className='text-xl font-bold'>{t('ASIDE.Theme')}</h1>
            <Theme />
          </div>
        ),
        data: t('ASIDE.Theme'),
      },
      {
        element: (
          <Suspense fallback={<LanguageSkeleton />}>
            <Language />
          </Suspense>
        ),
        data: t('ASIDE.Language'),
      },
    ],
  },
  {
    icon: 'CircleQuestionMark',
    text: t('ASIDE.Faq'),
    href: '/faq',
  },
];
