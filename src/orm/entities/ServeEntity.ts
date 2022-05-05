import { BackReference, entity, Index, MinLength, Unique } from "@deepkit/type";
import { Common } from "./CommonEntity";
import { Subapp } from "@app/orm/entities/SubappEntity";

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

  subapps?: Subapp[] & BackReference;

  constructor() {
    super();
  }
}
