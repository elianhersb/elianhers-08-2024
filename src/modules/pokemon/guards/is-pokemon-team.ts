import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { usePokemonStore } from '@/stores/pokemon.store';

const isPokemonTeamGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) => {
  const { team } = usePokemonStore();
  const id = Number(to.params.id);

  const isPokemonInTeam = team.some((pokemon) => pokemon.id === id);

  if (isPokemonInTeam) {
    next();
  } else {
    next({ name: 'home' });
  }
};

export default isPokemonTeamGuard;
