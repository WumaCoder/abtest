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

@cli.controller("list")
export class ListCommand implements Command {
  constructor(protected logger: Logger, private serveModule: ServeService) {}

  async execute(@arg name?: string) {
    await this.serveModule.printList();
    return 0;
  }
}
