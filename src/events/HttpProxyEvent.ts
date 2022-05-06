import { eventDispatcher } from "@deepkit/event";
import { httpWorkflow } from "@deepkit/http";
import { Logger } from "@deepkit/logger";
import httpProxy from "http-proxy";
import { Config } from "@app/Config";
import { ProxyService } from "../modules/proxy/ProxyService";

var proxy = httpProxy.createProxyServer({});

export class HttpProxyEvent {
  constructor(
    private logger: Logger,
    private proxyService: ProxyService,
    private config: Config
  ) {}

  @eventDispatcher.listen(httpWorkflow.onRouteNotFound)
  async onRouteNotFound(event: typeof httpWorkflow.onRouteNotFound.event) {
    const idOrName = event.request.headers[this.config.xHeader] as string;
    const record = await this.proxyService.findOne(idOrName);

    if (!record) {
      return;
    }
    if (record.port === this.config.port) {
      return;
    }
    const now = Date.now();
    const target = `http://127.0.0.1:${record.port}`;
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
