const logger = require("../loaders/logger");
const axios = require("axios");
const pokemonDto = require("./pokemonDto");
const getDataBySearchName = async (search) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}?limit=2&offset=0`);
    const data = response.data;
    const { count, results } = data

    //TODO: chequea si devuelve un solo resultado, si es asi lo convierte en array
    if (!count && !Array.isArray(results)) {
      return { totalPages: 0, pokemons: pokemonDto([data]) };
    }
    const details = await Promise.all(results.map(async (pokemon) => {
      const detailResponse = await axios.get(pokemon.url ? pokemon.url : "");
      return detailResponse.data;
    }));
    return { totalPages: count, pokemons: pokemonDto(details) };
  } catch (error) {
    if (error.response.status === 404) {
      return { totalPages: 0, pokemons: [] };
    }

    throw error;
  }
};
const getDataBySearchType = async (search, page=1) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${search}?limit=2&offset=0`);
    const data = response.data;
    let { pokemon } = data
    const totalPages = pokemon.length;
    // paginar manualmente  ya que la api no devuelve la cantidad de paginas
    const offset = (page - 1) * 2;
    const limit = page * 2;
    if (pokemon.length < limit) {
      pokemon = pokemon.slice(offset, pokemon.length);
    } else {
      pokemon = pokemon.slice(offset, limit);
    }

    const details = await Promise.all(pokemon.map(async (poke) => {
      const detailResponse = await axios.get(poke.pokemon.url ? poke.pokemon.url : "");
      return detailResponse.data;
    }));
    return { totalPages: totalPages, pokemons: pokemonDto(details) };
  } catch (error) {
    if (error.response.status === 404) {
      return { totalPages: 0, pokemons: [] };
    }

    throw error;
  }
};

module.exports = {
  getDataBySearchName,
  getDataBySearchType
};

