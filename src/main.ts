import "@boot";
import { App } from "@deepkit/app";
import { FrameworkModule } from "@deepkit/framework";
import { config, Config } from "./Config";
import { ORMModule } from "./orm/ORMModule";
import { HttpProxyEvent } from "./events/HttpProxyEvent";
import { CmdModule } from "./cmd/CmdModule";
import { ServeModule } from "./modules/serve/ServeModule";
import { LoopTaskEvent } from "./events/LoopTaskEvent";
import { SubappModule } from "./modules/subapp/SubappModule";

new App({
  config: Config,
  imports: [
    new FrameworkModule({
      debug: true,
      migrateOnStartup: true,
      port: +config().port,
    }),
    new CmdModule(),
    new ORMModule(),
    new ServeModule(),
    new SubappModule(),
  ],
  listeners: [HttpProxyEvent, LoopTaskEvent],
}).run();
