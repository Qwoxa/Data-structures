const hash = (key: string): number => {
  const g = 31;

  const hash = Array.from(key)
  .map(char => char.charCodeAt(0))
  .reduce((sum, cur) => g * sum + cur, 0);

  return hash > 0 ? hash : ~hash;
};

console.log(hash('Nick'));

console.log(~-5);