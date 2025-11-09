import { Country } from '@/components/routes/private/lists/country/Country';
import { NO_INDEX_PAGE } from '@/shared/data/routing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Country page',
  ...NO_INDEX_PAGE,
};

export default function Page() {
  return <Country />;
}
