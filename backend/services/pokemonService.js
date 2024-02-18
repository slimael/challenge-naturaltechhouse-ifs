const logger = require("../loaders/logger");
const axios = require("axios");
const pokemonDto = require("./pokemonDto");
const getDataBySearch = async (search) => {
  try {
    logger.silly("Service - getDataBySearch: called...");
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=2&offset=0`);
    const data = response.data;
    const details = await Promise.all(data.results.map(async (pokemon) => {
    const detailResponse = await axios.get(pokemon.url?pokemon.url:"");
      return detailResponse.data;
    }));
    logger.info("Service - getDataBySearch: success", details);
    return pokemonDto(details);
  } catch (error) {
    logger.error("Service - getDataBySearch: error", error);
    throw error;
  }
};

module.exports = {
  getDataBySearch,
};

