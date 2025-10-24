import { ReactNode } from 'react';

import styles from './table.module.css';
import { TableSkeleton } from './TableSkeleton';

interface Props {
  names: string[];
  tbodyChild: ReactNode;
  skeleton?: {
    isLoading: boolean;
    countRows: number;
  };
}

export function Table({ tbodyChild, names, skeleton }: Props) {
  if (skeleton?.isLoading) return <TableSkeleton skeleton={skeleton} names={names} />;

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {names.map((elem) => (
            <th key={elem}>{elem}</th>
          ))}
        </tr>
      </thead>
      <tbody>{tbodyChild}</tbody>
    </table>
  );
}
