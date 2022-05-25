<template>
  <div ref="chartsRef" :style="{ width: width, height: height }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, withDefaults, watchEffect } from 'vue';
import { EChartsOption } from 'echarts';
import useEchart from '../hooks/useEchart';
// ts 定义props
const props = withDefaults(
  defineProps<{
    options: EChartsOption;
    width?: string;
    height?: string;
  }>(),
  {
    width: '100%',
    height: '360px',
  },
);

const chartsRef = ref<HTMLElement>();
onMounted(() => {
  const { setOption } = useEchart(chartsRef.value!);
  watchEffect(() => {
    setOption(props.options);
  });
});
</script>

<style scoped></style>
