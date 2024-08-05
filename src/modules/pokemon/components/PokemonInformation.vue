<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { usePokemon } from '../composables/usePokemon';
import type { Pokemon, PokemonInformation } from '../interfaces';
import { AppCard } from '@/components/index';
import PokemonStats from './PokemonStats.vue';
import { usePokemonStore } from '@/stores/pokemon.store';
import { useToast } from 'vue-toastification';
const toast = useToast();
const props = defineProps<{
  id: number;
  modeDetail: boolean;
}>();
const { getPokemonbyId, team } = usePokemon();
const { removePokemonStore } = usePokemonStore();
const information = ref(<PokemonInformation>{});
const isLoading = ref(true);

const removePokemon = (): void => {
  const pokemon: Pokemon | undefined = team.find((x) => x.id == information.value.id);
  if (pokemon) {
    removePokemonStore(pokemon);
    toast.error(`Eliminaste a ${information.value.name} de tu equipo`);
  }
};

onMounted(() => {
  getPokemonbyId(props.id)
    .then((resp) => {
      information.value = resp;
    })
    .finally(() => {
      isLoading.value = false;
    });
});
</script>
<template>
  <AppCard v-if="!isLoading">
    <template #content>
      <div class="relative flex justify-center items-end overflow-hidden rounded-xl bg-green-200">
        <img
          width="200"
          height="250"
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${information.id}.svg`"
          :alt="information.name"
        />
      </div>

      <div class="mt-1 p-2 flex flex-col md:flex-row justify-between">
        <div class="w-full md:w-1/2 p-2">
          <PokemonStats v-bind="information.stats" />
        </div>
        <div class="w-full md:w-1/2 p-2">
          <h2 class="text-slate-700 capitalize mb-2">
            <b>Nombre:</b>
            {{ information.name }}
          </h2>
          <h2 class="text-slate-700 capitalize mb-2">
            <b>Tipos:</b>
          </h2>
          <div class="flex">
            <div
              v-for="(item, index) in information.types"
              :key="`type${index}`"
              class="mb-2 mr-2 center relative inline-block select-none whitespace-nowrap rounded-lg bg-blue-500 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white"
            >
              <div class="mt-px">{{ item.type.name }}</div>
            </div>
          </div>
          <h2 class="text-slate-700 capitalize mb-2">
            <b>Cries:</b>
          </h2>
          <div v-for="(crie, index) in information.cries" :key="`crie${index}`" class="mb-2">
            <audio :src="crie" controls style="width: -webkit-fill-available; height: 30px"></audio>
          </div>
          <h2 class="text-slate-700 capitalize mb-2" v-if="information.weight && modeDetail">
            <b>Peso:</b>
            {{ information.weight / 10 }} KG
          </h2>
          <h2 class="text-slate-700 capitalize mb-2" v-if="information.height && modeDetail">
            <b>Altura:</b>
            {{ information.height / 10 }}M
          </h2>
        </div>
      </div>
      <div class="flex justify-center items-center" v-if="!modeDetail">
        <button
          @click="removePokemon()"
          class="flex mt-2 mr-2 cursor-pointer justify-center text-sm items-center space-x-1.5 rounded-lg bg-red-500 px-4 py-1.5 text-white duration-100 hover:bg-red-600"
        >
          Eliminar
        </button>
        <router-link
          :to="{ name: 'team-id', params: { id: information.id } }"
          class="flex mt-2 cursor-pointer justify-center text-sm items-center space-x-1.5 rounded-lg bg-green-500 px-4 py-1.5 text-white duration-100 hover:bg-green-600"
        >
          Ver Detalles
        </router-link>
      </div>
    </template>
  </AppCard>
</template>
