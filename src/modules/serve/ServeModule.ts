import { createModule } from "@deepkit/app";
import { ServeService } from "./ServeService";
import { Config } from "@app/Config";

export class ServeModule extends createModule({ config: Config }) {
  providers = [ServeService];
  exports = [ServeService];
}
