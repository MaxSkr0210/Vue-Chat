import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("relation", (table) => {
    table.integer("room_id").notNullable();
    table.foreign("room_id").references("rooms.id");
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("users.id");
  });
}

export async function down(knex: Knex): Promise<void> {}
