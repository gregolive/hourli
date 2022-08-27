import { useState, useEffect, ReactElement } from 'react';
import { Shift } from '../../../../../types';
import { timeToDate, formatPayPeriod } from '../../../../assets/helpers/dateTime';

interface TableProps {
  shifts: Shift[],
  payPeriods: any[],
};

const Table = ({ shifts, payPeriods }: TableProps): ReactElement => {
  console.log(payPeriods)
  return (
    <>
      {payPeriods.map((period, index) =>
        <p key={index}>
          {period.toString()}
        </p>
      )}
    </>
  );
};

export default Table;
