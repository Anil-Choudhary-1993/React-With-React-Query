import React from 'react';

export default function DisplayPanel({ name, type, editPokemon, deletPokemon }) {
  return (
    <React.Fragment>
      <div className="display_pokemon">
        <p>{name}</p>
        <p>{type.join(" | ")}</p>
      </div>
      <div className="button_group">
        <button onClick={editPokemon}>Edit</button>
        <button onClick={deletPokemon}>Delete</button>
      </div>
    </React.Fragment>
  )
}