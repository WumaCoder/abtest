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
  PROXY = "proxy",
  STOPPED = "stopped",
  RUNNING = "running",
  DISABLED = "disabled",
}

@entity.name("proxy_record").index(["serve", "name"], { unique: true })
export class ProxyRecord extends Common {
  rootPath: string = "";

  name!: string & MinLength<1>;

  pid: number = 0;

  status: ProxyStatus = ProxyStatus.PROXY;

  port!: number;

  serve!: Serve & Reference;

  constructor() {
    super();
  }
}
