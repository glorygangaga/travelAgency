import { Tour } from '@/components/routes/tour/Tour';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tour',
  description: 'tour',
};

export default async function Page({ params }: { params: { tour_id: string } }) {
  const { tour_id } = await params;

  return (
    <section>
      <Tour tour_id={tour_id} />
    </section>
  );
}
