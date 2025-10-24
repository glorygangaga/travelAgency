import { useMemo } from 'react';

import styles from './table.module.css';

interface Props {
  names: string[];
  skeleton: {
    isLoading: boolean;
    countRows: number;
  };
}

export function TableSkeleton({ skeleton, names }: Props) {
  const elems = useMemo(() => Array.from(Array(skeleton.countRows).keys()), []);

  return (
    <table className={styles.skeleton}>
      <thead>
        <tr>
          {names.map((elem) => (
            <th key={elem}>{elem}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {elems.map((ticket) => (
          <tr key={ticket} className={styles.ticket}>
            {names.map((elem) => (
              <td key={elem}>
                <p></p>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
