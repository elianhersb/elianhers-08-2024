import isPokemonTeamGuard from '@/modules/pokemon/guards/is-pokemon-team';
import PokemonLayout from '@/modules/pokemon/layouts/PokemonLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'pokemon',
      component: PokemonLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/modules/pokemon/pages/PokemonHome.vue'),
        },
        {
          path: 'team',
          name: 'team',
          component: () => import('@/modules/pokemon/pages/PokemonTeam.vue'),
        },
        {
          path: 'team/:id',
          name: 'team-id',
          component: () => import('@/modules/pokemon/pages/PokemonDetail.vue'),
          beforeEnter: isPokemonTeamGuard,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'home' },
    },
  ],
});

export default router;
