const hash = (key: string): number => {
  const g = 31;

  return Array.from(key)
  .map(char => char.charCodeAt(0))
  .reduce((sum, cur) => g * sum + cur, 0);
};

console.log(hash('qwdsf'));