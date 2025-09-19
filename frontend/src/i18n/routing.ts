import { locales } from '@/shared/data/locales.data';
import {defineRouting} from 'next-intl/routing';
 
export const routing = defineRouting({
  locales,
  defaultLocale: 'ru',
  localePrefix: 'always'
});

