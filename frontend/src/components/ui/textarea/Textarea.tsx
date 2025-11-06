import { TextareaHTMLAttributes } from 'react';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      {...props}
      className={`${className} resize-y border dark:border-white/30 border-black/30 rounded-lg min-h-28 p-2 outline-none max-h-[300px] placeholder:text-white/60`}
    />
  );
}
