import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("friends", (table) => {
    table.integer("user_id").notNullable();
    table.foreign("user_id").references("users.id");
    table.integer("friend_id").notNullable();
    table.foreign("friend_id").references("users.id");
  });
}

export async function down(knex: Knex): Promise<void> {}
