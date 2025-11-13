'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  min: number;
  max: number;
  value: { minValue?: number; maxValue?: number };
  onChange: (newValues: { minValue?: number; maxValue?: number }) => void;
}

export function DoubleRange({ min, max, value, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [activeThumb, setActiveThumb] = useState<'min' | 'max' | null>(null);

  const getPercent = (value: number) => ((value - min) / (max - min)) * 100;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || !activeThumb) return;
      const rect = ref.current.getBoundingClientRect();
      const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;

      const scrollLeft = ref.current.scrollLeft;
      let percent = ((clientX - rect.left + scrollLeft) / rect.width) * 100;

      if (percent < 0) percent = 0;
      else if (percent > 100) percent = 100;

      const newValue = Math.round((percent / 100) * (max - min) + min);

      if (activeThumb === 'min') {
        onChange({
          maxValue: value.maxValue,
          minValue: Math.min(newValue, value.maxValue ?? max),
        });
      } else if (activeThumb === 'max') {
        onChange({
          minValue: value.minValue,
          maxValue: Math.max(newValue, value.minValue ?? min),
        });
      }
    };

    const handleMouseUp = () => setActiveThumb(null);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp, { once: true });
    window.addEventListener('mouseleave', handleMouseUp, { once: true });

    window.addEventListener('touchmove', handleMouseMove, { passive: true });
    window.addEventListener('touchstart', handleMouseMove);
    window.addEventListener('touchend', handleMouseUp, { once: true });
    window.addEventListener('touchcancel', handleMouseUp, { once: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseUp);

      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchstart', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchcancel', handleMouseUp);
    };
  }, [activeThumb, value.minValue, value.maxValue, min, max]);

  return (
    <div className='relative w-full h-5' ref={ref}>
      <span className='absolute left-0 top-1/2 -translate-y-1/2 bg-black/20 dark:bg-white/20 h-1.5 w-full rounded-lg' />

      <span
        className='absolute top-1/2 -translate-y-1/2 bg-blue-500 h-1.5 rounded-lg'
        style={{
          left: `${getPercent(value.minValue ?? min)}%`,
          width: `${getPercent(value.maxValue ?? max) - getPercent(value.minValue ?? min)}%`,
        }}
      />

      <div
        className='absolute w-5 h-5 bg-white rounded-full top-1/2 -translate-y-1/2 border shadow cursor-pointer group'
        style={{ left: `calc(${getPercent(value.minValue ?? min)}% - 10px)` }}
        onMouseDown={() => setActiveThumb('min')}
        onTouchStart={() => setActiveThumb('min')}
      >
        <div className='absolute left-1/2 select-none -translate-x-1/2 bottom-[120%] border dark:border-white/25 invisible opacity-0 transition-opacity group-hover:opacity-100 group-hover:visible dark:bg-black p-2 rounded-lg'>
          {value.minValue ?? min}
        </div>
      </div>
      <div
        className='absolute w-5 h-5 bg-white rounded-full top-1/2 -translate-y-1/2 border shadow cursor-pointer group'
        style={{ left: `calc(${getPercent(value.maxValue ?? max)}% - 10px)` }}
        onMouseDown={() => setActiveThumb('max')}
        onTouchStart={() => setActiveThumb('max')}
      >
        <div className='absolute left-1/2 select-none -translate-x-1/2 bottom-[120%] border dark:border-white/25 invisible opacity-0 transition-opacity group-hover:opacity-100 group-hover:visible dark:bg-black p-2 rounded-lg'>
          {value.maxValue ?? max}
        </div>
      </div>
    </div>
  );
}
