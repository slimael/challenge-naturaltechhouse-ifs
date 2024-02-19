const pokemonService = require("../services/pokemonService");
const logger = require("../loaders/logger");
const { request, response } = require("express");

const getPokemons = async (req = request, res = response, next) => {
  try {
    const dataByName = await pokemonService.getDataBySearchName(req.query.search)
    if (dataByName.totalPages > 0) {
      return res.status(200).json(dataByName);
    } 
    const dataByType = await pokemonService.getDataBySearchType(req.query.search);
    if (!dataByType.totalPages === 0) {
      return res.status(404).json({ message: "No se encontraron pokemones" });
    }
    res.status(200).json(dataByType);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPokemons,
  
};