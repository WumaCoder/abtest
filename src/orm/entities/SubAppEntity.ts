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

export enum SubAppStatus {
  STOPPED = "stopped",
  STARTING = "starting",
  STARTED = "started",
  STOPPING = "stopping",
  DEAD = "dead",
  RUNNING = "running",
}

@entity.name("sub_app")
export class SubApp extends Common {
  name!: string & Unique & MinLength<1>;

  pid!: number;

  status: SubAppStatus = SubAppStatus.STARTED;

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
