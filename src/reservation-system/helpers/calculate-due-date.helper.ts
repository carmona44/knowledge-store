export const calculateDueDate = (): Date => {
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 15);
  dueDate.setHours(14, 0, 0, 0);
  return dueDate;
};
