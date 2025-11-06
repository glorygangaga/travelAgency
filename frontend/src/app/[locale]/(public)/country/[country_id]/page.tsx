import { Country } from '@/components/routes/country/Country';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Country',
  description: 'Country',
};

export default async function Page({ params }: { params: { country_id: string } }) {
  const { country_id } = await params;

  return <Country country_id={country_id} />;
}
