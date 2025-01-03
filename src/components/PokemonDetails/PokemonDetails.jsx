//CSS imports
import { useEffect, useState } from "react";
import "./PokemonDetails.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function PokemonDetails() {
  const { id } = useParams();
  const POKEMON_DETAIL_URL = "https://pokeapi.co/api/v2/pokemon/";
  const [pokemon, setPokemon] = useState();

  async function downloadPokemon() {
    const response = await axios.get(POKEMON_DETAIL_URL + id);
    const pokemon = response.data;

    setPokemon({
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types,
      image: pokemon.sprites.other.dream_world.front_default,
    });
  }
  useEffect(() => {
    downloadPokemon();
  }, []);
  return (
    <>
      <h1>
        <Link to="/">Pokedex</Link>
      </h1>
      {pokemon && (
        <div className="pokemon-details-wrapper">
          <div>
            <div className="pokemon-detail-name">{pokemon.name}</div>
            <div className="pokemon-image">
              <img src={pokemon.image} alt="" />
            </div>
            <div className="pokemon-attr">
              <div>height:{pokemon.height}</div>
              <div>weight:{pokemon.weight}</div>
            </div>

            <div className="pokemon-types">
              <h1>Type:</h1>

              {pokemon.types.map((t) => (
                <span className="type" key={t.type.name}>
                  {t.type.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PokemonDetails;
