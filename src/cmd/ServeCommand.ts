import { Logger } from "@deepkit/logger";
import { arg, cli, Command, flag } from "@deepkit/app";
import { Config } from "../Config";
import { openSync } from "fs";
import { join } from "path";
import { spawn } from "child_process";
import { ORMDatabase } from "@app/orm/ORMDatabase";
import { make } from "@tools";
import { Serve, ServeStatus } from "@app/orm/entities/ServeEntity";
import { ServeService } from "@app/modules/serve/ServeService";

@cli.controller("serve")
export class ServeCommand implements Command {
  constructor(
    protected logger: Logger,
    private config: Config,
    private orm: ORMDatabase,
    private serveService: ServeService
  ) {}

  async execute(@arg name: string, @flag port?: number) {
    const outLog = openSync(
      join(this.config.runtimePath, "./abtest-serve.log"),
      "a"
    );
    const errLog = openSync(
      join(this.config.runtimePath, "./abtest-serve.err.log"),
      "a"
    );
    this.logger.info("Starting server...");

    const child = spawn(
      "node",
      [join(this.config.rootPath, "dist/main.js"), "server:start"],
      {
        env: {
          ...process.env,
          PORT: String(port) ?? this.config.port,
        },
        detached: true,
        stdio: ["ignore", outLog, errLog],
      }
    );

    child.unref();

    await this.orm.persist(
      make(Serve, {
        name: name,
        pid: child.pid,
        port: port,
        status: ServeStatus.STARTED,
      })
    );

    this.logger.info(`Server started PID: ${child.pid}.`);

    await this.serveService.printList();

    return 0;
  }
}
