import React from 'react'
import "./PokeCollection.css"
import { useSelector } from "react-redux"
import { PokemonCard } from "../PokemonCard/PokemonCard"

export const PokeCollection = (props) => {

    const { history } = props;

    const state = useSelector((state) => state);
    const { collection } = state;
    console.log(state)

    function goToRoute(pokemonId) {
        history.push(`/pokemon/${pokemonId}`);
    }

    return (
        <div className="pokelist-content">
            {
                collection.map((pokemonData) => {
                    return (
                        <button className="card-btn" onClick={() => goToRoute(pokemonData.id)}  >
                            <PokemonCard cardData={pokemonData} key={pokemonData.id} />
                        </button>
                    );
                })
            }
        </div>
    )
}
