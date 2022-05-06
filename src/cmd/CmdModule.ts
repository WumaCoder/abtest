import { createModule } from "@deepkit/app";
import { Config } from "../Config";
import { ConfigCommand } from "./ConfigCommand";
import { InitCommand } from "./InitCommand";
import { ServeCommand } from "./ServeCommand";
import { ListCommand } from "./ListCommand";
import { ProxyCommand } from "./ProxyCommand";
import { LinkCommand } from "./LinkCommand";

export class CmdModule extends createModule({
  config: Config,
  controllers: [
    ConfigCommand,
    InitCommand,
    ServeCommand,
    ListCommand,
    ProxyCommand,
    LinkCommand,
  ],
}) {}
