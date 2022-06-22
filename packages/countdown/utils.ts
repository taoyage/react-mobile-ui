const DAY_MILLISECONDS = 24 * 60 * 60 * 1000; // 一天毫秒数
const HOURS_MILLISECONDS = 60 * 60 * 1000; // 小时毫秒
const MINUTES_MILLISECONDS = 60 * 1000; // 分钟毫秒

const formatTime = (val: number): string => {
  if (val <= 0) return '00';
  return val < 10 ? `0${val}` : `${val}`;
};

const getTime = (format: string, timeLeft: number) => {
  let d = timeLeft;
  let [_, s, m, h] = [1000, 60, 60, 24].map((unit) => {
    let num = d % unit;
    d = Math.floor(d / unit);
    return num;
  });

  // [1毫秒，3秒，0, 0]

  if (timeLeft > DAY_MILLISECONDS && format.indexOf('d') === -1) {
    h += d * 24;
  }

  if (timeLeft > HOURS_MILLISECONDS && format.indexOf('h') === -1) {
    m += h * 60;
  }

  if (timeLeft > MINUTES_MILLISECONDS && format.indexOf('m') === -1) {
    s += m * 60;
  }

  return {
    dd: formatTime(d),
    hh: formatTime(h),
    mm: formatTime(m),
    ss: formatTime(s),
    d,
    h,
    m,
    s,
  };
};

type formatType = 'dd' | 'hh' | 'mm' | 'ss';

export const getTimeItems = (format: string, timeLeft: number) => {
  // 匹配format
  const timeArr: Array<string> = format!.match(/[a-zA-Z]{1,3}/g) || [];
  // 匹配字符
  let symbolArr = format.match(/[\u4e00-\u9fa5]+|[^a-zA-Z]/g) || [];

  const time = getTime(format, timeLeft);

  return timeArr.map((item, i) => {
    return {
      num: time[item.toLowerCase() as formatType],
      symbol: symbolArr[i],
    };
  });
};
