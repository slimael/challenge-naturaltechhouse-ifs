const pokemonService = require("../services/pokemonService");
const logger = require("../loaders/logger");
const { request, response } = require("express");

const getPokemons = async (req = request, res = response, next) => {
  logger.silly(" Controller - getPokemons: called...");
  try {
    res.status(200).json(await pokemonService.getDataBySearch(req.query.search));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPokemons,
  
};