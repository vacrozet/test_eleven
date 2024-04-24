import knex from "../db";

export default {
  get: async () => {
    const images = await knex("images").select("*");
    return images;
  },

  getById: async (id: number) => {
    const image = await knex("images").where("id", id).first();
    return image;
  },

  create: async ({ name, path }: { name: string; path: string }) => {
    const [id] = await knex("images").insert({ name, path });
    return id;
  },

  update: async ({
    id,
    name,
    path,
  }: {
    id: number;
    name: string;
    path: string;
  }) => {
    const updatedRows = await knex("images")
      .where("id", id)
      .update({ name, path });
    return updatedRows;
  },

  delete: async (id: number) => {
    const deletedRows = await knex("images").where("id", id).del();
    return deletedRows;
  },
};
