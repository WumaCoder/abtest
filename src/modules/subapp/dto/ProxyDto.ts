import { Subapp } from "@app/orm/entities/SubappEntity";

export interface ProxyDto extends Pick<Subapp, "name" | "serve" | "port"> {}
