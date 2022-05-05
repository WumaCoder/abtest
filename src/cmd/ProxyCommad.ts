import { Logger } from "@deepkit/logger";
import { arg, cli, Command, flag } from "@deepkit/app";
import { Config } from "../Config";
import { SubappService } from "../modules/subapp/SubappService";
import { ServeService } from "@app/modules/serve/ServeService";
import { getPort } from "get-port-please";

@cli.controller("proxy")
export class ProxyCommand implements Command {
  constructor(
    protected logger: Logger,
    private config: Config,
    private subappService: SubappService,
    private serveService: ServeService
  ) {}

  async execute(
    @arg name: string,
    @flag.char("s") serve: string,
    @flag.char("p") port?: number
  ) {
    await this.subappService.proxy({
      name,
      serve: await this.serveService.findOneOrFail(serve),
      port: port || ((await getPort()) as number),
    });

    this.logger.info(`<green>Proxy ${name} created.</green>`);

    return process.exit(0);
  }
}
