export interface IHash<V> {

}

export interface IHashElement<V> {
  key: string;
  value: V;
}

class Hash<V> implements IHash<V> {
  private size: number;
  private storage: Array<V>;

  constructor(size: number = 31) {
    this.size = size;
    this.storage = [];
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
  public loadFactor(): number {
    return null; // etries / entries filled
  }

  public set(key: string): number {
    return this.hash(key);
  }
}

const hash = new Hash();
console.log(hash.set('8'));
