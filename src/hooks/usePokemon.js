import axios from "axios";

import { useEffect, useState } from "react";
import downloadPokemons from "../components/utils/downloadPokemons";

function usePokemon(id) {
  const POKEMON_DETAIL_URL = "https://pokeapi.co/api/v2/pokemon/";

  const [pokemon, setPokemon] = useState(null);

  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    pokedexUrl: "",
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadGivenPokemon(id) {
    const response = await axios.get(POKEMON_DETAIL_URL + id);
    const pokemon = response.data;

    setPokemon({
      name: pokemon.name,
      height: pokemon.height,
      weight: pokemon.weight,
      types: pokemon.types,
      image: pokemon.sprites.other.dream_world.front_default,
    });

    const types = response.data.types.map((t) => t.type.name);
    return types[0];
  }

  async function downloadPokemonRelated(id) {
    const type = await downloadGivenPokemon(id);
    await downloadPokemons(
      pokemonListState,
      setPokemonListState,
      `https://pokeapi.co/api/v2/type/${type}`
    );
  }

  useEffect(() => {
    downloadPokemonRelated(id);
    window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
  }, [id]);

  return [pokemon, pokemonListState];
}

export default usePokemon;
