const EXPIRED_LIMIT_DATE = 5;

export const calcCreatedToCurrentDate = (createdAt: string) => {
  if (createdAt === '') return '';

  const curTime = new Date();
  const createdTime = new Date(createdAt);

  const elapsedTime = curTime.getTime() - createdTime.getTime();

  const eDay = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
  const eHour = Math.floor(elapsedTime / (1000 * 60 * 60));
  const eMinutes = Math.floor(elapsedTime / (1000 * 60));

  if (elapsedTime < 0 || eMinutes === 0) return '방금 전';

  if (eDay === 0) {
    if (eHour === 0) return `${eMinutes}분 전`;
    return `${eHour}시간 전`;
  }
  return `${eDay}일 전`;
};

export const isExpiredDate = (createdAt: string) => {
  if (createdAt === '') return '';

  const curTime = new Date();
  const createdTime = new Date(createdAt);

  const elapsedTime = curTime.getTime() - createdTime.getTime();

  const eDay = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));

  if (eDay >= EXPIRED_LIMIT_DATE) return true;
  return false;
};
