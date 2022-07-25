const formatTime = (time: number, div: number): string => {
  const str = Math.floor((time / div) % 60).toString();
  return (str.length > 1) ? str : '0' + str;
};

export { formatTime };
