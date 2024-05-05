const todayInUTC = (): Date => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return today;
};

export const calculateUpcomingDueDate = (): {
  startOfDay: Date;
  endOfDay: Date;
} => {
  const startOfDay = todayInUTC();
  startOfDay.setUTCDate(startOfDay.getUTCDate() + 2);

  const endOfDay = new Date(startOfDay);
  endOfDay.setUTCHours(23, 59, 59, 999);

  return { startOfDay, endOfDay };
};

export const calculateLateReturnDate = (): Date => {
  const lateReturnDate = todayInUTC();
  lateReturnDate.setUTCDate(lateReturnDate.getUTCDate() - 7);

  return lateReturnDate;
};
