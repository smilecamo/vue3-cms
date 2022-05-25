<template>
  <div>
    <pageContent :tableConfig="tableConfig" pageName="goods">
      <template #image="scope">
        <el-image
          style="width: 50px; height: 50px"
          :src="scope.row.imgUrl"
          :z-index="9"
        />
      </template>
      <template #oldPrice="scope">
        {{ '¥' + scope.row.oldPrice }}
      </template>
    </pageContent>
  </div>
</template>

<script setup lang="ts">
import pageContent from '@/components/page-content/src/page-content.vue';
import { tableConfig } from './config/table.config';
</script>

<style scoped></style>
