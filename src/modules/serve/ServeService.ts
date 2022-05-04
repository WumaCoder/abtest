// ServeService
import { Serve, ServeStatus } from "@app/orm/entities/ServeEntity";
import { ORMDatabase } from "@app/orm/ORMDatabase";
import { toMatrix } from "@tools/toMatrix";
import { table } from "table";
import find from "find-process";
import { Logger } from "@deepkit/logger";

export class ServeService {
  constructor(private orm: ORMDatabase, private logger: Logger) {}

  async printList() {
    await this.syncState();
    const list = await this.orm.query(Serve).find();

    const showTable = table(toMatrix(list));

    console.log(showTable);
  }

  async syncState() {
    const list = await this.orm
      .query(Serve)
      .filter({ status: { $nin: [ServeStatus.STOPPED, ServeStatus.STOPPING] } })
      .find();

    for (const serve of list) {
      const childProcess = await find("pid", serve.pid);
      serve.status = childProcess.length
        ? ServeStatus.RUNNING
        : ServeStatus.DEAD;

      await this.orm.persist(serve);
    }

    this.logger.debug("sync state done");
  }
}
