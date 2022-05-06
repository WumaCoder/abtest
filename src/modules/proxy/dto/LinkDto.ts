import { Common } from "@app/orm/entities/CommonEntity";
import { ProxyRecord } from "@app/orm/entities/ProxyRecordEntity";

export interface LinkDto
  extends Omit<ProxyRecord, keyof Common | "pid" | "status"> {}
