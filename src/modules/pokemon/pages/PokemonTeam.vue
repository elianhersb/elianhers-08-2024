<script lang="ts" setup>
import { PokemonInformation } from '@/modules/pokemon/components/index';
import { usePokemon } from '@/modules/pokemon/composables/usePokemon';

const { team } = usePokemon();
</script>

<template>
  <div>
    <h1 class="text-center text-2xl font-bold text-gray-800">Equipo Pokémon</h1>
    <h5 class="text-center font-bold text-gray-600">Informacion de tus pokemones</h5>
    <div
      class="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
      v-if="team.length > 0"
    >
      <PokemonInformation
        v-for="pokemon in team"
        :key="pokemon.id"
        :id="pokemon.id"
        :modeDetail="false"
      />
    </div>
    <div v-else class="flex flex-col items-center justify-center" style="height: 69vh">
      <h2>No Posees ningun pokemon en tu equipo agrega uno</h2>
      <router-link
        :to="{ name: 'home' }"
        class="flex mt-2 cursor-pointer justify-center text-sm items-center space-x-1.5 rounded-lg bg-green-500 px-4 py-1.5 text-white duration-100 hover:bg-green-600"
      >
        Agregar pokemon
      </router-link>
    </div>
  </div>
</template>
