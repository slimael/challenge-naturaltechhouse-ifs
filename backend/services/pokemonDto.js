const pokemonDto = (pokemonData) =>{
   const data = pokemonData.map(pokemon => {
        return {
          name: pokemon.name,
          abilities: abilitiesDto(pokemon.abilities),
          types: typesDto(pokemon.types),
          stats: statsDto(pokemon.stats),
          image: pokemon.sprites.front_default
        };
      });
      return data    
}

const typesDto = (typesData) =>{
  const data = typesData.map(data => {
       return {
         name: data.type.name,
       };
     });
     return data    
}

const statsDto = (statsData) =>{
    const data = statsData.map(data => {
         return {
             name: data.stat.name,
             base: data.base_stat,
         };
         });
         return data    
    }
const abilitiesDto = (abilitiesData) =>{
    const data = abilitiesData.map(data => {
         return {
             name: data.ability.name,
         };
         });
         return data    
    } 

module.exports = pokemonDto
;  

