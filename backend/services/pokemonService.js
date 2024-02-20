const logger = require("../loaders/logger");
const axios = require("axios");
const pokemonDto = require("./pokemonDto");
const limit = 8;
const getDataBySearchName = async (search = '', page) => {
  try {
    const offset = parseInt(page) === 0 || parseInt(page) === 1 ? 0 : Math.abs(limit * page - limit);

    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search}?limit=${limit}&offset=${offset}`);
    const data = response.data;
    const { count, results } = data

    //TODO: chequea si devuelve un solo resultado, si es asi lo convierte en array
    if (!count && !Array.isArray(results)) {
      return { totalPages: 1, pokemons: pokemonDto([data]) };
    }
    const details = await Promise.all(results.map(async (pokemon) => {
      const detailResponse = await axios.get(pokemon.url ? pokemon.url : "");
      return detailResponse.data;
    }));
    return { totalPages: Math.floor(count / limit), pokemons: pokemonDto(details) };
  } catch (error) {
    if (error.response.status === 404) {
      return { totalPages: 0, pokemons: [] };
    }

    throw error;
  }
};
const getDataBySearchType = async (search, page = 1) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/type/${search}`);
    const data = response.data;
    let { pokemon } = data
    const totalPages = pokemon.length;
    // paginar manualmente  ya que la api no devuelve la cantidad de paginas
    const offset = (parseInt(page) - 1 ) * 2;    
    if (pokemon.length < offset) {
      pokemon = pokemon.slice(offset, pokemon.length);
    } else {
      pokemon = pokemon.slice(offset, offset + limit);
    }

    const details = await Promise.all(pokemon.map(async (poke) => {
      const detailResponse = await axios.get(poke.pokemon.url ? poke.pokemon.url : "");
      return detailResponse.data;
    }));
    return { totalPages: totalPages / limit , pokemons: pokemonDto(details) };
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

