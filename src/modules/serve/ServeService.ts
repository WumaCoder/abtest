// ServeService
import { Serve, ServeStatus } from "@app/orm/entities/ServeEntity";
import { ORMDatabase } from "@app/orm/ORMDatabase";
import { toMatrix } from "@tools/toMatrix";
import { table } from "table";
import find from "find-process";
import { Logger } from "@deepkit/logger";
import { make } from "@tools";
import { CreateServeDto } from "./dto/CreateServeDto";
import { openSync } from "fs";
import { Config } from "@app/Config";
import { join } from "path";
import { spawn } from "child_process";

export class ServeService {
  outLog = openSync(join(this.config.runtimePath, "./abtest-serve.log"), "a");
  errLog = openSync(
    join(this.config.runtimePath, "./abtest-serve.err.log"),
    "a"
  );
  constructor(
    private orm: ORMDatabase,
    private logger: Logger,
    private config: Config
  ) {}

  async createOrStart(dto: CreateServeDto) {
    const serve = await this.start(dto.name, dto.port);
    return serve;
  }

  async start(name: string, port: number) {
    this.logger.info("Starting server...");

    let serve = await this.orm
      .query(Serve)
      .filter({ name })
      .findOneOrUndefined();

    if (!serve) {
      serve = make(Serve, {
        name,
        pid: 0,
        port,
        status: ServeStatus.STARTING,
      });
    }

    if (serve.status === ServeStatus.RUNNING) {
      this.logger.warning(
        `<yellow>Server ${serve.name} is already running.</yellow>`
      );
      return serve;
    }

    const child = spawn(
      "node",
      [join(this.config.rootPath, "dist/main.js"), "server:start"],
      {
        env: {
          ...process.env,
          PORT: String(port),
        },
        detached: true,
        stdio: ["ignore", this.outLog, this.errLog],
      }
    );

    child.unref();

    if (!child.pid) {
      serve.status = ServeStatus.DEAD;
      serve.pid = 0;
      this.logger.error(`Failed to start '${serve.name}' server.`);
    } else {
      serve.status = ServeStatus.RUNNING;
      serve.pid = child.pid;
      serve.port = port;
    }

    await this.orm.persist(serve);

    this.logger.info(`Server started PID: ${child.pid}.`);
    return serve;
  }

  async stop(name: string) {
    const serve = await this.orm.query(Serve).filter({ name }).findOne();
    if (!serve) throw new Error(`Server '${name}' not found.`);

    if (serve.status === ServeStatus.STOPPED) {
      this.logger.warning(
        `<yellow>Server ${serve.name} is already stopped.</yellow>`
      );
      return serve;
    }

    if (serve.status === ServeStatus.STOPPING) {
      this.logger.warning(
        `<yellow>Server ${serve.name} is already stopping.</yellow>`
      );
      return serve;
    }

    serve.status = ServeStatus.STOPPING;
    await this.orm.persist(serve);
    process.kill(serve.pid);
    // await terminate(serve.pid);

    serve.status = ServeStatus.STOPPED;
    await this.orm.persist(serve);

    this.logger.info(`Server ${serve.name}(${serve.pid}) stopped.`);
    await this.syncState();
    return serve;
  }

  async printList() {
    await this.syncState();
    const list = await this.orm.query(Serve).find();

    const showTable = table(toMatrix(list));

    this.logger.info(showTable);
  }

  async syncState() {
    const list = await this.orm
      .query(Serve)
      .filter({ status: { $nin: [ServeStatus.STOPPED, ServeStatus.STOPPING] } })
      .find();

    for (const serve of list) {
      const childProcess = await find("pid", serve.pid);
      serve.status = childProcess.length
        ? ServeStatus.RUNNING
        : ServeStatus.DEAD;

      await this.orm.persist(serve);
    }

    this.logger.debug("sync state done");
  }
}
