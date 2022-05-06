import { ORMDatabase } from "@app/orm/ORMDatabase";
import { Serve } from "@app/orm/entities/ServeEntity";
import { ProxyDto } from "./dto/ProxyDto";
import { make } from "@tools";
import { ProxyRecord, ProxyStatus } from "@app/orm/entities/ProxyRecordEntity";
import { Logger } from "@deepkit/logger";
import { toMatrix } from "@tools/toMatrix";
import { table } from "table";
import { LinkDto } from "./dto/LinkDto";

export class ProxyService {
  constructor(private orm: ORMDatabase, private logger: Logger) {}

  async proxy(opt: ProxyDto) {
    let record = await this.orm
      .query(ProxyRecord)
      .filter({ name: opt.name })
      .findOneOrUndefined();

    if (record) {
      this.logger.warning(
        `<yellow>Subapp ${record.name} already exists.</yellow>`
      );
      return record;
    }
    record = make(ProxyRecord, opt);

    await this.orm.persist(record);
    return record;
  }

  async link(dto: LinkDto) {
    let record = await this.orm
      .query(ProxyRecord)
      .filter({ serve: dto.serve, rootPath: dto.rootPath })
      .findOneOrUndefined();

    if (record) {
      Object.assign(record, dto);
    } else {
      record = make(ProxyRecord, dto);
      record.status = ProxyStatus.CHECKING;
    }

    await this.orm.persist(record);
  }

  async printList(serve: Serve) {
    // await this.syncState();
    const list = await this.orm.query(ProxyRecord).filter({ serve }).find();

    const showTable = table(
      toMatrix(list, ["serve", "createdAt", "updatedAt"])
    );

    this.logger.info(showTable);
  }

  async findOne(id: string) {
    return await this.orm
      .query(ProxyRecord)
      .filter({
        $or: [{ id: +id }, { name: id }],
      })
      .findOneOrUndefined();
  }
}
