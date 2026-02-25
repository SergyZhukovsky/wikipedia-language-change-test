export function getRandomElement<T>(array: T[], exclude?: T): T {
  const items = exclude !== undefined ? array.filter(item => item !== exclude) : array;
  return items[Math.floor(Math.random() * items.length)];
}
