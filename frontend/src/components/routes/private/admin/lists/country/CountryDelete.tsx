import { useMutation } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';

import { countryService } from '@/services/country.service';
import { countryType } from '@/shared/types/country.types';
import { useModal } from '@/components/ui/modal/ModalProvider';

interface Props {
  country: countryType;
}

export function CountryDelete({ country }: Props) {
  const { close } = useModal();
  const { isPending, mutate, isSuccess } = useMutation({
    mutationKey: ['country', country.country_id],
    mutationFn: () => countryService.deleteCountry(country.country_id),
  });

  useEffect(() => {
    if (!isSuccess) return;
    close();
  }, [isSuccess]);

  const handleSubmit = async () => mutate();
  return (
    <form className='grid justify-items-center gap-3' onSubmit={handleSubmit}>
      <h1 className='text-2xl font-bold'>You want to delete {country.country_name}?</h1>
      <button
        disabled={isPending}
        className='bg-white text-black w-full py-2 rounded-lg'
        type='submit'
      >
        {isPending ? (
          <LoaderCircle className='transition-transform animate-spin duration-1000' />
        ) : (
          'Yes'
        )}
      </button>
    </form>
  );
}
