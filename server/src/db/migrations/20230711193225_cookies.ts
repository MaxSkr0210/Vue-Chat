import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cookies", (table) => {
    table.integer("user_id").primary();
    table.foreign("user_id").references("users.id");
    table.string("cookie").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cookies");
}
