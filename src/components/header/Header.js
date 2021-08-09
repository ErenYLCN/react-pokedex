import React from 'react'
import './Header.css'
import pokeball from '../../img/pokeball.png'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { actionCreators } from "../../state/index"

export const Header = () => {

    const theme = useSelector((state) => state.theme);
    const dispatch = useDispatch();
    const { changeTheme } = bindActionCreators(actionCreators, dispatch);

    return (
        <div>
            <header className={`header-${theme}`}>
                <div className={`header-content-${theme}`}>   
                    <Link to="/" className="link">
                        <div className={`logo-${theme}`}>
                            Pokédex
                        </div>
                    </Link>
                    <div className="pokeball">
                        <img src={pokeball} width="40" height="40" />
                    </div>
                    <div className="menu">
                        <button onClick={() => changeTheme()} className={`theme-button-${theme}`}>{theme} Theme</button>
                        <Link to="/collection" className="link" >
                            <div className={`theme-button-${theme}`}> Collection</div>
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    )
}
