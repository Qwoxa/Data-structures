const hash = (key: string): number => {
  const g = 31;

  let hash = Array.from(key)
    .map(char => char.charCodeAt(0))
    .reduce((sum, cur) => g * sum + cur, 0);

  // make sure it is positive int
  hash = hash > 0 ? hash : ~hash;

  return hash; // % tablesize
};

console.log(hash('Nick'));

console.log(~-5);