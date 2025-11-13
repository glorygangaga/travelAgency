'use client';

import { ArrowRight, MoveLeft, MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { useState, useMemo } from 'react';

interface CalendarProps {
  start_date: string | Date;
  end_date: string | Date;
  showInfo?: boolean;
  onChange?: (newValues: { minDate?: string; maxDate?: string }) => void;
}

export default function Calendar({
  start_date,
  end_date,
  showInfo = true,
  onChange,
}: CalendarProps) {
  const t = useTranslations('Calendar');
  const [selectedRange, setSelectedRange] = useState<{ start?: Date; end?: Date }>({
    start: new Date(start_date),
    end: new Date(end_date),
  });

  const [currentDate, setCurrentDate] = useState(new Date(start_date));

  const start = new Date(start_date);
  const end = new Date(end_date);

  const monthName = t(`MONTH_${currentDate.getMonth()}`);
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

  function formatDate(d: Date) {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <div className='flex flex-col items-center w-fit max-w-[320px] p-4 bg-white border border-black/20 dark:bg-zinc-900 rounded-2xl shadow'>
      <div className='flex justify-between items-center w-full mb-3'>
        <button type='button' onClick={() => changeMonth(-1)} className='px-2 text-xl'>
          <MoveLeft />
        </button>
        <h2 className='font-semibold capitalize'>
          {monthName} {year}
        </h2>
        <button type='button' onClick={() => changeMonth(1)} className='px-2 text-xl'>
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
          if (onChange && d < today) classes += 'opacity-50 ';
          else classes += 'cursor-pointer ';
          if (!inRange && !isStart && !isEnd && !isToday)
            classes += 'hover:bg-gray-100 dark:hover:bg-zinc-800';

          return (
            <div
              key={i}
              className={classes}
              onClick={() => {
                const clickedDate = new Date(d);
                clickedDate.setHours(0, 0, 0, 0);

                const todayDate = new Date(today);
                todayDate.setHours(0, 0, 0, 0);
                if (clickedDate < todayDate) return;

                if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
                  setSelectedRange({ start: clickedDate });
                  onChange?.({ minDate: formatDate(clickedDate), maxDate: undefined });
                } else {
                  const startDate = selectedRange.start;
                  const endDate = clickedDate >= startDate ? clickedDate : startDate;
                  const min = clickedDate <= startDate ? clickedDate : startDate;

                  setSelectedRange({ start: min, end: endDate });
                  onChange?.({
                    minDate: formatDate(min),
                    maxDate: formatDate(endDate),
                  });
                }
              }}
            >
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
