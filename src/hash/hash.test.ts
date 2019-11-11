import { Hash } from "./hash";

describe("Hash", () => {
  let ht;
  beforeEach(() => {
    ht = new Hash();
  });

  describe("Create table", () => {
    it("Creates table with the default size", () => {
      expect(ht.tableSize).toBe(31);
    });

    it("Creates table with the specified size", () => {
      const ht = new Hash(13);
      const ht1 = new Hash(31);

      expect(ht.tableSize).toBe(13);
      expect(ht1.tableSize).toBe(31);
    });
  });

  describe("Add method", () => {
    it("Increments the lenght of the hash", () => {
      expect(ht).toHaveLength(0);

      ht.add("k", "v");
      expect(ht).toHaveLength(1);
    });

    it("Does not increment the size if the key is already exist", () => {
      ht.add("k", "v");
      ht.add("k", "v");
      expect(ht).toHaveLength(1);
    });

    it("Returns the new tableSize", () => {
      expect(ht.add("k", "v")).toBe(1);
      expect(ht.add("k1", "v1")).toBe(2);
    });

    it("Changes the value if the key exists", () => {
      ht.add("k", "v");
      expect(ht.getValue("k")).toBe("v");

      ht.add("k", "v1");
      expect(ht.getValue("k")).toBe("v1");
    });
  });

  describe("Remove method", () => {
    it("Decrements the length of the hash", () => {
      ht.add("k", "v");
      ht.add("k1", "v1");
      expect(ht).toHaveLength(2);

      ht.remove("k");
      ht.remove("k1");
      expect(ht).toHaveLength(0);
    });

    it("Does not decrements the length of the hash if not found", () => {
      ht.add("k", "v");
      expect(ht).toHaveLength(1);

      ht.remove("k1");
      expect(ht).toHaveLength(1);
    });

    it("Returns the value of the removed item | null (not found)", () => {
      ht.add("k", "v");
      expect(ht.remove("k1")).toBeNull();
      expect(ht.remove("k")).toBe("v");
    });
  });

  describe("getValue", () => {
    it("Gives the value of the elements if it exists", () => {
      ht.add("k", "v");
      ht.add("k1", "v1");

      expect(ht.getValue("k")).toBe("v");
      expect(ht.getValue("k1")).toBe("v1");
    });

    it("Returns null if the key is not found", () => {
      expect(ht.getValue("k")).toBeNull();
      expect(ht.getValue("k1")).toBeNull();
    });
  });

  describe("Table resizing", () => {
    it("Resize method - resizes the table", () => {
      expect(ht.tableSize).toBe(31);

      ht.resize(13);
      expect(ht.tableSize).toBe(13);

      ht.resize(7);
      expect(ht.tableSize).toBe(7);
    });

    it("Resizes the table on add method, if loadFactor > .75 (x2)", () => {
      const ht1 = new Hash(1);
      expect(ht1.tableSize).toBe(1);

      ht1.add("k", "v");
      ht1.add("k1", "v1");
      expect(ht1.tableSize).toBe(2);
      expect(ht1).toHaveLength(2);
      expect(ht1.getValue("k")).toBe("v");
      expect(ht1.getValue("k1")).toBe("v1");
    });
  });

  describe("Iterator", () => {
    it("Iterates all the elements", () => {
      const keys = ["name", "age", "phone"];
      const values = ["Nick", 0, 123];

      keys.forEach((k, i) => ht.add(k, values[i]));
      expect(ht).toHaveLength(3);

      const iterated: Array<[string, any]> = [...ht];
      expect(iterated).toHaveLength(3);
    });
  });
});
