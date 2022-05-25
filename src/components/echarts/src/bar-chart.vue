<template>
  <div>
    <base-echart :options="option"></base-echart>
  </div>
</template>

<script setup lang="ts">
import baseEchart from '@/base-ui/echart';
import * as echarts from 'echarts';
import { computed } from 'vue';
const props = defineProps<{
  title?: string;
  XLabel: string[];
  value: any[];
}>();
const option = computed(() => {
  return {
    title: {
      text: props.title ?? '收藏',
    },
    xAxis: {
      data: props.XLabel,
      axisLabel: {
        inside: true,
        color: '#fff',
      },
      axisTick: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      z: 10,
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#999',
      },
    },
    dataZoom: [
      {
        type: 'inside',
      },
    ],
    series: [
      {
        type: 'bar',
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' },
            ]),
          },
        },
        data: props.value,
      },
    ],
  };
});
</script>

<style scoped></style>
