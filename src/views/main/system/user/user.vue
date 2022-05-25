<template>
  <div class="user">
    <search-header
      :searchForm="searchForm"
      @handelResetClick="handelResetClick"
      @handelSearchClick="handelSearchClick"
    ></search-header>
    <page-content
      :tableConfig="tableConfig"
      pageName="users"
      ref="pageContentRef"
      @handleAddAction="handleAddDate"
      @handleEditAction="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      title="用户"
      pageName="users"
      :formConfig="dialogFormConfigRef"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '@/store';
import { searchForm } from './config/search.config';
import { tableConfig } from './config/table.config';
import { dialogFormConfig } from './config/dialog.config';

import SearchHeader from '@/components/search-header/search-header.vue';
import pageContent from '@/components/page-content/src/page-content.vue';
import pageModal from '@/components/page-modal';

import { useSearchHeader } from '@/hooks/useSearchHeader';
import usePageModal from '@/hooks/usePageModal';

const { handelResetClick, handelSearchClick, pageContentRef } =
  useSearchHeader();

const addCallBack = () => {
  let passItem = dialogFormConfig.formItems.find(
    (item) => item.field === 'password',
  );
  passItem!.isHidden = false;
};
// 修改dialogFormConfig
const editCallBack = () => {
  let passItem = dialogFormConfig.formItems.find(
    (item) => item.field === 'password',
  );
  passItem!.isHidden = true;
};

const store = useStore();
// 动态的表单数据 通过computed 响应式
const dialogFormConfigRef = computed(() => {
  let departmentItem = dialogFormConfig.formItems.find(
    (item) => item.field === 'departmentId',
  );
  departmentItem!.selOptions = store.state.entireDepartment.map((item: any) => {
    return { label: item.name, value: item.id };
  });
  let roleItem = dialogFormConfig.formItems.find(
    (item) => item.field === 'roleId',
  );
  roleItem!.selOptions = store.state.entireRole.map((item: any) => {
    return { label: item.name, value: item.id };
  });
  return dialogFormConfig;
});
const { pageModalRef, defaultInfo, handleAddDate, handleEditData } =
  usePageModal(addCallBack, editCallBack);
</script>

<style scoped></style>
