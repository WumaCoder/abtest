import { Logger } from "@deepkit/logger";
import { arg, cli, Command, flag } from "@deepkit/app";
import { Config } from "../Config";
import { ORMDatabase } from "@app/orm/ORMDatabase";
import { ServeStatus } from "@app/orm/entities/ServeEntity";
import { ServeService } from "@app/modules/serve/ServeService";
import { getPort } from "get-port-please";

@cli.controller("serve")
export class ServeCommand implements Command {
  constructor(
    protected logger: Logger,
    private config: Config,
    private orm: ORMDatabase,
    private serveService: ServeService
  ) {}

  async execute(
    @arg name: string,
    @flag.char("p") port?: number,
    @flag.char("s") signal?: string
  ) {
    port = port || (await getPort());
    signal = signal || "start";

    switch (signal) {
      case "start":
        await this.serveService.createOrStart({
          name,
          port: port,
          status: ServeStatus.STARTING,
        });
        break;
      case "stop":
        await this.serveService.stop(name);
        break;
    }
    await this.serveService.printList();

    return process.exit(0);
  }
}
