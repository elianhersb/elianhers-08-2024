import { pokemonApi } from '@/api/pokemonApi';
import { computed, ref, watch } from 'vue';
import type { PokemonResponse, Pokemon, PokemonByIdResponse } from '../interfaces';
import { useRoute, useRouter } from 'vue-router';
import { usePokemonStore } from '@/stores/pokemon.store';
import type { Chain, PokemonEvolutionsResponse } from '../interfaces/pokemonEvolutions.response';
import type { Evolution, PokemonSpeciesResponse } from '../interfaces/PokemonSpecies.response';

export const usePokemon = () => {
  const route = useRoute();
  const router = useRouter();
  const total = ref(151);
  const { team, addPokemonTeamStore, removePokemonStore, createPokemonTeamStore } =
    usePokemonStore();
  const pokemons = ref(<Pokemon[]>[]);
  const isLoading = ref(false);

  const page = computed(() => {
    if (route?.query?.page) return Number(route.query.page) > 6 ? 6 : Number(route.query.page);
    else return 0;
  });

  const getPokemons = async () => {
    const offset: number = page.value * 25;
    const limit: number = offset == 150 ? 1 : 25;

    const { data } = await pokemonApi.get<PokemonResponse>(
      `pokemon?limit=${limit}&&offset=${offset}`,
    );

    return data.results.map((pokemon) => {
      const urlParts = pokemon.url.split('/');
      const id = urlParts[urlParts.length - 2] ?? 0;
      const teamPokemon = team.find((p) => p.id === +id);
      const selected = teamPokemon ? teamPokemon.selected : false;

      return {
        name: pokemon.name,
        id: +id,
        selected,
      };
    });
  };

  const addPokemonTeam = (pokemon: Pokemon) => {
    if (team.length < 6) {
      addPokemonTeamStore(pokemon);
      pokemons.value = pokemons.value.map((x) => {
        if (x.id == pokemon.id) pokemon.selected = true;

        return x;
      });
    }
  };

  const removePokemonTeam = (pokemon: Pokemon) => {
    const indexPokemon = pokemons.value.findIndex((p) => p.id === pokemon.id);

    if (indexPokemon !== -1) {
      removePokemonStore(pokemon);
      pokemons.value[indexPokemon].selected = false;
    }
  };

  const createPokemonTeam = () => {
    createPokemonTeamStore();
    router.push({ name: 'team' });
  };

  const getPokemonbyId = async (id: number) => {
    const { data } = await pokemonApi.get<PokemonByIdResponse>(`pokemon/${id}`);

    return {
      id: id,
      name: data.name,
      stats: {
        series: [
          {
            name: 'Valor',
            data: data.stats.map((x) => x.base_stat),
          },
        ],
        categories: data.stats.map((x) => x.stat.name),
      },
      cries: data.cries,
      types: data.types,
      height: data.height,
      weight: data.weight,
      species: data.species,
    };
  };

  const getPokemonSpeciesbyId = async (id: number) => {
    const { data } = await pokemonApi.get<PokemonSpeciesResponse>(`pokemon-species/${id}`);
    return data;
  };

  const extractIdFromUrl = (url: string): number | null => {
    const match = url.match(/pokemon-species\/(\d+)\//);
    if (match) return parseInt(match[1], 10);

    return null;
  };

  const extractEvolutions = (chain: Chain): Evolution[] => {
    const evolutions: Evolution[] = [];

    function recurse(chain: Chain) {
      evolutions.push({
        name: chain.species.name,
        id: Number(extractIdFromUrl(chain.species.url)),
      });

      chain.evolves_to.forEach((evolution) => recurse(evolution));
    }

    recurse(chain);

    return evolutions;
  };

  const getEvolutions = async (id: number): Promise<Evolution[]> => {
    try {
      const pokemonSpeciesById = await getPokemonSpeciesbyId(id);
      const { data } = await pokemonApi.get<PokemonEvolutionsResponse>(
        pokemonSpeciesById.evolution_chain.url,
      );
      return extractEvolutions(data.chain);
    } catch (error) {
      return [];
    }
  };

  watch(
    () => route.query.page,
    () => {
      isLoading.value = true;

      getPokemons()
        .then((resp) => {
          pokemons.value = resp;
        })
        .finally(() => {
          isLoading.value = false;
        });

      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  );

  return {
    getPokemons,
    total,
    addPokemonTeam,
    removePokemonTeam,
    createPokemonTeam,
    getPokemonbyId,
    getEvolutions,
    team,
    pokemons,
    isLoading,
    page,
  };
};
