import { format } from 'date-fns';
import { Shift } from '../../../types';

// Time functions

const formatTime = (time: number, div: number): string => {
  const str = Math.floor((time / div) % 60).toString();
  return (str.length > 1) ? str : '0' + str;
};

const formatMins = (time: number): string => formatTime(time, 60000);

const formatHours = (time: number): string => formatTime(time, 3600000);

const formatClock = (time: number): string => `${formatHours(time)}:${formatMins(time)}`;

// Date functions

const timeToDate = (time: number): string => format(new Date(time), 'EEE, LLL dd');

const treatAsUTC = (date: number): number => {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return Number(result);
};

const daysBetween = (startDate: number, endDate: number): number => {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.ceil((treatAsUTC(endDate) - treatAsUTC(startDate)) / msPerDay);
};

const weeklyPeriods = (startDate: number, days: number, weeks: number): Date[][] => {
  const payPeriods = [];
  const periodCount = Math.ceil(days / (7 * weeks));
  for (let i = 0; i < periodCount; i++) {
    const currPeriod = [];
    for (let j = 0; j < (7 * weeks); j++) {
      const date = new Date(startDate + 24 * 60 * 60 * 1000 * (i * 7 + j));
      currPeriod.push(date);
    }
    payPeriods.push(currPeriod);
  }
  return payPeriods;
};

const monthDiff = (start: number, end: number = Date.now()): number => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return 1 + startDate.getMonth() - endDate.getMonth() + (12 * (startDate.getFullYear() - endDate.getFullYear()));
}

const monthlyPeriods = (startDate: number): any[] => {
  const payPeriods = [];
  const periodCount = monthDiff(startDate);
  let currMonth = new Date(startDate).getMonth();
  let currYear = new Date(startDate).getFullYear();
  let countedDays = 0;
  for (let i = 0; i < periodCount; i++) {
    const currPeriod = [];
    const days = new Date(currYear, currMonth, 0).getDate();
    for (let j = 1; j <= days; j++) {
      const date = new Date(startDate + 24 * 60 * 60 * 1000 * (j + countedDays));
      currPeriod.push(date);
    }
    payPeriods.push(currPeriod);
    currMonth = (currMonth >= 12) ? 1 : currMonth + 1;
    currYear = (currMonth === 1) ? currYear + 1 : currYear;
    countedDays += currPeriod.length;
  }
  return payPeriods;
};

const getPayPeriods = (startDate: number, periodType: string): any[] => {
  const days = daysBetween(startDate, Date.now());
  switch (periodType) {
    case 'Weekly':
      return weeklyPeriods(startDate, days, 1);
    case 'Biweeklys':
      return weeklyPeriods(startDate, days, 2);
    default:
      return monthlyPeriods(startDate);
  }
};

const formatPayPeriod = (shifts: Shift[], periodType: any): any[] => {
  const periods = getPayPeriods(shifts[0].start, periodType);
  return periods;
};

export { formatMins, formatHours, formatClock, timeToDate, formatPayPeriod };
