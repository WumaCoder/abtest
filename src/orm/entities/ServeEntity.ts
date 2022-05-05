import { BackReference, entity, Index, MinLength, Unique } from "@deepkit/type";
import { Common } from "./CommonEntity";
import { ProxyRecord } from "@app/orm/entities/ProxyRecordEntity";

export enum ServeStatus {
  STOPPED = "stopped",
  STARTING = "starting",
  STARTED = "started",
  STOPPING = "stopping",
  DEAD = "dead",
  RUNNING = "running",
}

@entity.name("serve")
export class Serve extends Common {
  name!: string & Unique & MinLength<1>;

  pid!: number;

  status: ServeStatus = ServeStatus.STARTED;

  port!: number;

  subapps?: ProxyRecord[] & BackReference;

  constructor() {
    super();
  }
}
