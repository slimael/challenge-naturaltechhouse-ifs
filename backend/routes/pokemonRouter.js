const { Router } = require("express");
const { getPokemons } = require("../controllers/pokemonController");

const router = Router();

router.get("/pokemon", getPokemons);

module.exports = router;