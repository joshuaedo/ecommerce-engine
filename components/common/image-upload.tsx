'use client';

import useMounted from '@/hooks/use-mounted';
import { Button } from './button';
import { ImagePlus, Trash } from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export const ImageUpload = ({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) => {
  const isMounted = useMounted();

  const onUpload = (res: any) => {
    onChange(res.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className='mb-4 flex items-center gap-4'>
        {value.map((url) => (
          <div
            key={url}
            className='relative size-[200px] rounded-md overflow-hidden'
          >
            <div className='absolute top-2 right-2 z-10'>
              <Button
                type='button'
                variant='destructive'
                size='icon'
                onClick={() => onRemove(url)}
              >
                <Trash className='size-4' />
              </Button>
            </div>
            <Image
              fill
              src={url}
              alt='uploaded image'
              className='object-cover'
            />
          </div>
        ))}
      </div>
      <CldUploadWidget onUploadAdded={onUpload} uploadPreset='kk8azqqz'>
        {({ open }) => (
          <Button
            variant='secondary'
            type='button'
            onClick={() => open()}
            disabled={disabled}
          >
            <ImagePlus className='mr-2 size-4' />
            Upload an Image
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};
