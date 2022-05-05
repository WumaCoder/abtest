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
  PROXY = "proxy",
}

export enum SubappType {
  PROXY = "proxy",
  HOST = "host",
}

@entity.name("subapp")
export class Subapp extends Common {
  name!: string & Unique & MinLength<1>;

  pid: number = -1;

  status: SubappStatus = SubappStatus.STARTED;

  port!: number & Unique;

  serve!: Serve & Reference;

  exec: string = "";

  program: string = "";

  preHook: string = "";

  postHook: string = "";

  // injectScripts: string[] = [];

  envs: string[] = []; // ["KEY=Value"]

  rootPath: string = "";

  constructor() {
    super();
  }
}
