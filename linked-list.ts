export interface INode<E> {
  next: INode<E> | null;
  data: E;
}

export interface ILinkedList<E> {
  unshift(nodeValue: E): number;
  shift(): E | null;
  push(nodeValue: E): number;
  pop(): E | null;
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

  get Tail() {
    return this.tail;
  }

  get Head() {
    return this.head;
  }
}

const list = new LinkedList<string>();

list.push('Ann');
list.push('Craig');


console.log(list.pop());
console.log(list.pop());


console.log(list.Head)
console.log(list.Tail)