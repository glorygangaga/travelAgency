'use client';

import { useState, DragEvent, ChangeEvent, useEffect } from 'react';
import { UploadCloudIcon, X } from 'lucide-react';
import Link from 'next/link';

type PreviewImage = {
  file: File;
  preview: string;
};

interface Props {
  onChange: (files: File[]) => void;
  maxSizeMb?: number;
  multiple?: boolean;
}

export function AddImageAll({ onChange, multiple }: Props) {
  const [images, setImages] = useState<PreviewImage[]>([]);
  const [inDropZone, setInDropZone] = useState(false);

  const addFiles = (files: File[]) => {
    const valid = files.filter((f) => f.type.startsWith('image/') && f.size <= 2 * 1024 * 1024);

    const mapped = valid.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => {
      const next = multiple ? [...prev, ...mapped] : mapped;
      onChange(next.map((i) => i.file));
      return next;
    });
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setInDropZone(false);
    addFiles(Array.from(e.dataTransfer.files));
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    addFiles(Array.from(e.target.files));
  };

  const remove = (index: number) => {
    setImages((prev) => {
      const copy = [...prev];
      URL.revokeObjectURL(copy[index].preview);
      copy.splice(index, 1);
      onChange(copy.map((i) => i.file));
      return copy;
    });
  };

  useEffect(() => {
    return () => {
      images.forEach((i) => URL.revokeObjectURL(i.preview));
    };
  }, []);

  return (
    <div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setInDropZone(true)}
        onDragLeave={() => setInDropZone(false)}
        onDrop={onDrop}
        className={`relative border rounded-lg p-4 text-center cursor-pointer grid justify-items-center
          ${inDropZone ? 'border-dashed bg-black/5 dark:bg-white/10' : ''}
        `}
      >
        <UploadCloudIcon />
        <p>Upload a photo</p>
        <p>Drag and drop files here</p>
        <input
          type='file'
          accept='image/*'
          onChange={onInput}
          multiple
          className='absolute opacity-0 cursor-pointer left-0 top-0 w-full h-full'
        />
      </div>
      {images.length > 0 && (
        <div className='flex gap-2 flex-wrap'>
          {images.map((img, i) => (
            <div key={i} className='relative'>
              <Link
                className='absolute w-full h-full cursor-pointer left-0 top-0'
                href={img.preview}
                target='_blank'
              />
              <img src={img.preview} alt='preview' className='w-24 h-24 object-cover rounded' />
              <button
                type='button'
                onClick={() => remove(i)}
                className='absolute -top-2 -right-2 z-10 bg-black text-white rounded-full p-1'
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
