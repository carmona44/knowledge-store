export const checkIsOnTime = (dueDate: Date): boolean => {
  const today = new Date();

  return (
    dueDate.getUTCDate() === today.getUTCDate() &&
    dueDate.getUTCMonth() === today.getUTCMonth() &&
    dueDate.getUTCFullYear() === today.getUTCFullYear()
  );
};
