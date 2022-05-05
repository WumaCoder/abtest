import {
  BackReference,
  entity,
  Index,
  MinLength,
  Reference,
  Unique,
} from "@deepkit/type";
import { Common } from "./CommonEntity";
import { Serve } from "./ServeEntity";

export enum SubappStatus {
  STOPPED = "stopped",
  STARTING = "starting",
  STARTED = "started",
  STOPPING = "stopping",
  DEAD = "dead",
  RUNNING = "running",
}

@entity.name("subapp")
export class Subapp extends Common {
  name!: string & Unique & MinLength<1>;

  pid!: number;

  status: SubappStatus = SubappStatus.STARTED;

  port!: number & Unique;

  serve!: Serve & Reference;

  startCmd!: string;

  stopCmd!: string;

  envs: string[] = []; // ["KEY=Value"]

  rootPath!: string;

  constructor() {
    super();
  }
}
