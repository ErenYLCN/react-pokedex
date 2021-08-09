import React from 'react'
import { useSelector } from "react-redux"
import { Switch, Route } from 'react-router-dom'
import './App.css'
import { Header } from './components/header/Header'
import { PokeList } from './components/PokeList/PokeList'
import { PokeInfo } from './components/PokeInfo/PokeInfo'
import { PokeCollection } from './components/PokeCollection/PokeCollection'


function App() {

  const theme = useSelector((state) => state.theme);

  return (
    
      <div className={`app-${theme}`} >
        <Header />
        <Switch>
          <Route
            exact 
            path="/"
            render={(props) => <PokeList {...props} />} />
          <Route
            exact
            path="/pokemon/:pokemonId"
            render={(props) => <PokeInfo {...props} />} />
          <Route
            exact
            path="/collection"
            render={(props) => <PokeCollection {...props} />} />
        </Switch>
      </div>
  );
}

export default App;
