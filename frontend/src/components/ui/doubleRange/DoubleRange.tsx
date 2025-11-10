'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  min: number;
  max: number;
}

export function DoubleRange({ min, max }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const [values, setValues] = useState({ minValue: min, maxValue: max });
  const [activeThumb, setActiveThumb] = useState<'min' | 'max' | null>(null);

  const getPercent = (value: number) => ((value - min) / (max - min)) * 100;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current || !activeThumb) return;
      const rect = ref.current.getBoundingClientRect();
      let percent = ((e.clientX - rect.left) / rect.width) * 100;
      if (percent < 0) percent = 0;
      else if (percent > 100) percent = 100;

      const newValue = Math.round((percent / 100) * (max - min) + min);

      if (activeThumb === 'min') {
        setValues((prev) => ({
          ...prev,
          minValue: Math.min(newValue, values.maxValue),
        }));
      } else if (activeThumb === 'max') {
        setValues((prev) => ({
          ...prev,
          maxValue: Math.max(newValue, values.minValue),
        }));
      }
    };

    const handleMouseUp = () => setActiveThumb(null);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseMove);

    window.addEventListener('mouseup', handleMouseUp, { once: true });
    window.addEventListener('mouseleave', handleMouseUp, { once: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseMove);

      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseUp);
    };
  }, [activeThumb, values.minValue, values.maxValue, min, max]);

  return (
    <div className='relative w-full h-5' ref={ref}>
      <span className='absolute left-0 top-1/2 -translate-y-1/2 bg-black/20 dark:bg-white/20 h-1.5 w-full rounded-lg' />

      <span
        className='absolute top-1/2 -translate-y-1/2 bg-blue-500 h-1.5 rounded-lg'
        style={{
          left: `${getPercent(values.minValue)}%`,
          width: `${getPercent(values.maxValue) - getPercent(values.minValue)}%`,
        }}
      />

      <div
        className='absolute w-5 h-5 bg-white rounded-full top-1/2 -translate-y-1/2 border shadow cursor-pointer'
        style={{ left: `calc(${getPercent(values.minValue)}% - 10px)` }}
        onMouseDown={() => setActiveThumb('min')}
      />
      <div
        className='absolute w-5 h-5 bg-white rounded-full top-1/2 -translate-y-1/2 border shadow cursor-pointer'
        style={{ left: `calc(${getPercent(values.maxValue)}% - 10px)` }}
        onMouseDown={() => setActiveThumb('max')}
      />
    </div>
  );
}
