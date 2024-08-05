<script lang="ts" setup>
import AppCard from '@/components/AppCard.vue';
import type { Pokemon } from '../interfaces';

const props = defineProps<Pokemon>();

const emit = defineEmits(['add-pokemon', 'remove-pokemon']);

const handleButtonClick = () => {
  if (props.selected) {
    emit('remove-pokemon');
  } else {
    emit('add-pokemon');
  }
};
</script>

<template>
  <AppCard>
    <template #content>
      <div
        :class="[
          'relative flex justify-center items-end overflow-hidden rounded-xl',
          props.selected ? 'bg-green-200' : '',
        ]"
      >
        <img
          width="80"
          height="150"
          :src="`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${props.id}.svg`"
          :alt="props.name"
        />
      </div>

      <div class="mt-1 p-2 flex flex-col justify-between text-center">
        <h2 class="text-slate-700 capitalize">
          <b>{{ props.name }}</b>
        </h2>

        <button
          @click="handleButtonClick"
          :class="
            props.selected
              ? 'flex mt-2 cursor-pointer justify-center text-sm items-center space-x-1.5 rounded-lg bg-green-500 px-4 py-1.5 text-white duration-100 hover:bg-green-600'
              : 'flex mt-2 cursor-pointer justify-center text-sm items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600'
          "
        >
          {{ props.selected ? 'Remover' : 'Agregar' }}
        </button>
      </div>
    </template>
  </AppCard>
</template>
