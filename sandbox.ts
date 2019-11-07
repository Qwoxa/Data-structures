const hash = (key: string): number => {
  return Array.from(key)
  .map(char => char.charCodeAt(0))
  .reduce((sum, cur) => sum + cur, 0);
};

console.log(hash(''));