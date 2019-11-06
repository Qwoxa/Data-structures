export interface INode<E> {
  next: INode<E> | null;
  data: E;
}

export interface ILinkedList<E> {
  readonly length: number;
  unshift(nodeValue: E): number;
  shift(): E | null;
  push(nodeValue: E): number;
  pop(): E | null;
  peekFirst(): E | null;
  peekLast(): E | null;
  peekNth(nth: number): E | null;
  remove(nodeValue: E): E | null;
  contains(nodeValue: E): boolean;
}

class Node<E> implements INode<E> {
  public next: INode<E> | null;
  public data: E;

  constructor(data: E) {
    this.data = data;
    this.next = null;
  }
}

export class LinkedList<E> implements ILinkedList<E> {
  private head: Node<E> | null;
  private tail: Node<E> | null;
  private currentSize: number;

  constructor() {
    this.head = this.tail = null;
    this.currentSize = 0;
  }

  /**
   * Gets the length of the current list
   * @return List length
   */
  public get length(): number {
    return this.currentSize;
  }
  

  /**
   * Adds one element to the beginning of a list
   * @param nodeValue Value to be set
   * @return New length of the list
   */
  public unshift(nodeValue: E): number {
    // Create node and increment size here to be DRY
    const node: Node<E> = new Node(nodeValue);
    this.currentSize++;

    // If the head is null, then set the tail to be
    // the added node.
    if (this.head === null) this.tail = node;

    // Set property next of the node that is being
    // added to be the current head, then set
    // head to be the node
    node.next = this.head;
    this.head = node;

    return this.currentSize;
  }

  /**
   * Method shift removes the first element from a list
   * @return The value of the deleted Node
   */
  public shift(): E | null {
    // If the head is null, there is nothing to shift
    if (this.head === null) {
      return null;
    }

    // Save the node. Assign the second Node to be the head
    const deletedNode = this.head;
    this.head = this.head.next;

    // If the list consisted only from one node
    // then set the tail to be null
    if (this.head === null) this.tail = null;
    this.currentSize--;

    return deletedNode.data;
  }

  /**
   * Adds one element to the end of a list 
   * @param nodeValue Value to be set
   * @return New length of the list
   */
  public push(nodeValue: E): number {
    // Create node and increment size here to be DRY
    const node: Node<E> = new Node(nodeValue);
    this.currentSize++;

    // If the list is empty, then set the head and the
    // tail to be the node that is being added and
    // return the current size
    if (this.head === null) {
      this.head = this.tail = node;
      return this.currentSize;
    }
    
    // Set the the current tail's next property to be linked
    // to the node that is being added. And set the tail
    this.tail.next = node;
    this.tail = node;

    return this.currentSize;
  }

  /**
   * Removes the last Node from a list
   * @return The value of the deleted Node
   */
  public pop(): E | null {
    // If the head is null, there is nothing to pop
    if (this.head === null) {
      return null;
    }

    // If the list contains only one node
    // return the executing of shift method
    if (this.head === this.tail) {
      return this.shift();
    }

    // Get the one before the last node
    let beforeLast = this.head;
    while(beforeLast.next !== this.tail) {
      beforeLast = beforeLast.next
    }

    // Extract data, set the next to be null
    // set new value to tail
    const { data } = beforeLast.next;
    beforeLast.next = null;
    this.tail = beforeLast;

    this.currentSize--;
    return data;
  }

  /**
   * Removes the last Node from a list
   * @param nodeValue Node value of a node to delete (primitive)
   * @return The value of the deleted Node
   */
  public remove(nodeValue: E): E | null {
    // If the head is null, there is nothing to remove
    if (this.head === null) {
      return null;
    }

    let current = this.head,
      previous,
      found;
    
    // Loop through the List, looking for a nodeValue
    while(current !== null) {
      // if value if found, break
      if (current.data === nodeValue) {
        found = current;
        break;
      }

      // continue iterating
      previous = current;
      current = current.next;
    }

    // If the value is not found - return null
    if (!found) {
      return null;
    }

    // If the searched node is first, then  call shift()
    if (found === this.head) {
      return this.shift();
    }

    // If the code is still running, then the node is in
    // the middle. So the previous should be linked with
    // current.next
    previous.next = current.next;
    this.currentSize--;

    return current.data;
  }

  /**
   * Checks if the node exists
   * @param nodeValue Node value of a node to check (primitive)
   * @return Boolean value
   */
  public contains(nodeValue: E): boolean {
    let current = this.head;

     // Loop through the List, looking for a nodeValue
     while(current !== null) {
      if (current.data === nodeValue) {
        return true;
      }
      
      current = current.next;
    }

    return false;
  }

  /**
   * Gets the data from the head's node
   * @return The value of the first element | null
   */
  public peekFirst(): E | null {
    return this.head ? this.head.data : null;
  }

  /**
   * Gets the data from the tails's node
   * @return The value of the last element | null
   */
  public peekLast(): E | null {
    return this.tail ? this.tail.data : null;
  }

  /**
   * Gets the data from the nth node (starting from 0)
   * @return The value of the nth element | null
   */
  public peekNth(nth: number): E | null {
    if (nth > this.currentSize) {
      return null;
    }

    let count = 0, current = this.head;
    while (count !== nth) {
      current = current.next;
      count++;
    }

    return current.data;
  }
}