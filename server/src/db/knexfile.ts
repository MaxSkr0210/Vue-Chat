import { Knex } from "knex";
import { DBConfig as connection } from "../config";

interface IKnexConfig {
  [key: string]: Knex.Config;
}

console.dir(connection);

const config: IKnexConfig = {
  development: {
    client: "pg",
    connection,
    migrations: {
      tableName: "knex_migrations",
    },
  },
  production: {
    client: "pg",
    connection,
    migrations: {
      tableName: "knex_migrations",
    },
  },
};

module.exports = config;
