import React from 'react'
import './PokemonCard.css'
import { useSelector } from "react-redux"


export const PokemonCard = ({cardData}) => {

    const theme = useSelector((state) => state.theme);

    return (
        <div>
            <div className={`card-${theme}`} >
                <div className="card-content">
                    <div className="card-id">
                        #{cardData.id}
                    </div>
                    <div >
                        <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${cardData.id}.png`} className="card-sprite" />
                    </div>
                    <div className="card-element-name">
                        <div className={`card-name-${theme}`}>
                            {cardData.name}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
