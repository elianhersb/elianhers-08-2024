<script lang="ts" setup>
import { TopMenu, CustomFooter } from '@/modules/pokemon/components/index';
</script>
<template>
  <!-- Header Navbar -->
  <TopMenu />

  <!-- Roouter -->
  <RouterView />

  <!-- Footer -->
  <CustomFooter />
</template>
