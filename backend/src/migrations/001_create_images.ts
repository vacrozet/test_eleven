import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("images", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("path").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("images");
}
