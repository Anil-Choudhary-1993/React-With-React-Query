import React from 'react'
import PokemonsList from './PokemonsList';
import PokemonForm from './PokemonForm';
import PokemonContext from './PokemonContext';
import { AddPokemon, EditPokemon, ViewPokemon, ViewPokemonList } from './constants';
import './App.css';

function App() {
  let [pokemonId, setPokemonId] = React.useState(null);
  let [view, setView] = React.useState(ViewPokemonList); // ViewPokemon, AddPokemon, EditPokemon, ViewPokemonList
  const viewPokemon = () => setView(ViewPokemon)
  const addPokemon = () => setView(AddPokemon);
  const editPokemon = () => setView(EditPokemon);
  const viewPokemonList = () => setView(ViewPokemonList);

  return (
    <PokemonContext.Provider value={{
      viewPokemon,
      addPokemon,
      editPokemon,
      view,
      pokemonId,
      setPokemonId,
      viewPokemonList
    }}>
      <div className='app'>
        <p className="app_title" onClick={viewPokemonList}>Pokemon App</p>
        <div className="app_pokemon">
          {
            view === ViewPokemonList ? <PokemonsList /> : null
          }
          {
            [AddPokemon, EditPokemon, ViewPokemon].includes(view) ? <PokemonForm /> : null
          }
        </div>
      </div>
    </PokemonContext.Provider >
  );
}

export default App;
