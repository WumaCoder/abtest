import { Logger } from "@deepkit/logger";
import { arg, cli, Command, flag } from "@deepkit/app";
import { Config } from "../Config";
import { openSync } from "fs";
import { join } from "path";
import { spawn } from "child_process";
import { ORMDatabase } from "@app/orm/ORMDatabase";
import { make } from "@tools";
import { Serve, ServeStatus } from "@app/orm/entities/ServeEntity";
import { ServeService } from "@app/modules/serve/ServeService";
import { SubappService } from "../modules/subapp/SubappService";

@cli.controller("list")
export class ListCommand implements Command {
  constructor(
    protected logger: Logger,
    private serveModule: ServeService,
    private subappService: SubappService
  ) {}

  async execute(@arg name?: string) {
    if (name) {
      await this.subappService.printList(
        await this.serveModule.findOneOrFail(name)
      );
      return process.exit(0);
    }
    await this.serveModule.printList();
    return process.exit(0);
  }
}
