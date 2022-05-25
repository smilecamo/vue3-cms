<template>
  <div class="role">
    <search-header :searchForm="searchForm"></search-header>
    <page-content
      :tableConfig="tableConfig"
      pageName="role"
      @handleAddAction="handleAddDate"
      @handleEditAction="handleEditData"
    ></page-content>
    <page-model
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      :formConfig="dialogFormConfig"
      pageName="role"
    >
      <el-tree
        ref="treeRef"
        node-key="id"
        :props="{
          label: 'name',
          children: 'children',
        }"
        :data="menuList"
        show-checkbox
        @check="handleCheck"
      />
    </page-model>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, nextTick } from 'vue';
import { useStore } from '@/store';
import { searchForm } from './config/search.config';
import { tableConfig } from './config/table.config';
import { dialogFormConfig } from './config/dialog.config';
import SearchHeader from '@/components/search-header/search-header.vue';
import pageContent from '@/components/page-content/src/page-content.vue';
import pageModel from '@/components/page-modal';

import usePageModal from '@/hooks/usePageModal';

import { menuTreeToId } from '@/utils/map-menus';
// 菜单项
const store = useStore();
const menuList = computed(() => store.state.entireMenu);
const otherInfo = ref({});
const handleCheck = (data1: any, data2: any) => {
  const halfCheckedKeys = data2.halfCheckedKeys;
  const checkedKeys = data2.checkedKeys;
  const checkKeys = [...halfCheckedKeys, ...checkedKeys];
  if (otherInfo.value) {
    otherInfo.value = { menuList: checkKeys };
  }
};
const treeRef = ref();
// 编辑的回调函数
const editCall = (item: any) => {
  nextTick(() => {
    treeRef.value?.setCheckedKeys(menuTreeToId(item.menuList));
  });
};
const { pageModalRef, defaultInfo, handleAddDate, handleEditData } =
  usePageModal(undefined, editCall);
</script>

<style scoped></style>
