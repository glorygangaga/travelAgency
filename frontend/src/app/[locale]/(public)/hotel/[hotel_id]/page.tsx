import { Hotel } from '@/components/routes/hotel/Hotel';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hotel',
  description: 'Hotel',
};

export default async function Page({ params }: { params: { hotel_id: string } }) {
  const { hotel_id } = await params;

  return (
    <section>
      <Hotel hotel_id={hotel_id} />
    </section>
  );
}
