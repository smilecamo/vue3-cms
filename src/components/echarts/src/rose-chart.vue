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
const props = defineProps<{ pieData: dataType[] }>();
const option = computed(() => {
  return {
    // legend: {
    //   top: 'bottom',
    // },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: [10, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8,
        },
        data: props.pieData,
      },
    ],
  };
});
</script>

<style scoped></style>
