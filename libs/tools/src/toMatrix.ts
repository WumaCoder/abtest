import { AnyObject } from "./types";

export function toMatrix<T extends AnyObject>(data: T[]): any[][] {
  const matrix: any[][] = [];
  const keys = Object.keys(data[0]);
  matrix.push(keys);
  for (const item of data) {
    const t: any[] = [];
    for (const key of keys) {
      t.push(item[key]);
    }
    matrix.push(t);
  }
  return matrix;
}
