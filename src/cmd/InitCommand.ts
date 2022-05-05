import { Logger } from "@deepkit/logger";
import { cli, Command } from "@deepkit/app";
import { Config } from "../Config";
import { ORMDatabase } from "../orm/ORMDatabase";

@cli.controller("init")
export class InitCommand implements Command {
  constructor(
    protected logger: Logger,
    private config: Config,
    private orm: ORMDatabase
  ) {}

  async execute() {
    await this.orm.migrate();
    return process.exit(0);
  }
}
