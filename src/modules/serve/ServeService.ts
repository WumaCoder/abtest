// ServeService
import { Serve } from "@app/orm/entities/ServeEntity";
import { ORMDatabase } from "@app/orm/ORMDatabase";
import { toMatrix } from "@tools/toMatrix";
import { table } from "table";

export class ServeService {
  constructor(private orm: ORMDatabase) {}

  async printList() {
    const list = await this.orm.query(Serve).find();

    const showTable = table(toMatrix(list));

    console.log(showTable);
  }
}
