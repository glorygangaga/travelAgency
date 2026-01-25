'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { Edit2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { useUserStore } from '@/store/userStore';
import { Loading } from '@/components/ui/loading/Loading';
import { imageService } from '@/services/image.service';
import { useModal } from '@/components/ui/modal/ModalProvider';
import { AddImage } from '@/components/ui/image/AddImage';
import { LoadImage } from '@/components/ui/image/LoadImage';

interface Props {}

export function UserProfileImage({}: Props) {
  const [id, setId] = useState<number | null>(null);
  const { open } = useModal();
  const { imageId, user, setImage } = useUserStore();

  const { isLoading, refetch } = useQuery({
    queryKey: ['image', imageId ?? -1],
    queryFn: () => imageService.GetImage(imageId),
    enabled: imageId !== null,
  });

  useEffect(() => {
    if (id === null) return;
    setImage(id);
    refetch();
  }, [id]);

  return (
    <div className='w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center group relative'>
      {imageId === null && user ? (
        <p className='font-bold text-2xl transition-opacity group-hover:opacity-0 group-hover:invisible'>
          {user.username ? user.username[0] : user.email.split('@')[0][0]}
        </p>
      ) : isLoading ? (
        <Loading />
      ) : (
        imageId && <LoadImage image_id={imageId} className='rounded-full' />
      )}
      <button
        className='opacity-0 invisible transition-opacity group-hover:opacity-100 w-full h-full group-hover:visible absolute left-0 top-0 flex items-center justify-center text-white'
        onClick={() => {
          open(<AddImage setId={setId} />);
        }}
      >
        <Edit2 className='' />
      </button>
    </div>
  );
}
