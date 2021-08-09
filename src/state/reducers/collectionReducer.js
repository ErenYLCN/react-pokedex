const reducer = (state = [], action) => {
    switch (action.type) {
        case "catchPokemon":
            state.push(action.payload);
            return state;
        case "releasePokemon":
            return state.filter((value) => {return value.id != action.payload});
        default:
            return state;
    }
}

export default reducer;