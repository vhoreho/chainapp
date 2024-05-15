export function createIterator<T>(items: T[]): () => T {
  let shuffledItems: T[] = shuffle(items);
  let currentIndex = 0;

  function shuffle(array: T[]): T[] {
    let currentIndex = array.length;
    let temporaryValue: T;
    let randomIndex: number;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  return function getNextItem(): T {
    if (currentIndex === items.length) {
      shuffledItems = shuffle(items);
      currentIndex = 0;
    }
    const item = shuffledItems[currentIndex];
    currentIndex++;
    return item;
  };
}
