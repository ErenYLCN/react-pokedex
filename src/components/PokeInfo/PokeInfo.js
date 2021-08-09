import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './PokeInfo.css'
import './../../Helpers/CardBackground.css'
import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "../../state/index"

export const PokeInfo = (props) => {

    const theme = useSelector((state) => state.theme);
    const collection = useSelector((state) => state.collection)
    const dispatch = useDispatch();
    const { catchPokemon, releasePokemon } = bindActionCreators(actionCreators, dispatch);

    const { history } = props;

    const { match } = props;
    const { params } = match;
    const { pokemonId } = params;

    const [pokemonData, setPokemonData] = useState(undefined);
    const [evolutionDataUrl, setEvolutionDataUrl] = useState(undefined);
    const [evolutionChain, setEvolutionChain] = useState(undefined);
    const [inCollection, setInCollection] = useState(false);

    useEffect(() => {
        setInCollection(false)
        collection.map((item) => {
            if (pokemonId == item.id) {
                setInCollection(true)
            }
        })
    }, [pokemonId]);

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(function (response) {
                 const { data } = response;
                 setPokemonData(data);
            });
    }, [pokemonId])

    useEffect(() => {
        if(pokemonData) {
            axios
            .get(pokemonData.species.url)
            .then(function (response) {
                 setEvolutionDataUrl(response.data.evolution_chain.url);
            });
        }
    }, [pokemonData])

    useEffect(() => {
        if(evolutionDataUrl) {
            axios
            .get(evolutionDataUrl)
            .then(function (response) {
                 let evolutions = [];
                 let smallest = response.data.chain.species;
                 let smallestUrl = smallest.url.split("/");
                 let smallestId = smallestUrl[smallestUrl.length-2];
                 evolutions.push({
                     name: smallest.name,
                     id: smallestId
                 });
                 if(response.data.chain.evolves_to.length != 0) {
                    let medium = response.data.chain.evolves_to[0].species;
                    let mediumUrl = medium.url.split("/");
                    let mediumId = mediumUrl[mediumUrl.length-2];
                    evolutions.push({
                        name: medium.name,
                        id: mediumId
                    });
                    if(response.data.chain.evolves_to[0].evolves_to.length != 0) {
                        let large = response.data.chain.evolves_to[0].evolves_to[0].species;
                        let largeUrl = large.url.split("/");
                        let largeId = largeUrl[largeUrl.length-2];
                        evolutions.push({
                            name: large.name,
                            id: largeId
                        });
                     }
                 }
                 setEvolutionChain(evolutions);
            });
        }
    }, [evolutionDataUrl])

    function goToRoute(pokemonId) {
        history.push(`/pokemon/${pokemonId}`)
    }

    function catchOrReleasePokemon() {
        if (!inCollection) {
            catchPokemon(pokemonData);
            setInCollection(true);
        }
        else {
            releasePokemon(pokemonId);
            setInCollection(false);
        }
        
    }

    if (evolutionChain) {
        return (
            <div className="pokeinfo">
                <div className="pokeinfo-content">
                    <div className={`pokeinfo-card-${theme} ${pokemonData.types[0].type.name}`}>
                        <div className="pokeinfo-leftside">
                            <img src={pokemonData.sprites.other["official-artwork"].front_default} className="pokeinfo-sprite" />
                            <div className="card-element-name">
                                <div className="card-elements">
                                    {pokemonData.types.map((type) => {
                                        return (
                                            <img src={`${process.env.PUBLIC_URL}/assets/typeIcons/${type.type.name}.png`} className="element-icon" />
                                        )
                                    })}
                                </div>
                                <div className="card-name">
                                    {pokemonData.name}
                                </div>
                            </div>
                        </div>
                        <div className="pokeinfo-rightside" >

                            <div className="pokeinfo-stats">
                                <div className="pokeinfo-info-title">Stats</div>
                                <div className="pokeinfo-stats-body">
                                    {pokemonData.stats.map((stat) => {
                                        return (
                                            <div className="pokeinfo-stat">
                                                <div className="pokeinfo-stat-title">{stat.stat.name}</div>
                                                <div className="pokeinfo-stat-value">{stat.base_stat}</div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div> 

                            <div className="pokeinfo-other">
                                    <div className="pokeinfo-other-column">
                                        <div className="pokeinfo-info-title">Height</div>
                                        <div className="pokeinfo-stat-value">{pokemonData.height}</div>
                                    </div>
                                    <div className="pokeinfo-other-column">
                                        <div className="pokeinfo-info-title">Weight</div>
                                        <div className="pokeinfo-stat-value">{pokemonData.weight}</div>
                                    </div>
                                    <div className="pokeinfo-other-column">
                                        <div className="pokeinfo-info-title">Abilities</div>
                                        <div className="pokeinfo-stat-value">
                                            {pokemonData.abilities.map((ability) => {
                                                return (<li>{ability.ability.name} {ability.is_hidden ? ("(hidden)") : ("")}</li>);
                                            })}
                                        </div>
                                    </div>
                            </div>   

                            <div className="pokeinfo-evolutions">
                                <div className="pokeinfo-info-title">Evolutions</div>
                                <div className="pokeinfo-evolution-list">
                                    {evolutionChain.map((evo) => {
                                        return (
                                            <div className="pokeinfo-evolution">
                                                <div>#{evo.id}</div>
                                                <button className="card-btn" onClick={() => goToRoute(evo.id) } >
                                                    <div className={`evolution-card ${pokemonData.types[0].type.name}`}>
                                                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evo.id}.png`} className="evolution-sprite" />
                                                    </div>
                                                </button>
                                                <div className="evolution-name">{evo.name}</div>
                                            </div>
                                        );
                                    })} 
                                </div>
                            </div>        
                        </div>
                    </div>
                    <div className="pokeinfo-options">
                        <button onClick={() => catchOrReleasePokemon()} className={`theme-button-${theme}`}>{inCollection ? ("Release Pokemon") : ("Catch Pokemon")}</button>
                    </div>
                </div>
            </div>
            
        )
    }

    return (
        <div className="pokeinfo-content">
            <span className="loading" >Loading...</span>
        </div>
    )

    
}
