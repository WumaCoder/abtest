import { toMatrix } from "./toMatrix";

describe("toMatrix.ts", () => {
  it("should return a matrix", () => {
    expect(
      toMatrix([
        {
          id: "1",
          name: "a",
        },
      ])
    ).toEqual([
      ["id", "name"],
      ["1", "a"],
    ]);
  });
});
