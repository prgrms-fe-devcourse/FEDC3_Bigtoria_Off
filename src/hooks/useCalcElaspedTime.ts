const useCalcElaspedTime = () => {
  const calcCurrentToCreatedDate = (createdAt: string) => {
    if (createdAt === '') return '';

    const curTime = new Date();
    const createdTime = new Date(createdAt);

    const elapsedTime = curTime.getTime() - createdTime.getTime();

    const eDay = Math.floor(elapsedTime / (1000 * 60 * 60 * 24));
    const eHour = Math.floor(elapsedTime / (1000 * 60 * 60));
    const eMinutes = Math.floor(elapsedTime / (1000 * 60));

    if (eDay === 0) {
      if (eHour === 0) return `${eMinutes}분 전`;
      return `${eHour}시간 전`;
    }
    return `${eDay}일 전`;
  };

  return { calcCurrentToCreatedDate };
};

export default useCalcElaspedTime;
