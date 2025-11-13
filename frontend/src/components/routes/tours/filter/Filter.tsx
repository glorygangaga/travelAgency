import { Control, UseFormRegister, UseFormReset } from 'react-hook-form';
import { createContext } from 'react';

import { TourFilterType } from '@/shared/types/tour.types';
import { ActiveFilter } from './ActiveFilter';
import { FilterButtons } from './FilterButtons';
import { FilterSelect } from './FilterSelect';
import { FilterAdditional } from './FilterAdditional';
import { FilterQueryText } from './FilterQueryText';

import styles from './styles.module.css';

interface Props {
  register: UseFormRegister<TourFilterType>;
  control: Control<TourFilterType, any, TourFilterType>;
  filters: TourFilterType;
  reset: UseFormReset<TourFilterType>;
}

export const FilterContext = createContext<null | Props>(null);

export default function Filter({ register, control, filters, reset }: Props) {
  return (
    <FilterContext.Provider value={{ register, control, filters, reset }}>
      <div className={`${styles.maxHCalc} pr-2 overflow-y-auto relative`}>
        <ActiveFilter />
        <form className='grid gap-3'>
          <FilterButtons />
          <FilterQueryText />
          <FilterSelect />
          <FilterAdditional />
        </form>
      </div>
    </FilterContext.Provider>
  );
}
