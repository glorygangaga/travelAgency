'use client';

import { ArrowRight, MoveLeft, MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState, useMemo } from 'react';

interface CalendarProps {
  start_date: string | Date;
  end_date: string | Date;
  showInfo?: boolean;
}

export default function Calendar({ start_date, end_date, showInfo = true }: CalendarProps) {
  const t = useTranslations('Calendar');

  const [currentDate, setCurrentDate] = useState(new Date(start_date));

  const start = new Date(start_date);
  const end = new Date(end_date);

  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  const weekdays: string[] = Array.from({ length: 7 }, (_, i) => t(`weekday_${i}`));

  const firstDay = new Date(year, currentDate.getMonth(), 1);
  const lastDay = new Date(year, currentDate.getMonth() + 1, 0);
  const startDayOfWeek = (firstDay.getDay() + 6) % 7;
  const totalDays = lastDay.getDate();

  const days: (number | null)[] = useMemo(() => {
    const arr: (number | null)[] = [];
    for (let i = 0; i < startDayOfWeek; i++) arr.push(null);
    for (let i = 1; i <= totalDays; i++) arr.push(i);
    return arr;
  }, [currentDate]);

  const today = new Date();

  function changeMonth(offset: number) {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + offset);
    setCurrentDate(newDate);
  }

  function isInRange(day: number): boolean {
    const d = new Date(year, currentDate.getMonth(), day);
    return d >= start && d <= end;
  }

  function isSameDate(d1: Date, d2: Date) {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  }

  return (
    <div className='flex flex-col items-center w-fit max-w-[320px] p-4 bg-white border border-black/20 dark:bg-zinc-900 rounded-2xl shadow'>
      <div className='flex justify-between items-center w-full mb-3'>
        <button onClick={() => changeMonth(-1)} className='px-2 text-xl'>
          <MoveLeft />
        </button>
        <h2 className='font-semibold capitalize'>
          {monthName} {year}
        </h2>
        <button onClick={() => changeMonth(1)} className='px-2 text-xl'>
          <MoveRight />
        </button>
      </div>

      <div className='flex w-full justify-between gap-1  text-sm font-medium text-gray-500'>
        {weekdays.map((d) => (
          <div key={d} className='w-10 text-center'>
            {d}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-1 w-full'>
        {days.map((day, i) => {
          if (day === null) return <div key={i}></div>;

          const d = new Date(year, currentDate.getMonth(), day);
          const isStart = isSameDate(d, start);
          const isEnd = isSameDate(d, end);
          const inRange = isInRange(day);

          const isToday =
            d.getDate() === today.getDate() &&
            d.getMonth() === today.getMonth() &&
            d.getFullYear() === today.getFullYear();

          let classes = 'p-1 rounded-md text-center transition select-none ';

          if (inRange || isStart) classes += 'bg-blue-100 dark:bg-blue-900/40 ';
          if (isToday && !inRange) classes += 'border border-blue-600 text-blue-600 ';
          if (!inRange && !isStart && !isEnd && !isToday)
            classes += 'hover:bg-gray-100 dark:hover:bg-zinc-800 ';

          return (
            <div key={i} className={classes}>
              {day}
            </div>
          );
        })}
      </div>

      {showInfo && (
        <div className='mt-1 text-sm text-gray-500 text-center'>
          <p className='flex items-center gap-1.5'>
            <span>{start.toLocaleDateString()}</span>
            <ArrowRight className='w-4' />
            <span>{end.toLocaleDateString()}</span>
          </p>
          <p>
            {t('DURATION')}: {(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)} {t('DAYS')}
          </p>
        </div>
      )}
    </div>
  );
}
