import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Pokemon } from '@/modules/pokemon/interfaces';
import { PokemonTeam } from '@/modules/pokemon/interfaces/pokemonteam.enum';
import { useLocalStorage } from '@vueuse/core';

export const usePokemonStore = defineStore('Pokemon', () => {
  const team = ref(useLocalStorage('team', <Pokemon[]>[]));
  const teamStatus = ref(useLocalStorage('teamStatus', PokemonTeam.NoCreated));

  const createPokemonTeamStore = () => {
    teamStatus.value = PokemonTeam.Created;
  };

  const addPokemonTeamStore = (pokemon: Pokemon): void => {
    team.value.push(pokemon);
  };

  const removePokemonStore = (pokemon: Pokemon): void => {
    const index = team.value.findIndex((p) => p.id === pokemon.id);
    team.value.splice(index, 1);
    if (team.value.length == 0) teamStatus.value = PokemonTeam.NoCreated;
  };

  return {
    team,
    teamStatus,
    createPokemonTeamStore,
    addPokemonTeamStore,
    removePokemonStore,

    isChecking: computed(() => teamStatus.value === PokemonTeam.Checking),
    isCreated: computed(() => teamStatus.value === PokemonTeam.Created),
    isNoCreated: computed(() => teamStatus.value === PokemonTeam.NoCreated),
  };
});
