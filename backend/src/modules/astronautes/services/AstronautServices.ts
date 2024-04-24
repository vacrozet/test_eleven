import knex from "../../../db";

export default {
  get: async () => {
    const astronauts = (
      await knex("astronauts")
        .select(
          "planets.*",
          "astronauts.*",
          "images.path",
          "images.name as imageName"
        )
        .join("planets", "planets.id", "=", "astronauts.originPlanetId")
        .join("images", "images.id", "=", "planets.imageId")
    ).map(
      ({
        id,
        firstname,
        lastname,
        name,
        isHabitable,
        description,
        path,
        imageName,
      }) => ({
        id,
        firstname,
        lastname,
        originPlanet: {
          name,
          isHabitable,
          description,
          image: {
            path,
            name: imageName,
          },
        },
      })
    );
    return astronauts;
  },
  getById: async (id: number) => {
    const astronaut = await knex("astronauts")
      .select(
        "planets.*",
        "astronauts.*",
        "images.path",
        "images.name as imageName"
      )
      .join("planets", "planets.id", "=", "astronauts.originPlanetId")
      .join("images", "images.id", "=", "planets.imageId")
      .where("astronauts.id", id)
      .first();
    return astronaut;
  },
  create: async ({
    firstname,
    lastname,
    originPlanetId,
  }: {
    firstname: string;
    lastname: string;
    originPlanetId: number;
  }) => {
    return knex
      .insert({ firstname, lastname, originPlanetId })
      .into("astronauts");
  },
  update: async ({
    id,
    firstname,
    lastname,
    originPlanetId,
  }: {
    id: number;
    firstname: string;
    lastname: string;
    originPlanetId: number;
  }) => {
    return knex
      .update({ firstname, lastname, originPlanetId })
      .from("astronauts")
      .where("id", id);
  },
  delete: async (id: number) => {
    return knex("astronauts").where("id", id).del();
  },
};
