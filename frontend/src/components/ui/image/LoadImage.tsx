'use client';

import { useQuery } from '@tanstack/react-query';
import { ImgHTMLAttributes } from 'react';

import { imageService } from '@/services/image.service';
import { Loading } from '../loading/Loading';

interface Props {
  image_id: number;
  w?: number;
  h?: number;
}

type ImageProps = ImgHTMLAttributes<HTMLImageElement> & Props;

export function LoadImage({ image_id, w, h, className, ...props }: ImageProps) {
  const { data: blob, isLoading } = useQuery({
    queryKey: ['image', image_id],
    queryFn: () => imageService.GetImage(image_id),
  });

  if (isLoading) return <Loading />;
  if (!blob) return <div className='w-full h-full bg-red-300'>No Image</div>;

  const url = URL.createObjectURL(blob);

  return (
    <img
      src={url}
      alt='image'
      className={`${className ?? ''} w-full h-full object-cover`}
      width={w}
      height={h}
      onLoad={() => URL.revokeObjectURL(url)}
      {...props}
    />
  );
}
