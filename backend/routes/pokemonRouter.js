const { Router } = require("express");
const { getPokemons, getPokemon } = require("../controllers/pokemonController");

const router = Router();

router.get("/pokemon", getPokemons);
router.get("/pokemon/:name", getPokemon);

module.exports = router;