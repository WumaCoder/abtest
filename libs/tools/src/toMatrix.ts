import { AnyObject } from "./types";

export function toMatrix<T extends AnyObject>(
  data: T[],
  ignore: (keyof T)[] = []
): any[][] {
  const matrix: any[][] = [];
  if (!Array.isArray(data)) {
    return [["No data"]];
  }
  const keys = Object.keys(data[0]).filter((key) => !ignore.includes(key));
  matrix.push(keys);
  for (const item of data) {
    const t: any[] = [];
    for (const key of keys) {
      if (ignore.includes(key)) {
        continue;
      }
      t.push(item[key]);
    }
    matrix.push(t);
  }
  return matrix;
}
