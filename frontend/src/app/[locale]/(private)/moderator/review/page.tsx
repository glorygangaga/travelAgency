import { Reviews } from '@/components/routes/private/moderator/lists/review/Reviews';
import { NO_INDEX_PAGE } from '@/shared/data/routing';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reviews',
  ...NO_INDEX_PAGE,
};

export default function Page() {
  return <Reviews />;
}
