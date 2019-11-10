const hash = (key: string): number => {

  let hash = Array.from(key)
    .map(char => char.charCodeAt(0))
    .reduce((sum, cur) => sum + cur, 0);

  // make sure it is positive int
  hash = hash > 0 ? hash : ~hash;

  return hash; // % tablesize
};

console.log(hash('Nick'));

const getType = arg => {
  return {}.toString
    .call(arg)
    .slice(7, -1)
    .toLowerCase();
};

