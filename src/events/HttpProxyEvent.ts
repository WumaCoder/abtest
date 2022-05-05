import { eventDispatcher } from "@deepkit/event";
import { httpWorkflow } from "@deepkit/http";
import { Logger } from "@deepkit/logger";
import httpProxy from "http-proxy";
import { SubappService } from "../modules/subapp/SubappService";
import { Config } from "@app/Config";

var proxy = httpProxy.createProxyServer({});

export class HttpProxyEvent {
  constructor(
    private logger: Logger,
    private subappService: SubappService,
    private config: Config
  ) {}

  @eventDispatcher.listen(httpWorkflow.onRouteNotFound)
  async onRouteNotFound(event: typeof httpWorkflow.onRouteNotFound.event) {
    const id = event.request.headers["x-abtest-id"] as string;
    const subapp = await this.subappService.findOne(id);
    if (!subapp) {
      return;
    }
    if (subapp.port === this.config.port) {
      return;
    }
    const now = Date.now();
    const target = `http://127.0.0.1:${subapp.port}`;
    proxy.web(
      event.request,
      event.response,
      {
        target,
      },
      (err) => {
        this.logger.error(
          `Proxy ${event.request.method} '${event.request.url}' to 'http://127.0.0.1:3002${event.request.url}' Error: ${err}`
        );
      }
    );
    this.logger.log(
      `Proxy ${event.request.method} '${event.request.url}' to '${target}${
        event.request.url
      }' <green>${Date.now() - now}ms</green>`
    );
    event.stopPropagation();
  }
}
