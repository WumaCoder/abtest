import { eventDispatcher } from "@deepkit/event";
import { onServerMainBootstrapDone } from "@deepkit/framework";
import { ServeService } from "@app/modules/serve/ServeService";
import { sleep } from "@deepkit/core";

export class LoopTaskEvent {
  constructor(private serveService: ServeService) {}

  @eventDispatcher.listen(onServerMainBootstrapDone)
  async onServerStart(event: typeof onServerMainBootstrapDone.event) {
    this.process();
  }

  async process() {
    const INTERVAL = 1;

    const loopTask = async () => {
      while (true) {
        await sleep(INTERVAL);
        await this.serveService.syncState();
      }
    };

    setImmediate(loopTask);
    await this.serveService.syncState();
    await this.serveService.printList();
  }
}
