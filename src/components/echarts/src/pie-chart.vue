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
    tooltip: {
      trigger: 'item',
    },
    legend: {
      left: 'left',
    },
    series: [
      {
        name: '分类数据',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
});
</script>

<style scoped></style>
