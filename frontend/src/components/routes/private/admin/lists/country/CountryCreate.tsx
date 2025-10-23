import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoaderCircle } from 'lucide-react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Input } from '@/components/ui/Input';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { countryService } from '@/services/country.service';
import { createCountryType } from '@/shared/types/country.types';

export function CountryCreate() {
  const queryClient = useQueryClient();
  const { close } = useModal();
  const { isPending, mutate } = useMutation({
    mutationKey: ['countries'],
    mutationFn: (data: createCountryType) => countryService.createCountry(data),
    onSuccess() {
      reset();
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
    register,
    setError,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<createCountryType>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<createCountryType> = (data) => {
    mutate(data);
  };

  return (
    <form className='grid gap-3 min-w-72' onSubmit={handleSubmit(onSubmit)}>
      <h1 className='text-center font-bold text-3xl'>Create country</h1>
      {errors.root && (
        <div className='bg-black/10 mb-2 text-red-500 p-2 rounded-lg dark:bg-white/10 text-center'>
          <p>{errors.root.message}</p>
        </div>
      )}
      <Input
        placeholder='Country name'
        id='country_name'
        autoComplete='off'
        {...register('country_name', { required: true })}
      />
      <textarea
        id='description'
        placeholder='Country description'
        className='resize border border-white/30 rounded-lg p-2 outline-none max-h-[300px] min-h-[150px] min-w-[288px] max-w-[400px]'
        {...register('description', { required: true })}
      />
      <button disabled={isPending} type='submit' className='bg-white text-black p-2 rounded-lg'>
        {isPending ? (
          <LoaderCircle className='transition-transform animate-spin duration-1000' />
        ) : (
          'Create country'
        )}
      </button>
    </form>
  );
}
