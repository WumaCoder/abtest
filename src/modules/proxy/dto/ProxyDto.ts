import { ProxyRecord } from "@app/orm/entities/ProxyRecordEntity";

export interface ProxyDto
  extends Pick<ProxyRecord, "name" | "serve" | "port"> {}
