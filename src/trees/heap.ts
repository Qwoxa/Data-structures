interface IHeap<E> {
  add(item: E): void;
}

class Heap<E> implements IHeap<E> {
  private lastPosition: number;
  private store: Array<E>;

  constructor() {
    this.lastPosition = 0;
    this.store = [];
  }

  /**
   * Swaps to nodes
   * @param from Position from which swap
   * @param to Position to which swap
   */
  public swap(from: number, to: number): void {
    const temp = this.store[from];
    this.store[from] = this.store[to];
    this.store[to] = temp;
  }

  /**
   * Check if we should swap the positions up. If so, does it
   * @param position Position of the element to check
   */
  public trickleUp(position: number): void {
    if (position === 0) {
      return;
    }

    const parent = Math.floor((position - 1) / 2);
    if (this.store[parent] < this.store[position]) {
      this.swap(position, parent);
      this.trickleUp(parent);
    }
  }

  /**
   * Check if we should swap the positions down. If so, does it
   * @param position Position of the element to check
   */
  public trickleDown(position: number): void {
    const children = [position * 2 + 1, position * 2 + 2];
    const biggestChild =
      this.store[children[0]] > this.store[children[1]]
        ? children[0]
        : children[1];

    if (this.store[biggestChild] > this.store[position]) {
      this.swap(position, biggestChild);
      this.trickleDown(biggestChild);
    }
  }

  /**
   * Adds value to the end of the heap
   * @param item Value to be added
   */
  public add(item: E): void {
    this.store[this.lastPosition] = item;
    this.trickleUp(this.lastPosition);
    this.lastPosition++;
  }

  /**
   * Removes root value from the heap
   */
  public remove(): void {
    if (this.lastPosition === 0) {
      return;
    }

    // Last item to the root, decrement last position
    this.lastPosition--;
    this.store[0] = this.store[this.lastPosition];
    this.store.length = this.lastPosition;

    this.trickleDown(0);
  }
}

