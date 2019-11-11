import { LinkedList } from "./linked-list";

describe("LinkedList", () => {
  let list;
  beforeEach(() => {
    list = new LinkedList<string>();
  });

  describe("unshift", () => {
    it("Should return the length after the node has been added", () => {
      expect(list).toHaveLength(0);

      expect(list.unshift("T1")).toBe(1);
      expect(list).toHaveLength(1);
    });

    it("Should add the the tail if the list was empty", () => {
      list.unshift("T1");

      expect(list.peekFirst()).toBe("T1");
      expect(list.peekLast()).toBe("T1");
    });

    it("Should append the node to the head", () => {
      list.unshift("T0");
      list.unshift("T1");

      expect(list.peekFirst()).toBe("T1");
      expect(list.peekLast()).toBe("T0");
      expect(list).toHaveLength(2);
    });
  });

  describe("shift", () => {
    it("Should return null if the list is empty", () => {
      expect(list.shift()).toBeNull();
    });

    it("Should return the value of the node if removed", () => {
      list.unshift("T0");
      expect(list.shift()).toBe("T0");
    });

    it("Should change the length", () => {
      list.unshift("T0");
      list.unshift("T1");
      list.unshift("T2");
      expect(list).toHaveLength(3);

      list.shift();
      expect(list).toHaveLength(2);

      list.shift();
      expect(list).toHaveLength(1);
    });

    it("Should remove the first node", () => {
      list.unshift("T0");
      list.unshift("T1");
      expect(list).toHaveLength(2);

      list.shift();
      expect(list).toHaveLength(1);
      expect(list.peekFirst()).toBe("T0");
      expect(list.peekLast()).toBe("T0");
    });

    it("Should handle removing the node with list's length of 1", () => {
      list.unshift("T0");
      list.shift();

      expect(list.peekFirst()).toBeNull();
      expect(list.peekLast()).toBeNull();
    });
  });

  describe("push", () => {
    it("Should return the length after the node has been added", () => {
      expect(list).toHaveLength(0);

      expect(list.push("T1")).toBe(1);
      expect(list).toHaveLength(1);
    });

    it("Should add the the tail if the list was empty", () => {
      list.push("T1");

      expect(list.peekFirst()).toBe("T1");
      expect(list.peekLast()).toBe("T1");
    });

    it("Should append the node to the tail", () => {
      list.push("T0");
      list.push("T1");

      expect(list.peekFirst()).toBe("T0");
      expect(list.peekLast()).toBe("T1");
      expect(list).toHaveLength(2);
    });
  });

  describe("pop", () => {
    it("Should return null if the list is empty", () => {
      expect(list.pop()).toBeNull();
    });

    it("Should return the value of the node if removed", () => {
      list.push("T0");
      expect(list.pop()).toBe("T0");
    });

    it("Should change the length", () => {
      list.push("T0");
      list.push("T1");
      list.push("T2");
      expect(list).toHaveLength(3);

      list.pop();
      expect(list).toHaveLength(2);

      list.pop();
      expect(list).toHaveLength(1);
    });

    it("Should remove the last node", () => {
      list.push("T0");
      list.push("T1");
      expect(list).toHaveLength(2);

      list.pop();
      expect(list).toHaveLength(1);
      expect(list.peekFirst()).toBe("T0");
      expect(list.peekLast()).toBe("T0");
    });

    it("Should handle removing the node with list's length of 1", () => {
      list.unshift("T0");
      list.pop();

      expect(list.peekFirst()).toBeNull();
      expect(list.peekLast()).toBeNull();
    });
  });

  describe("peekFirst | peekLast", () => {
    it("Should return null if list is empty", () => {
      expect(list.peekFirst()).toBeNull();
      expect(list.peekLast()).toBeNull();
    });

    it("Should return the head's/tail's node value", () => {
      list.push("T1");
      expect(list.peekFirst()).toBe("T1");
      expect(list.peekLast()).toBe("T1");

      list.unshift("T0");
      list.push("T2");
      expect(list.peekFirst()).toBe("T0");
      expect(list.peekLast()).toBe("T2");
    });
  });

  describe("peekNth", () => {
    it("Should return null if nth is bigger or equal to the lenght", () => {
      expect(list).toHaveLength(0);
      expect(list.peekNth(0)).toBeNull();
      expect(list.peekNth(22)).toBeNull();
    });

    it("Should peek the correct value", () => {
      list.push("T0");
      list.push("T1");
      list.push("T2");
      list.push("T3");

      expect(list.peekNth(0)).toBe("T0");
      expect(list.peekNth(1)).toBe("T1");
      expect(list.peekNth(2)).toBe("T2");
      expect(list.peekNth(3)).toBe("T3");
    });
  });

  describe("remove", () => {
    it("Should return null if the list is empty", () => {
      expect(list.remove("")).toBeNull();
    });

    it("Should return null if the item does not exist", () => {
      list.push("T0");
      expect(list.remove("T1")).toBeNull();
      expect(list.remove("T2")).toBeNull();
    });

    it("Should return nodeValue if removed", () => {
      list.push("T0");
      list.push("T1");

      expect(list.remove("T0")).toBe("T0");
      expect(list.remove("T1")).toBe("T1");
    });

    it("Changes the length of the list", () => {
      list.push("T0");
      list.push("T1");
      expect(list).toHaveLength(2);

      list.remove("T0");
      expect(list).toHaveLength(1);

      list.remove("T1");
      expect(list).toHaveLength(0);
    });

    it("Should remove the items when they match", () => {
      list.push("T0");
      list.push("T1");
      list.push("T2");
      list.push("T3");
      list.push("T4");

      list.remove("T0");
      list.remove("T2");
      list.remove("T4");

      // T1 and T3 should be left
      expect(list).toHaveLength(2);
      expect(list.peekFirst()).toBe("T1");
      expect(list.peekLast()).toBe("T3");
    });
  });

  describe("contains", () => {
    it("Should return false if the list is empty", () => {
      expect(list.contains("T0")).toBeFalsy();
      expect(list.contains("T1")).toBeFalsy();
    });

    it("Should return false if the item does is not found", () => {
      list.push("T0");
      list.push("T1");

      expect(list.contains("T3")).toBeFalsy();
      expect(list.contains("T4")).toBeFalsy();
    });

    it("Should return true if the item is found", () => {
      list.push("T0");
      list.push("T1");

      expect(list.contains("T0")).toBeTruthy();
      expect(list.contains("T1")).toBeTruthy();
    });
  });

  describe("iterator", () => {
    it("Should not return done if the object is empty", () => {
      const iterator = list[Symbol.iterator]();
      expect(iterator.next()).toEqual({
        done: true,
        value: null
      });
    });

    it("Should iterate with single node", () => {
      list.push("T0");
      const iterator = list[Symbol.iterator]();

      expect(iterator.next()).toEqual({
        done: false,
        value: "T0"
      });

      expect(iterator.next()).toEqual({
        done: true,
        value: null
      });
    });

    it("Should iterate with multiple nodes", () => {
      list.push("T0");
      list.push("T1");
      const iterator = list[Symbol.iterator]();

      expect(iterator.next()).toEqual({
        done: false,
        value: "T0"
      });

      expect(iterator.next()).toEqual({
        done: false,
        value: "T1"
      });

      expect(iterator.next()).toEqual({
        done: true,
        value: null
      });
    });
  });
});
