import React, { useState, useEffect } from 'react'
import './PokeList.css'
import { PokemonCard } from './../PokemonCard/PokemonCard'
import axios from 'axios'

export const PokeList = (props) => {
    const { history } = props;
    const [pokemonData, setPokemonData] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=898`)
            .then(function (response) {
                 const { data } = response;
                 const { results } = data;
                 const newPokemonData = {};
                 results.forEach((pokemon, index) => {
                    newPokemonData[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
                    };
                 })
                 setPokemonData(newPokemonData)
                 setLoading(false);
            });
    }, [])

    function goToRoute(pokemonId) {
        history.push(`/pokemon/${pokemonId}`);
    }


    if (isLoading) {
        return (
            <div className="pokelist-content">
                <span className="loading" >Loading...</span>
            </div>
        );
    }

    return (
        <div className="pokelist-content">
            {
                Object.keys(pokemonData).map((pokemonId) => {
                    return (
                        <button className="card-btn" onClick={() => goToRoute(pokemonId) } >
                            <PokemonCard cardData={pokemonData[pokemonId]} key={pokemonId} />
                        </button>
                    );
                })
            }
        </div>
    );
}
