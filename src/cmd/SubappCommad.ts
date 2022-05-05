import { Logger } from "@deepkit/logger";
import { arg, cli, Command, flag } from "@deepkit/app";
import { Config } from "../Config";

@cli.controller("subapp")
export class SubappCommand implements Command {
  constructor(protected logger: Logger, private config: Config) {}

  async execute(
    @arg name: string,
    @flag.char("p") port?: number,
    @flag.char("s") signal?: string
  ) {
    return process.exit(0);
  }
}
