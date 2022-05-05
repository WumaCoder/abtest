import { Database } from "@deepkit/orm";
import { SQLiteDatabaseAdapter } from "@deepkit/sqlite";
import { Config } from "../Config";
import { Serve } from "./entities/ServeEntity";
import { ProxyRecord } from "./entities/ProxyRecordEntity";

export class ORMDatabase extends Database {
  name = "default";
  constructor(config: Config) {
    const database = config.database;
    super(new SQLiteDatabaseAdapter(database.path), [Serve, ProxyRecord]);
  }
}
