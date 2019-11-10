import { ILinkedList, LinkedList } from '../linkedList/double/double-linked-list';

export abstract class IHash<V> {
  protected numElements: number;
  protected size: number;
  protected store: Array<ILinkedList<HashElement<V>>>;
  protected maxLoadFactor: number;

  constructor(size: number) {
    this.size = size;
    this.store = Array(size).fill(null).map(() => new LinkedList<HashElement<V>>());
    this.maxLoadFactor = 0.75;
    this.numElements = 0;
  }
}

export interface IHashElement<V> {
  key: string;
  value: V;
}

export class HashElement<V> implements IHashElement<V> {
  constructor(public key: string, public value: V) {
  }
}


export class Hash<V> extends IHash<V> {
  constructor(size: number = 31) {
    super(size);
  }

  private hash(key: string): number {
    let hash = Array.from(key)
      .map(char => char.charCodeAt(0))
      .reduce((sum, cur) => sum + cur, 0);

    // make sure it is positive int
    hash = hash > 0 ? hash : ~hash;

    return hash % this.size;
  }

  private loadFactor(): number {
    return this.numElements / this.size;
  }

  /**
   * Adds key and value to the table
   * @param key Key to add
   * @param value Value to add
   * @return New number of elements
   */
  public add(key: string, value: V): number {
    if (this.loadFactor() > this.maxLoadFactor) {
      // resize(size * 2);
    }

    const hashEl = new HashElement(key, value);
    const index = this.hash(key);
    console.log(index);


    // store the element
    this.store[index].push(hashEl);
    this.numElements++;

    return this.numElements;
  }
}

const hc = new Hash(5);
hc.add('name', 'Nick');
console.log(hc);










