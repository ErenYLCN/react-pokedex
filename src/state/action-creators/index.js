export const changeTheme = () => {
    return  { type: "changeTheme" }
}

export const catchPokemon = (pokemon) => {
    return  { type: "catchPokemon", payload: pokemon }
}

export const releasePokemon = (pokemonId) => {
    return  { type: "releasePokemon", payload: pokemonId }
}

