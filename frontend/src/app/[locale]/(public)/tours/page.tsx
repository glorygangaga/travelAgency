import { Tours } from '@/components/routes/tours/Tours';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tours',
  description: 'Tours',
};

export default function Page() {
  return <Tours />;
}
