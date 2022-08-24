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

const timeToDate = (time: number) => format(new Date(time), 'EEE, LLL dd');

const treatAsUTC = (date: number): number => {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return Number(result);
};

const daysBetween = (startDate: number, endDate: number): number => {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.ceil((treatAsUTC(endDate) - treatAsUTC(startDate)) / msPerDay);
};

const weeklyPeriods = (startDate: number, days: number, weeks: number): any[] => {
  const payPeriods = [];
  const periodCount = Math.ceil(days / (7 * weeks));
  for (let i = 0; i < periodCount; i++) {
    for (let j = 0; j < (7 * weeks); j++) {
      const date = new Date(startDate + 24 * 60 * 60 * 1000 * (i * 7 + j));
      payPeriods.push(date);
    }
  }
  return payPeriods;
};

const monthlyPeriods = (days: number): any[] => {
  return []
};

const payPeriodCount = (startDate: number, periodType: string): any[] => {
  const days = daysBetween(startDate, Date.now());
  switch (periodType) {
    case 'Weekly':
      return weeklyPeriods(startDate, days, 1);
    case 'Biweekly':
      return weeklyPeriods(startDate, days, 2);
    default:
      return monthlyPeriods(days);
  }
};

const formatPayPeriod = (shifts: Shift[], periodType: any): any[] => {
  const periods = payPeriodCount(shifts[0].start, periodType);
  return periods;
};

export { formatMins, formatHours, formatClock, timeToDate, formatPayPeriod };
