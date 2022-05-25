<template>
  <div>
    <base-echart :options="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import baseEchart from '@/base-ui/echart';
import { computed } from 'vue';
interface dataType {
  name: string;
  value: string;
}
const props = defineProps<{
  title: string;
  XLabel: string[];
  value: string[];
}>();
const option = computed(() => {
  return {
    title: {
      text: props.title,
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: props.XLabel,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '销量',
        type: 'line',
        stack: 'Total',
        data: props.value,
      },
    ],
  };
});
</script>

<style scoped></style>
