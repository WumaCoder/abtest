import { Common } from "@app/orm/entities/CommonEntity";
import { Serve } from "@app/orm/entities/ServeEntity";
import { ChildProcess } from "child_process";

export interface CreateServeDto extends Omit<Serve, keyof Common | "pid"> {}
