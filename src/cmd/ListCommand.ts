import { Logger } from "@deepkit/logger";
import { arg, cli, Command, flag } from "@deepkit/app";
import { ServeService } from "@app/modules/serve/ServeService";
import { ProxyService } from "@app/modules/proxy/ProxyService";

@cli.controller("list")
export class ListCommand implements Command {
  constructor(
    protected logger: Logger,
    private serveModule: ServeService,
    private proxyService: ProxyService
  ) {}

  async execute(@arg name?: string) {
    if (name) {
      await this.proxyService.printList(
        await this.serveModule.findOneOrFail(name)
      );
      return process.exit(0);
    }
    await this.serveModule.printList();
    return process.exit(0);
  }
}
