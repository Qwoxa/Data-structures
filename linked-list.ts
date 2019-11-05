export interface INode<E> {
  next: INode<E>;
  data: E;
}

export interface ILinkedList<E> {

}

class Node<E> implements INode<E> {
  public next: INode<E>;
  public data: E

  constructor(data: E) {
    this.data = data;
    this.next = null;
  }
  
}

export class LinkedList<E> implements ILinkedList<E> {
  private head: Node<E>;
  private tail: Node<E>;
  private currentSize: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.currentSize = 0;
  }
  

  /**
   * Adds one element to the beginning of a list
   * @param nodeValue Value to be set
   * @return New length of the list
   */
  public unshift(nodeValue: E): number {
    const node: Node<E> = new Node(nodeValue);
    this.currentSize++;

    if (this.head === null) this.tail = node;
    node.next = this.head;
    this.head = node;
    return this.currentSize;
  }

  /**
   * Method shift removes the first element from a list
   * @return New length of the list
   */
  public shift(): number | void {
    // If the head is null, there is nothing to shift
    if (this.head === null) {
      return undefined;
    }

    // Assign the second Node to be the head
    // If the list consisted only from one node
    // then set the tail to be null
    this.head = this.head.next;
    if (this.head === null) this.tail = null;

    return --this.currentSize;
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
    // to the node that is being added. And set the tail to
    // be the node
    this.tail.next = node;
    this.tail = node;

    return this.currentSize;
  }
}

const list = new LinkedList();
console.log(list.shift());

list.push("nick");
list.push('dyson')
list