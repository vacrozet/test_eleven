import knex from "../../../db";

export default {
  get: async ({ filterName = null }: { filterName: string | null }) => {
    const planets = (
      await knex("planets")
        .select("planets.*", "images.path", "images.name as imageName")
        .join("images", "images.id", "=", "planets.imageId")
        .where((queryBuilder) => {
          if (filterName) {
            queryBuilder.where("planets.name", "LIKE", `${filterName}%`);
          }
        })
    ).map(({ id, name, isHabitable, description, path, imageName }) => ({
      id,
      name,
      isHabitable,
      description,
      image: {
        path,
        name: imageName,
      },
    }));
    return planets;
  },

  getById: async (id: number) => {
    const planet = await knex("planets")
      .select(
        "planets.*",
        "images.id",
        "images.path",
        "images.name as imageName"
      )
      .join("images", "images.id", "=", "planets.imageId")
      .where("planets.id", id)
      .first();
    return planet;
  },

  create: async ({
    name,
    isHabitable,
    imageId,
  }: {
    name: string;
    isHabitable: boolean;
    imageId: number;
  }) => {
    const [id] = await knex("planets").insert({ name, isHabitable, imageId });
    return id;
  },

  update: async ({
    id,
    name,
    isHabitable,
    imageId,
  }: {
    id: number;
    name: string;
    isHabitable: boolean;
    imageId: number;
  }) => {
    const updatedRows = await knex("planets")
      .where("id", id)
      .update({ name, isHabitable, imageId });
    return updatedRows;
  },

  delete: async (id: number) => {
    const deletedRows = await knex("planets").where("id", id).del();
    return deletedRows;
  },
};
