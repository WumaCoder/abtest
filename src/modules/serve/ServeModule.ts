import { createModule } from "@deepkit/app";
import { ServeService } from "./ServeService";

export class ServeModule extends createModule({}) {
  providers = [ServeService];
  exports = [ServeService];
}
