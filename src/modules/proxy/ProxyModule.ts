import { createModule } from "@deepkit/app";
import { Config } from "@app/Config";
import { ProxyService } from "./ProxyService";

export class ProxyModule extends createModule({ config: Config }) {
  providers = [ProxyService];
  exports = [ProxyService];
}
