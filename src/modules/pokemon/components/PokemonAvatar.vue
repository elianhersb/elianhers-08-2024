<script lang="ts" setup>
import type { Pokemon } from '../interfaces';

const props = defineProps<{
  pokemons: Pokemon[];
}>();
</script>
<template>
  <div class="flex items-center -space-x-4">
    <img
      v-for="item in props.pokemons"
      :key="item.id"
      :alt="item.name"
      :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.id}.svg`"
      class="relative inline-block h-8 w-8 rounded-full border-2 border-white object-cover object-center hover:z-10 focus:z-10 cursor-pointer"
    />
  </div>
</template>
