import { eventDispatcher } from "@deepkit/event";
import { onServerMainBootstrapDone } from "@deepkit/framework";

export class LoopEvent {
  @eventDispatcher.listen(onServerMainBootstrapDone)
  onServerStart(event: typeof onServerMainBootstrapDone.event) {
    console.log("Server bootstrapped!");
  }

  check() {}
}
