import {
  LinkedList,
  IteratorResult
} from "../linkedList/double/double-linked-list";

export interface IHash<V> {
  tableSize: number;
  length: number;
  add(key: string, value: V): number;
  remove(key: string): V;
  getValue(key: string): V;
  resize(newSize: number): void;
}

export interface IHashElement<V> {
  key: string;
  value: V;
}

class HashElement<V> implements IHashElement<V> {
  public key: string;
  public value: V;

  constructor(key: string, value: V) {
    this.key = key;
    this.value = value;
  }
}

export class Hash<V> implements IHash<V> {
  private size: number;
  private numElements: number;
  private store: Array<LinkedList<IHashElement<V>>>;
  private maxLoadFactor: number;

  constructor(size: number = 31) {
    this.size = size;
    this.store = Array(size)
      .fill(null)
      .map(b => new LinkedList());
    this.numElements = 0;
    this.maxLoadFactor = 0.75;
  }

  /**
   * Hashes the key
   * @param key Key that needs to be hashed
   * @return Hash value that can be used as index
   * to place items in storage
   */
  private hash(key: string): number {
    let hash = Array.from(key)
      .map(char => char.charCodeAt(0))
      .reduce((sum, cur) => sum + cur, 0);

    // make sure it is positive int
    hash = hash >= 0 ? hash : ~hash;

    // Use the modulo operator to fit into size
    return hash % this.size;
  }

  /**
   * Load factor shows the coefficient of slots
   * which have values
   */
  private loadFactor(): number {
    return this.numElements / this.size;
  }

  /**
   * Returns table size
   */
  get tableSize(): number {
    return this.size;
  }

  /**
   * Returns amount of elements
   */
  get length(): number {
    return this.numElements;
  }

  /**
   * Adds key and value pair to the table
   * @return Length after adding the pair
   */
  public add(key: string, value: V): number {
    if (this.loadFactor() > this.maxLoadFactor) {
      this.resize(this.size * 2);
    }

    const index = this.hash(key);

    // If the node exists, just change the value
    for (let el of this.store[index]) {
      if (el.key === key) {
        el.value = value;
        return this.numElements;
      }
    }

    const hashEl = new HashElement(key, value);
    this.store[index].push(hashEl);
    this.numElements++;

    return this.numElements;
  }

  /**
   * Removes element with the specifies key
   * @return Value of the deleted element | null if not found
   */
  public remove(key: string): V | null {
    const index = this.hash(key);
    const list = this.store[index];

    let itemToRemove;
    for (let el of list) {
      if (el.key === key) itemToRemove = el;
    }

    if (itemToRemove === undefined) {
      return null;
    }

    const removedItem = list.remove(itemToRemove);
    this.numElements--;
    return removedItem.value;
  }

  /**
   * Returns value for the specified key
   * @return Value | null
   */
  public getValue(key: string): V | null {
    const index = this.hash(key);
    const list = this.store[index];

    let foundValue = null;
    for (let el of list) {
      if (el.key === key) foundValue = el.value;
    }

    return foundValue;
  }

  /**
   * Resizes the store
   */
  public resize(newSize: number): void {
    this.size = newSize;

    const newStore: Array<LinkedList<IHashElement<V>>> = Array(newSize)
      .fill(null)
      .map(b => new LinkedList());

    // iterate all buckets in the store
    this.store.forEach(list => {
      // extract all nodes if they exist
      const nodes = [...list];
      nodes.forEach(node => {
        const newIndex = this.hash(node.key);
        newStore[newIndex].push(node);
      });
    });

    this.store = newStore;
  }

  /**
   * Iterates all the elements
   * Returns pairs [key, value]
   */
  [Symbol.iterator]() {
    const elements = [];
    let index = 0;

    this.store.forEach(b => {
      const nodes = [...b];
      nodes.forEach(node => {
        elements.push([node.key, node.value]);
      });
    });

    return {
      next(): IteratorResult<[string, V]> {
        const done = index === elements.length;

        const data = {
          done: done,
          value: elements[index]
        };

        // Increment index
        index++;
        return data;
      }
    };
  }
}
