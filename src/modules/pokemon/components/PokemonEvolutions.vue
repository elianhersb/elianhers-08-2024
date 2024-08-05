<script lang="ts" setup>
import { AppCard } from '@/components/index';
import { onMounted, ref } from 'vue';
import { usePokemon } from '../composables/usePokemon';
import type { Evolution } from '../interfaces/PokemonSpecies.response';

const props = defineProps<{
  id: number;
}>();

const { getEvolutions } = usePokemon();
const evolutions = ref<Evolution[]>([]);
onMounted(() => {
  getEvolutions(props.id).then((resp) => {
    evolutions.value = resp;
  });
});
</script>

<template>
  <div>
    <h2 class="mb-5"><b>Evoluciones</b></h2>
    <AppCard v-for="item in evolutions" :key="item.id" class="mb-3" style="width: 150px">
      <template #content>
        <div class="flex flex-col justify-center items-center">
          <div>
            <h6>
              <b>{{ item.name }}</b>
            </h6>
            <img
              :alt="item.name"
              :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.id}.svg`"
              class="relative inline-block h-24 w-24 rounded-2xl object-cover object-center mb-3 p-2"
            />
          </div>
        </div>
      </template>
    </AppCard>
  </div>
</template>
