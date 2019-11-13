export interface ITreeNode<E> {
  data: E;
  parent: ITreeNode<E>;
  left: ITreeNode<E>;
  right: ITreeNode<E>;
}

class TreeNode<E> implements ITreeNode<E> {
  public left: TreeNode<E>;
  public right: TreeNode<E>;
  public parent: TreeNode<E>;
  public data: E;

  constructor(data: E, parent: TreeNode<E> = null) {
    this.data = data;
    this.parent = parent;
    this.left = this.right = null;
  }
}

interface ITree<E> {
  root: TreeNode<E>;
  add(value: E): void;
}

class Tree<E> implements ITree<E> {
  public root: TreeNode<E>;
  private currentSize: number;

  constructor(data: E = null) {
    this.root = data ? new TreeNode(data) : null;
    this.currentSize = data ? 1 : 0;
  }

  /**
   * Adds new node with data to the tree (recursive)
   * @param data Value of the node to be added
   * @param pointer Last pointer
   */
  private addRecursive(data: E, pointer: TreeNode<E>): void {
    if (data > pointer.data) {
      if (!pointer.right) {
        pointer.right = new TreeNode(data);
        pointer.right.parent = pointer;
        return;
      }
      return this.addRecursive(data, pointer.right);
    }

    if (!pointer.left) {
      pointer.left = new TreeNode(data);
      pointer.left.parent = pointer;
      return;
    }

    return this.addRecursive(data, pointer.left);
  }

  /**
   * Searches for a node value recursively
   * @param data Value of the node to be searched
   * @param pointer Last pointer
   */
  private containsRecursive(data: E, pointer: TreeNode<E>): boolean {
    if (pointer === null) return false;

    if (pointer.data === data) return true;

    return data > pointer.data
      ? this.containsRecursive(data, pointer.right)
      : this.containsRecursive(data, pointer.left);
  }

  /**
   * Removes the node if found
   * @param data Value of the node to be deleted
   * @param pointer Last pointer
   */
  private removeRecursive(data: E, pointer: TreeNode<E>, side: string = 'root'): boolean {
    if (pointer === null) return false;

    if (pointer.data === data) {
      // If it is the root node and it's the only node in the tree
      if (this.currentSize === 1) {
        this.root = null;
      }

      // If it is a leaf
      if (!pointer.left && !pointer.right) {
        pointer.parent[side] = null;
      }

      // If one child is null
      if (!pointer.left && pointer.right && pointer.left && !pointer.right) {
        const validNode = pointer.left ? pointer.left : pointer.right;
        pointer.parent[side] = validNode;
      }

      // ! IF TWO CHILDREN ARE THERE

      
      this.currentSize--;
      return true;
    }

    return data > pointer.data
      ? this.removeRecursive(data, pointer.right, 'right')
      : this.removeRecursive(data, pointer.left, 'left');
  }

  /**
   * Returns the current lenght of the tree
   */
  get length(): number {
    return this.currentSize;
  }

  /**
   * Adds node to the tree
   * @param data Value of the node to be added
   */
  public add(data: E) {
    if (this.root === null) {
      this.root = new TreeNode(data);
    } else {
      this.addRecursive(data, this.root);
    }

    this.currentSize++;
  }

  /**
   * Check if node exists in the tree
   * @param data Value to be searched
   * @return bool
   */
  public contains(data: E): boolean {
    return this.containsRecursive(data, this.root);
  }

  /**
   * Remove node
   * @param data Value of the node to be removed
   * @return false if not deleted, otherwise - true
   */
  public remove(data: E): boolean {
    return this.removeRecursive(data, this.root);
  }
}

const tree = new Tree<number>(); //? tree.length
tree.add(15);
tree.add(3);
tree.add(7);
tree.add(12);

tree.remove(12);//?

tree.remove(7);//?
tree; //?
