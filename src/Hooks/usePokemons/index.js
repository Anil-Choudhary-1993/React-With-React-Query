import { useQuery } from 'react-query';
import axios from '../../Axios';

// Get Pokemons
async function getPokemons() {
  return await axios.get();
}

export function usePokemons() {
  return useQuery('Pokemons', getPokemons);
}


// Get Pokemon
async function getPokemon({queryKey}) {
  return await axios.get({ id: queryKey[1] });
}

export function usePokemon(id) {
  return useQuery(['Pokemon', id], getPokemon, { enabled: !!id });
}

// Add Pokemon
export async function addPokemon(pokemon) {
  return await axios.post(pokemon);
}

// Update Pokemon
export async function updatePokemon(pokemon) {
  return await axios.put(pokemon);
}

// Delete Pokemon
export async function deletePokemon(pokemonId) {
  return await axios.delete({ id: pokemonId });
}
