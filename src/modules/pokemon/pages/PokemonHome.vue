<script lang="ts" setup>
import { usePokemon } from '@/modules/pokemon/composables/usePokemon';
import { ItemPagination, PokemonCard, PokemonAvatar } from '@/modules/pokemon/components/index';
import { SkeletonCard } from '@/components/index';
import type { Pokemon } from '../interfaces';
import { useToast } from 'vue-toastification';
import { onMounted } from 'vue';

const toast = useToast();

const {
  total,
  removePokemonTeam,
  addPokemonTeam,
  createPokemonTeam,
  team,
  pokemons,
  isLoading,
  page,
  getPokemons,
} = usePokemon();

const handleAddPokemon = (pokemon: Pokemon): void => {
  if (team.length == 6) {
    toast.error(`Son máximo 6 pokemones por equipo`);
    return;
  }

  addPokemonTeam(pokemon);
};

const handleRemovePokemon = (pokemon: Pokemon): void => {
  removePokemonTeam(pokemon);
  toast.warning(`Removiste a ${pokemon.name} de tu equipo Pokemon`);
};

const createTeamPokemon = () => {
  if (team.length < 6) {
    toast.error(`Son máximo 6 pokemones para crear un equipo`);
    return;
  }

  createPokemonTeam();
};

onMounted(() => {
  isLoading.value = true;

  getPokemons()
    .then((resp) => (pokemons.value = resp))
    .finally(() => {
      isLoading.value = false;
    });
});
</script>

<template>
  <!-- Title -->
  <div>
    <h1 class="text-center text-2xl font-bold text-gray-800">Crea tu equipo Pokémon</h1>
    <h5 class="text-center font-bold text-gray-600">Máximo 6 pokemones</h5>
  </div>

  <!-- Product List -->
  <section class="pb-10" style="min-height: 61vh">
    <div class="mx-auto max-w-6xl grid grid-cols-12 p-6" v-if="team.length > 0">
      <div class="col-span-12 flex items-end justify-end">
        <PokemonAvatar :pokemons="team" class="mr-3" />
        <div
          @click="createTeamPokemon"
          class="flex mt-2 cursor-pointer justify-center text-sm items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600'"
        >
          Crear Equipo
        </div>
      </div>
    </div>
    <div
      class="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <template v-if="isLoading">
        <SkeletonCard v-for="i in 25" :key="`skeleton-${i}`" />
      </template>
      <template v-else>
        <PokemonCard
          v-for="(pokemon, index) in pokemons"
          :key="`pokemon-${index}`"
          v-bind="pokemon"
          @add-pokemon="handleAddPokemon(pokemon)"
          @remove-pokemon="handleRemovePokemon(pokemon)"
        />
      </template>
    </div>
  </section>

  <ItemPagination :page="page" :total="total" />
</template>
