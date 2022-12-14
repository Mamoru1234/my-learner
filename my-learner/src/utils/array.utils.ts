
export const randomIntFromInterval = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);

export function sampleArr<T>(arr: T[], size: number): T[] {
  const setOfIndexes = new Set<number>();
  while (setOfIndexes.size < size && setOfIndexes.size < arr.length) {
    setOfIndexes.add(randomIntFromInterval(0, arr.length - 1));
  }
  return Array.from(setOfIndexes.values()).map(i => arr[i]);
}
