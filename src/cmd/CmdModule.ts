import { createModule } from "@deepkit/app";
import { Config } from "../Config";
import { ConfigCommand } from "./ConfigCommand";
import { InitCommand } from "./InitCommand";
import { ServeCommand } from "./ServeCommand";
import { ListCommand } from "./ListCommand";
import { SubappCommand } from "./SubappCommad";

export class CmdModule extends createModule({
  config: Config,
  controllers: [
    ConfigCommand,
    InitCommand,
    ServeCommand,
    ListCommand,
    SubappCommand,
  ],
}) {}
