<script lang="ts" setup>
import { ref } from 'vue';
import type { StatChart } from '../interfaces';
const props = defineProps<StatChart>();

const chartOptions = ref({
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      distributed: true,
    },
  },
  colors: ['#FF0000', '#0000FF', '#FFA500', '#008000'],
  xaxis: {
    categories: props.categories,
    title: {
      text: 'Stats',
    },
  },
  yaxis: {
    title: {
      text: 'valores',
    },
  },
  dataLabels: {
    enabled: true,
  },
  legend: {
    show: false,
  },
});
</script>

<template>
  <div>
    <apexchart type="bar" height="250" :options="chartOptions" :series="props.series"></apexchart>
  </div>
</template>
