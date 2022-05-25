<template>
  <div class="menu">
    <page-content
      :tableConfig="tableConfig"
      pageName="menu"
      ref="pageContentRef"
    ></page-content>
  </div>
</template>

<script lang="ts" setup>
import { tableConfig } from './config/table.config';

import pageContent from '@/components/page-content/src/page-content.vue';
</script>

<style scoped></style>
