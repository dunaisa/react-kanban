export const formatTimeAgo = (date: Date | string | number): string => {
  const now = new Date().getTime();
  const inputTime = new Date(date).getTime(); // автоматическое преобразование
  const seconds = Math.floor((now - inputTime) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} д. назад`;
  if (hours > 0) return `${hours} ч. назад`;
  if (minutes > 0) return `${minutes} минут назад`;
  return 'Только что';
};