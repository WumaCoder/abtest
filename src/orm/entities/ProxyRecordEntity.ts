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

export enum ProxyStatus {
  CHECKING = "checking",
  STOPPED = "stopped",
  RUNNING = "running",
  DISABLED = "disabled",
}

@entity.name("proxy_record")
export class ProxyRecord extends Common {
  rootPath: string = "";

  configPath: string = "";

  name!: string & MinLength<1> & Unique;

  port!: number;

  serve!: Serve & Reference;

  pid: number = 0;

  status: ProxyStatus = ProxyStatus.CHECKING;

  constructor() {
    super();
  }
}
