export function getRandomElement<T>(array: T[], exclude?: T): T {
  const items = exclude !== undefined ? array.filter(item => item !== exclude) : array;
  if (items.length === 0) throw new Error('No elements to choose from after exclusion');
  return items[Math.floor(Math.random() * items.length)];
}
