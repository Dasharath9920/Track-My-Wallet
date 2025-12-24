export const getNextDueDate = (day: number) => {
  const date = new Date();
  const today = date.getDate();

  if (today == day - 1) return 'Tomorrow';
  if (today == day) return 'Today';

  if (today < day) {
    return date.toLocaleString('defualt', { month: 'short' }) + ', ' + day;
  } else {
    const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    return nextMonth.toLocaleString('defualt', { month: 'short' }) + ', ' + day;
  }
}