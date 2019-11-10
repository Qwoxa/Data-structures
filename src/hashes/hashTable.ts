import hashcode from 'hashcode';
import { ILinkedList, LinkedList } from '../linkedList/double/double-linked-list';

const hashCode = hashcode.hashCode;


export abstract class IHash<K, V> {
  protected numElements: number;
  protected size: number;
  protected store: Array<ILinkedList<HashElement<K, V>>>;
  protected maxLoadFactor: number;

  constructor(size: number) {
    this.size = size;
    this.store = Array(size).fill(new LinkedList<HashElement<K, V>>());
    this.maxLoadFactor = 0.75;
    this.numElements = 0;
  }
}

export interface IHashElement<K, V> {
  key: K;
  value: V;
}

export class HashElement<K, V> implements IHashElement<K, V> {
  constructor(public key: K, public value: V) {
  }
}


export class Hash<K, V> extends IHash<K, V> {
  constructor(size: number = 31) {
    super(size);
  }

  private hash(key: K): number {
    // use lib for getting a hash
    let hash = hashCode(key);
    hash = hash.value(key);
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
  public add(key: K, value: V): number {
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

const hc = new Hash(3);
hc.add('name', 'Nick');

