import { useMutation } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { FormEvent, useState } from 'react';

import { countryService } from '@/services/country.service';
import { countryType } from '@/shared/types/country.types';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { ButtonSubmit } from '@/components/ui/button/ButtonSubmit';

interface Props {
  country: countryType;
}

export function CountryDelete({ country }: Props) {
  const { close } = useModal();
  const [error, setError] = useState('');

  const { isPending, mutate } = useMutation({
    mutationKey: ['country', country.country_id],
    mutationFn: () => countryService.deleteCountry(country.country_id),
    onSuccess() {
      close();
    },
    onError(error: any) {
      setError(error?.response?.data?.message);
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };
  return (
    <form className='grid justify-items-center gap-3' onSubmit={(e) => handleSubmit(e)}>
      <h1 className='text-2xl font-bold'>You want to delete {country.country_name}?</h1>
      {error && (
        <div className='bg-black/10 mb-2 text-red-500 p-2 rounded-lg dark:bg-white/10 text-center'>
          <p>{error}</p>
        </div>
      )}
      <ButtonSubmit isPending={isPending} text='Yes' />
    </form>
  );
}
