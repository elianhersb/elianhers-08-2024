<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const limit = ref(25);

const router = useRouter();

interface Props {
  page: number;
  total: number;
}

const props = defineProps<Props>();
const page = ref(props.page);
const nextPage = () => {
  if ((page.value + 1) * limit.value < props.total) {
    page.value++;
    router.push({ query: { page: page.value } });
  }
};

const prevPage = () => {
  if (page.value > 0) {
    page.value--;
    router.push({ query: { page: page.value } });
  }
};

const setPage = (pageValue: number) => {
  if (pageValue <= 7) page.value = pageValue - 1;

  router.push({ query: { page: page.value } });
};
</script>
<template>
  <div class="flex items-center justify-between px-4 py-3 sm:px-6">
    <div class="flex flex-1 justify-between sm:hidden">
      <a
        @click="prevPage"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Anterior
      </a>
      <a
        @click="nextPage"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Siguiente
      </a>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Mostrar
          <span class="font-medium">{{ page + 1 }}</span>
          a
          <span class="font-medium">{{ Math.min((page + 1) * limit, props.total) }}</span>
          de
          <span class="font-medium">{{ props.total }}</span>
          Pokemons
        </p>
      </div>
      <div>
        <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <a
            @click="prevPage"
            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span class="sr-only">Anterior</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clip-rule="evenodd"
              />
            </svg>
          </a>

          <a
            v-if="page > 0"
            @click="setPage(page)"
            aria-current="page"
            :class="{
              'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2':
                page == 0,
              'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
                page > 0,
            }"
          >
            {{ page }}
          </a>
          <a
            @click="setPage(page + 1)"
            :class="{
              'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2':
                page + 1 > 0,
              'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
                page + 1 == 0,
            }"
          >
            {{ page + 1 }}
          </a>
          <a
            v-if="page + 2 <= Math.ceil(props.total / limit)"
            @click="setPage(page + 2)"
            :class="{
              'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2':
                page == Math.ceil(props.total / limit),
              'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
                page < Math.ceil(props.total / limit),
            }"
          >
            {{ page + 2 }}
          </a>
          <a
            v-if="page + 1 < Math.ceil(props.total / limit)"
            @click="nextPage"
            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <span class="sr-only">Siguiente</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>
