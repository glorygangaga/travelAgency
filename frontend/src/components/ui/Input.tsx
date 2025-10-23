'use client';

import { forwardRef, type InputHTMLAttributes, type ReactNode, useState } from 'react';
import { Eye, EyeOff, X } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  clearable?: boolean;
  passwordToggle?: boolean;
  inputClassname?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      clearable,
      passwordToggle,
      type,
      className,
      inputClassname,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
      passwordToggle && type === 'password' ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className={`relative ${className}`}>
        {label && (
          <label
            className={`${inputClassname} mb-1 block text-xs font-medium text-black dark:text-white absolute -top-4`}
            htmlFor={props.id}
          >
            {label}
          </label>
        )}

        <div className=''>
          {leftIcon && (
            <span className='h-full absolute top-1/2 -translate-y-1/2 left-0 flex justify-center items-center w-10 text-black/60 dark:text-white/50'>
              {leftIcon}
            </span>
          )}

          <div className='relative'>
            <input
              ref={ref}
              type={inputType}
              className={`${inputClassname} w-full rounded-xl border border-black/40 dark:border-white/40 text-black dark:text-white transition-all hover:border-blue-400 bg-transparent py-2 px-3 text-sm outline-none placeholder:text-black/60 dark:placeholder:text-white/60 ${
                leftIcon ? 'pl-8' : ''
              } ${rightIcon ? 'pr-8' : ''}`}
              {...props}
            />
            {passwordToggle && type === 'password' && (
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-0 w-10 flex justify-center items-center top-1/2 -translate-y-1/2 h-full outline-none transition-colors hover:bg-black/10 dark:hover:bg-white/20 focus-within:bg-black/10 focus-within:dark:bg-white/20 rounded-tr-lg rounded-br-lg'
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            )}
          </div>

          {clearable && props.value && (
            <button
              type='button'
              onClick={() => props.onChange?.({ target: { value: '' } } as any)}
              className='ml-2 text-gray-400 hover:text-gray-600'
            >
              <X size={16} />
            </button>
          )}

          {rightIcon && (
            <span className='h-full absolute top-1/2 -translate-y-1/2 right-0 flex justify-center items-center w-10 text-black/60 dark:text-white/50'>
              {rightIcon}
            </span>
          )}
        </div>

        {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
