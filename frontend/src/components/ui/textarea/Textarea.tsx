import { TextareaHTMLAttributes } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea(props: TextareaProps) {
  return (
    <textarea
      {...props}
      className='resize-y border border-white/30 rounded-lg min-h-28 p-2 outline-none max-h-[300px] placeholder:text-white/60'
    />
  );
}
