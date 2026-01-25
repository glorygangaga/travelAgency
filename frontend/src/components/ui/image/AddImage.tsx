'use client';

import { UploadCloudIcon, X } from 'lucide-react';
import {
  useState,
  DragEvent,
  ChangeEvent,
  useEffect,
  Dispatch,
  SetStateAction,
  FormEvent,
} from 'react';
import { useMutation } from '@tanstack/react-query';

import { ButtonSubmit } from '../button/ButtonSubmit';
import { imageService } from '@/services/image.service';
import { useModal } from '../modal/ModalProvider';

type Props = {
  setId?: Dispatch<SetStateAction<number | null>>;
};

export type FileWithPreview = {
  file: File;
  preview: string;
};

type ImageType = {
  image: FileWithPreview | null;
  type: string;
  inDropZone: boolean;
};

export function AddImage({ setId }: Props) {
  const { close } = useModal();
  const [file, setFiles] = useState<ImageType>({ image: null, type: '', inDropZone: false });
  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setFiles((prev) => ({ type: 'AddToDropZone', inDropZone: true, image: prev?.image || null }));
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    setFiles((prev) => ({ type: 'AddToDropZone', inDropZone: false, image: prev?.image || null }));
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = Array.from(event.dataTransfer.files)[0];
    AddFile(file);
  };

  const AddImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!e.target.files || e.target.files?.length === 0) return;

    const file = Array.from(e.target.files)[0];
    AddFile(file);
  };

  const AddFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    if (file.size > 2097152) return;

    const filesWithPreview: FileWithPreview = {
      file,
      preview: URL.createObjectURL(file),
    };

    if (file) {
      setFiles({ type: 'AddToList', inDropZone: false, image: filesWithPreview });
    }
  };

  useEffect(() => {
    return () => {
      if (file?.image) {
        URL.revokeObjectURL(file.image.preview);
      }
    };
  }, [file]);

  const { isPending, mutate } = useMutation({
    mutationKey: ['image', file.image?.file.name],
    mutationFn: (data: File) => imageService.AddImage(data),
    onSuccess(data) {
      if (setId) setId(+data);
      close();
    },
    onError() {},
  });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file.image !== null) mutate(file.image.file);
  };

  return (
    <form className='grid gap-3 min-w-80' onSubmit={(e) => onSubmit(e)}>
      {file.image?.preview ? (
        <div className='relative'>
          <div className='absolute flex items-center justify-center left-0 right-0 bg-white dark:bg-black w-min h-auto border rounded-lg border-black dark:border-white'>
            <button
              className='flex items-center justify-center'
              onClick={(e) => {
                e.preventDefault();
                setFiles((prev) => ({ ...prev, image: null }));
              }}
            >
              <X />
            </button>
          </div>
          <img
            src={file.image.preview}
            alt='image preview'
            className='max-h-[300px] max-w-[600px] w-auto h-auto'
          />
        </div>
      ) : (
        <div
          className={`relative border p-2 rounded-lg dark:border-white/30 cursor-pointer grid justify-items-center gap-1 ${
            file.inDropZone ? 'border-dashed dark:bg-white/20' : ''
          }`}
          onDrop={(event) => handleDrop(event)}
          onDragOver={(event) => handleDragOver(event)}
          onDragEnter={(event) => handleDragEnter(event)}
        >
          <UploadCloudIcon />
          <p>Upload a photo</p>
          <p>Drag and drop files here</p>
          <input
            type='file'
            accept='image/*'
            className='w-full h-full opacity-0 absolute left-0 top-0'
            onChange={(e) => AddImage(e)}
          />
        </div>
      )}

      <ButtonSubmit text='add photo' isPending={isPending} />
    </form>
  );
}
