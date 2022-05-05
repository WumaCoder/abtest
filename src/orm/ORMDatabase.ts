import { Database } from "@deepkit/orm";
import { SQLiteDatabaseAdapter } from "@deepkit/sqlite";
import { Config } from "../Config";
import { User } from "./entities/UserEntity";
import { Role } from "./entities/RoleEntity";
import { UserJoinRole } from "./entities/UserJoinRoleEntity";
import { Serve } from "./entities/ServeEntity";
import { Subapp } from "./entities/SubappEntity";

export class ORMDatabase extends Database {
  name = "default";
  constructor(config: Config) {
    const database = config.database;
    super(new SQLiteDatabaseAdapter(database.path), [
      User,
      Role,
      UserJoinRole,
      Serve,
      Subapp,
    ]);
  }
}
