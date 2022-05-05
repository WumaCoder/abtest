import { ORMDatabase } from "@app/orm/ORMDatabase";
import { Serve } from "@app/orm/entities/ServeEntity";
import { ProxyDto } from "./dto/ProxyDto";
import { make } from "@tools";
import { Subapp, SubappStatus } from "@app/orm/entities/SubappEntity";
import { Logger } from "@deepkit/logger";

export class SubappService {
  constructor(private orm: ORMDatabase, private logger: Logger) {}

  async proxy(opt: ProxyDto) {
    let subapp = await this.orm
      .query(Subapp)
      .filter({ name: opt.name })
      .findOneOrUndefined();

    if (subapp) {
      this.logger.warning(
        `<yellow>Subapp ${subapp.name} already exists.</yellow>`
      );
      return subapp;
    }
    subapp = make(Subapp, opt);
    subapp.status = SubappStatus.PROXY;

    await this.orm.persist(subapp);
    return subapp;
  }
}
