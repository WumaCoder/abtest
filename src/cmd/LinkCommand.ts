import { Logger } from "@deepkit/logger";
import { arg, cli, Command } from "@deepkit/app";
import { Config } from "../Config";
import { ServeService } from "@app/modules/serve/ServeService";
import { ProxyService } from "../modules/proxy/ProxyService";
import { cosmiconfig } from "cosmiconfig";
import { parse } from "path";

@cli.controller("link")
export class LinkCommand implements Command {
  constructor(
    protected logger: Logger,
    private config: Config,
    private proxyService: ProxyService,
    private serveService: ServeService
  ) {}

  async execute(@arg serveName?: string) {
    const explorer = cosmiconfig(this.config.name);

    const cfgRes = await explorer.search();

    if (!cfgRes) {
      this.logger.error("No config found.");
      return process.exit(0);
    }

    const configPath = parse(cfgRes.filepath);
    const serve = serveName ?? cfgRes.config.serve;

    await this.proxyService.link({
      serve: await this.serveService.findOneOrFail(serve),
      rootPath: configPath.dir,
      configPath: configPath.base,
      name: cfgRes.config.name,
      port: cfgRes.config.port,
    });

    await this.proxyService.printList(serve);

    return process.exit(0);
  }
}
