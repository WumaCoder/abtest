import { createModule } from "@deepkit/app";
import { Config } from "@app/Config";
import { SubappService } from "./SubappService";

export class SubappModule extends createModule({ config: Config }) {
  providers = [SubappService];
  exports = [SubappService];
}
