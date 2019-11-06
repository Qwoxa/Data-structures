import { LinkedList, ILinkedList } from './linked-list';


// export interface ILinkedList<E> {
//   readonly length: number;
//   unshift(nodeValue: E): number;
//   shift(): E | null;
//   push(nodeValue: E): number;
//   pop(): E | null;
//   remove(nodeValue: E): E | null;
//   contains(nodeValue: E): boolean;
//   peekFirst(): E | null;
//   peekLast(): E | null;
// }

describe('LinkedList', () => {
  let list;
  beforeEach(() => {
    list = new LinkedList<string | number>();
  });

  describe('unshift', () => {
   it('Should return the length after the node has been added', () => {
      expect(list).toHaveLength(0);

      expect(list.unshift('T1')).toBe(1);
      expect(list).toHaveLength(1);
    });

    it('Should add the the tail if the list was empty', () => {
      list.unshift('T1');

      expect(list.peekFirst()).toBe('T1');
      expect(list.peekLast()).toBe('T1');
    });

    it('Should append the node to the head', () => {
      list.unshift('T0');
      list.unshift('T1');

      expect(list.peekFirst()).toBe('T1');
      expect(list.peekLast()).toBe('T0');
      expect(list).toHaveLength(2);
    });
  });

  describe('shift', () => {
   it('Should return null if the list is empty', () => {
      expect(list.shift()).toBeNull();
    });

    it('Should return the value of the node if removed', () => {
      list.unshift('T0');
      expect(list.shift()).toBe('T0');
    });

    it('Should change the length', () => {
      list.unshift('T0');
      list.unshift('T1');
      list.unshift('T2');
      expect(list).toHaveLength(3);
      
      list.shift();
      expect(list).toHaveLength(2);

      list.shift();
      expect(list).toHaveLength(1);
    });

    it('Should remove the first node', () => {
      list.unshift('T0');
      list.unshift('T1');
      expect(list).toHaveLength(2);

      list.shift();
      expect(list).toHaveLength(1);
      expect(list.peekFirst()).toBe('T0');
      expect(list.peekLast()).toBe('T0');
    });

    it('Should handle removing the node with list\'s length of 1', () => {
      list.unshift('T0');
      list.shift();

      expect(list.peekFirst()).toBeNull();
      expect(list.peekLast()).toBeNull();
    });
  });

  describe('push', () => {
    it('Should return the length after the node has been added', () => {
      expect(list).toHaveLength(0);

      expect(list.push('T1')).toBe(1);
      expect(list).toHaveLength(1);
    });

    it('Should add the the tail if the list was empty', () => {
      list.push('T1');

      expect(list.peekFirst()).toBe('T1');
      expect(list.peekLast()).toBe('T1');
    });

    it('Should append the node to the tail', () => {
      list.push('T0');
      list.push('T1');

      expect(list.peekFirst()).toBe('T0');
      expect(list.peekLast()).toBe('T1');
      expect(list).toHaveLength(2);
    });
  });

  describe('pop', () => {
    it('Should return null if the list is empty', () => {
      expect(list.pop()).toBeNull();
    });

    it('Should return the value of the node if removed', () => {
      list.push('T0');
      expect(list.pop()).toBe('T0');
    });

    it('Should change the length', () => {
      list.push('T0');
      list.push('T1');
      list.push('T2');
      expect(list).toHaveLength(3);
      
      list.pop();
      expect(list).toHaveLength(2);

      list.pop();
      expect(list).toHaveLength(1);
    });

    it('Should remove the last node', () => {
      list.push('T0');
      list.push('T1');
      expect(list).toHaveLength(2);

      list.pop();
      expect(list).toHaveLength(1);
      expect(list.peekFirst()).toBe('T0');
      expect(list.peekLast()).toBe('T0');
    });

    it('Should handle removing the node with list\'s length of 1', () => {
      list.unshift('T0');
      list.pop();

      expect(list.peekFirst()).toBeNull();
      expect(list.peekLast()).toBeNull();
    });
  });

  describe('peekFirst | peekLast', () => {
    it('Should return null if list is empty', () => {
      expect(list.peekFirst()).toBeNull();
      expect(list.peekLast()).toBeNull();
    });

    it('Should return the head\'s/tail\'s node value', () => {
      list.push('T1');
      expect(list.peekFirst()).toBe('T1');
      expect(list.peekLast()).toBe('T1');

      list.unshift('T0');
      list.push('T2');
      expect(list.peekFirst()).toBe('T0');
      expect(list.peekLast()).toBe('T2');
    });
  });

  describe('peekNth', () => {

  });
});