<template>
  <el-breadcrumb separator="/">
    <template v-for="item in breadCrumb" :key="item.name">
      <el-breadcrumb-item :path="item.path">{{ item.name }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { IBreadCrumbType } from '../types/index';
defineProps({
  breadCrumb: {
    type: Array as PropType<IBreadCrumbType[]>,
    default: () => [],
  },
});
</script>

<style scoped></style>
