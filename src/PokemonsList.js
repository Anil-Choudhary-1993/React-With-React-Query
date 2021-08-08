import React from 'react'
import { usePokemons } from './Hooks/usePokemons'
import PokemonContext from './PokemonContext';

export default function Pokemons() {
  let { viewPokemon, setPokemonId, addPokemon: addPokemonPanel } = React.useContext(PokemonContext);
  const { isLoading, isError, error, data } = usePokemons();
  let pokemonList;

  if (!isLoading && data) {
    pokemonList = (
      <React.Fragment>
        <button onClick={addPokemonPanel}>Add Pokemon</button>
        {
          data.map((pokemon) => {
            return (
              <div
                key={pokemon.id}
                className="pokemon_item"
                onClick={() => {
                  setPokemonId(pokemon.id);
                  viewPokemon();
                }}
              >
                <p className="pokemon_name">{pokemon.name}</p>
                <p className="pokemon_types">{pokemon.type.join(' | ')}</p>
              </div>
            )
          })
        }
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      {
        isLoading && 'Loading...'
      }
      {
        isError ? <i>{error}</i> : null
      }
      {
        pokemonList
      }
    </React.Fragment>
  )
}
