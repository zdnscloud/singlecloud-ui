const timeWindowSeconds = (timeWindow) => {
  let seconds = 0;

  if (timeWindow === '10s') {
    seconds = 10;
  }
  if (timeWindow === '1m') {
    seconds = 60;
  }
  if (timeWindow === '10m') {
    seconds = 600;
  }
  if (timeWindow === '1h') {
    seconds = 3600;
  }

  return seconds;
};

export default timeWindowSeconds;
