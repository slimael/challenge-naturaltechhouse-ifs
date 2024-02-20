const pokemonService = require("../services/pokemonService");
const logger = require("../loaders/logger");
const { request, response } = require("express");

const getPokemons = async (req = request, res = response, next) => {
  try {
    const { page, search } = req.query;
    const dataByName =  await pokemonService.getDataBySearchName(search, page)
    if (dataByName.totalPages > 0) {
      return res.status(200).json(dataByName);
    }
    const dataByType = await pokemonService.getDataBySearchType(search, page);
    if (dataByType.totalPages === 0) {
      return res.status(404).json({ message: "No se encontraron pokemones" });
    }
    res.status(200).json(dataByType);
  } catch (error) {
    next(error);
  }
};
const getPokemon = async (req = request, res = response, next) => {
  try {
    const { name } = req.params;
    const dataByName =  await pokemonService.getDataBySearchName(name, 0)
    res.status(200).json({pokemon:dataByName.pokemons.pop()});
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPokemon,
  getPokemons

};