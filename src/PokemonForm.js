import React from 'react'
import { useMutation, useQueryClient } from 'react-query';
import { addPokemon, deletePokemon, updatePokemon, usePokemon } from './Hooks/usePokemons';
import DisplayPanel from './DisplayPokemon';
import PokemonContext from './PokemonContext';
import { AddPokemon, EditPokemon, ViewPokemon } from './constants';

export default function PokemonForm() {
  let { pokemonId, view, viewPokemon, editPokemon, viewPokemonList } = React.useContext(PokemonContext);
  let { data, isLoading, isError, error } = usePokemon(pokemonId);
  let queryClient = useQueryClient();

  let mutation = useMutation(view === EditPokemon ? updatePokemon : addPokemon,
    {
      onSuccess: function (data) {
        queryClient.setQueriesData(['pokemon', data.id], data)
        queryClient.invalidateQueries('pokemons');
        viewPokemonList();
      }
    });

  let deleteMutation = useMutation(deletePokemon,
    {
      onSuccess: function (data) {
        queryClient.removeQueries(['pokemon', data.id]);
        queryClient.invalidateQueries('pokemons');
        viewPokemonList();
      }
    });

  let renderContent = '';
  if (isLoading || deleteMutation.isLoading || mutation.isLoading) {
    if (deleteMutation.isLoading) {
      renderContent = 'Deleting...';
    } else if (mutation.isLoading) {
      renderContent = view === EditPokemon ? 'Updating...' : 'Adding...';
    } else {
      renderContent = 'Loading...';
    }
  } else if (isError || deleteMutation.isError || mutation.isError) {
    renderContent = <i>{error || deleteMutation.error || mutation.error}</i>;
  } else if (!isLoading && !data) {
    renderContent = <b>No Data Found</b>;
  } else if (data) {
    renderContent = <React.Fragment>
      {
        (view === ViewPokemon) && <DisplayPanel
          name={data.name}
          type={data.type}
          editPokemon={editPokemon}
          deletPokemon={() => deleteMutation.mutate(data.id)}
        />
      }
      {
        ([AddPokemon, EditPokemon].includes(view)) && <FormPanel
          view={view}
          id={data.id}
          name={data.name}
          type={data.type}
          mutation={mutation}
        // editPokemon={ }
        // deletPokemon={() => mutation.mutate({})}
        />
      }
    </React.Fragment>
  }


  return (
    <div className="pokemon_form">
      <h2 onClick={viewPokemon}>Pokemon-Form</h2>
      {renderContent}
    </div>
  )
}

function FormPanel({ id, name, type, mutation, view }) {
  let [pokemonName, setPokemonName] = React.useState(view === EditPokemon ? name : '');
  let [pokemontype, setPokemonType] = React.useState(view === EditPokemon ? type.join('|') : '');

  let onSubmit = () => {
    mutation.mutate({
      name: pokemonName,
      type: pokemontype.split("|"),
      id: view === EditPokemon ? id : null
    });
  }

  return (
    <React.Fragment>
      <div className="input_group">
        <label htmlFor="name">Pokemon Name</label>
        <input type="text" name="name" id="name" value={pokemonName} onChange={(e) => setPokemonName(e.target.value)} />
      </div>
      <div className="input_group">
        <label htmlFor="type">Pokemon Power Types</label>
        <input type="text" id="type" name="type" value={pokemontype} onChange={(e) => setPokemonType(e.target.value)} />
      </div>
      <div className="button_input_group">
        <button onClick={onSubmit}>{view.split('_').join(' ').toUpperCase()}</button>
      </div>
    </React.Fragment>
  )
}
