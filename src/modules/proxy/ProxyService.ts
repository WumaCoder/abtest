import { ORMDatabase } from "@app/orm/ORMDatabase";
import { Serve } from "@app/orm/entities/ServeEntity";
import { ProxyDto } from "./dto/ProxyDto";
import { make } from "@tools";
import { ProxyRecord, ProxyStatus } from "@app/orm/entities/ProxyRecordEntity";
import { Logger } from "@deepkit/logger";
import { toMatrix } from "@tools/toMatrix";
import { table } from "table";

export class ProxyService {
  async findOne(id: string) {
    return await this.orm
      .query(ProxyRecord)
      .filter({ id: +id })
      .findOneOrUndefined();
  }
  constructor(private orm: ORMDatabase, private logger: Logger) {}

  async proxy(opt: ProxyDto) {
    let subapp = await this.orm
      .query(ProxyRecord)
      .filter({ name: opt.name })
      .findOneOrUndefined();

    if (subapp) {
      this.logger.warning(
        `<yellow>Subapp ${subapp.name} already exists.</yellow>`
      );
      return subapp;
    }
    subapp = make(ProxyRecord, opt);

    await this.orm.persist(subapp);
    return subapp;
  }

  async printList(serve: Serve) {
    // await this.syncState();
    const list = await this.orm.query(ProxyRecord).filter({ serve }).find();

    const showTable = table(
      toMatrix(list, ["serve", "createdAt", "updatedAt"])
    );

    this.logger.info(showTable);
  }
}
