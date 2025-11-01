import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';

import { Input } from '@/components/ui/Input';
import { countryService } from '@/services/country.service';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { countryType } from '@/shared/types/country.types';
import { ButtonSubmit } from '@/components/ui/button/ButtonSubmit';

interface Props {
  countryId: number;
}

export function CountryUpdate({ countryId }: Props) {
  const queryClient = useQueryClient();
  const { close } = useModal();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['country', countryId],
    queryFn: () => countryService.getCountry(countryId),
  });

  const { isPending, mutate } = useMutation({
    mutationKey: ['countries', countryId],
    mutationFn: (country: countryType) => countryService.updateCountry(country),
    onSuccess() {
      close();
      queryClient.invalidateQueries({
        queryKey: ['countries'],
      });
    },
    onError(error: any) {
      setError('root', {
        message: error?.response?.data?.message,
      });
    },
  });

  const {
    setError,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<countryType>({ mode: 'onSubmit' });

  const onSubmit: SubmitHandler<countryType> = (countryData) => {
    if (
      countryData.country_name === data?.country_name &&
      countryData.description === data.description
    )
      return;
    mutate({ ...countryData, country_id: countryId });
  };

  useEffect(() => {
    if (data) reset(data);
  }, [data]);

  return isLoading ? (
    <LoaderCircle className='transition-transform animate-spin duration-1000' />
  ) : data ? (
    <form className='grid gap-3 min-w-72' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-center font-bold text-3xl'>Update country</h1>
      {errors.root && (
        <div className='bg-black/10 mb-2 text-red-500 p-2 rounded-lg dark:bg-white/10 text-center'>
          <p>{errors.root.message}</p>
        </div>
      )}
      <Input
        placeholder='Country name'
        id='country'
        autoComplete='off'
        {...register('country_name', { required: true })}
      />
      <textarea
        id='description'
        placeholder='Country description'
        className='resize border border-white/30 rounded-lg p-2 outline-none max-h-[300px] min-h-[150px] min-w-[288px] max-w-[400px]'
        {...register('description', { required: true })}
      />
      <ButtonSubmit isPending={isPending} text='Update country' />
    </form>
  ) : (
    isError && <h1>Something went wrong</h1>
  );
}
