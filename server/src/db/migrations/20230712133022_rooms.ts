import { Knex } from "knex";

const tables = ["cookies", "relation", "rooms", "users", "friends"];

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("rooms", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.text("messages").notNullable().defaultTo("");
  });
}

export async function down(knex: Knex): Promise<boolean[]> {
  return Promise.all(
    tables.map(async function (table) {
      try {
        console.log(table, "down start");
        await knex.raw(`DROP TABLE IF EXISTS "${table}" CASCADE`);
        console.log(table, "down finish");
      } catch (err: any) {
        console.error(err.detail);
      }

      return true;
    })
  );
}
