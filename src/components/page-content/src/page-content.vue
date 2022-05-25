<template>
  <div>
    <hy-table
      :listData="listData"
      v-bind="tableConfig"
      :total="total"
      v-model:page="page"
    >
      <template #header-handle v-if="isAdd">
        <el-button type="primary" @click="handelAdd">新增</el-button>
      </template>
      <template #enable="scope">
        {{ +scope.row.enable === 1 ? '启用' : '暂停' }}
      </template>
      <template #updateAt="scope">
        {{ $filters.formateTime(scope.row.updateAt) }}
      </template>
      <template #createAt="scope">
        {{ $filters.formateTime(scope.row.createAt) }}
      </template>
      <template #handle="scope">
        <el-button
          type="text"
          size="small"
          v-if="isEdit"
          @click="handelEdit(scope.row)"
          >修改</el-button
        >
        <el-button
          type="text"
          size="small"
          v-if="isDelete"
          @click="handelDelete(scope.row)"
          >删除</el-button
        >
      </template>
      <!-- 动态插槽 -->
      <template
        v-for="item of otherSlot"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <slot :name="item.slotName" :row="scope.row"> </slot>
      </template>
    </hy-table>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useStore } from '@/store';
import HyTable from '@/base-ui/table';
import usePermission from '@/hooks/usePermission';

const props = defineProps({
  tableConfig: {
    type: Object,
    required: true,
  },
  pageName: {
    type: String,
    required: true,
  },
});
const isQuery = usePermission(props.pageName, 'query');
const isAdd = usePermission(props.pageName, 'add');
const isDelete = usePermission(props.pageName, 'delete');
const isEdit = usePermission(props.pageName, 'edit');

const store = useStore();
const page = ref({ currentPage: 1, pageSize: 10 });
watch(
  page,
  () => {
    getPageData();
  },
  { deep: true },
);
// 发送请求
const getPageData = (queryInfo: any = {}) => {
  if (!isQuery) return;
  // 发送请求 获取数据
  store.dispatch('systemModule/getPageListAction', {
    pageName: props.pageName,
    data: {
      offset: (page.value.currentPage - 1) * page.value.pageSize,
      size: page.value.pageSize,
      ...queryInfo,
    },
  });
};
getPageData();
// 应用数据
// getters 组件 函数传递参数
const listData = computed(() =>
  store.getters[`systemModule/getListData`](props.pageName),
);
const total = computed(() =>
  store.getters[`systemModule/getCount`](props.pageName),
);
defineExpose({
  getPageData,
});
// 过滤掉已有的固定插槽，获取动态插槽 进行动态添加

const otherSlot = props.tableConfig?.listProp.filter((item: any) => {
  if (item.slotName === 'enable') return false;
  if (item.slotName === 'updateAt') return false;
  if (item.slotName === 'createAt') return false;
  if (item.slotName === 'handle') return false;
  return true;
});

// 删除
const handelDelete = (row: any) => {
  console.log(row);
};

const emits = defineEmits(['handleAddAction', 'handleEditAction']);
// 新增
const handelAdd = () => {
  emits('handleAddAction');
};
// 更改
const handelEdit = (row: any) => {
  emits('handleEditAction', row);
};
</script>

<style scoped></style>
