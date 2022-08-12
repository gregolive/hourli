import { format } from 'date-fns';

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

export { formatMins, formatHours, formatClock, timeToDate };
