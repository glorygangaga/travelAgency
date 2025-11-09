import { Hotel } from '@/components/routes/private/lists/hotel/Hotel';
import { NO_INDEX_PAGE } from '@/shared/data/routing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hotel page',
  ...NO_INDEX_PAGE,
};

export default function Page() {
  return <Hotel />;
}
