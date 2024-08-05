<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { PokemonInformation, PokemonEvolutions } from '@/modules/pokemon/components/index';

const route = useRoute();
const id = ref(Number(route.params.id));
</script>
<template>
  <div>
    <h1 class="text-center text-2xl font-bold text-gray-800">Detalle Pokémon</h1>
    <h5 class="text-center font-bold text-gray-600">
      Informacion detallada de tu pokemon y sus evoluciones
    </h5>
    <div class="mx-auto max-w-5xl p-6">
      <div class="grid grid-cols-1 gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <div class="flex-grow bg-gray-100 p-4">
          <PokemonInformation :id="id" :modeDetail="true" />
        </div>
        <div class="flex-grow bg-gray-100 p-4">
          <PokemonEvolutions :id="id" />
        </div>
      </div>
    </div>
  </div>
</template>
