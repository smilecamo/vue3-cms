<template>
  <div class="page-table">
    <header class="header">
      <slot name="header-title">
        {{ title }}
      </slot>
      <div class="header-handle">
        <slot name="header-handle"></slot>
      </div>
    </header>
    <el-table
      :data="listData"
      class="table"
      @selection-change="handleSelectionChange"
      v-bind="treeProps"
    >
      <el-table-column
        v-if="tableSelectionColumn"
        type="selection"
        width="55"
      />
      <el-table-column
        v-if="tableIndexColumn"
        type="index"
        label="序号"
        width="80"
        align="center"
      ></el-table-column>

      <template v-for="item of listProp" :key="item.prop">
        <el-table-column v-bind="item" align="center" show-overflow-tooltip>
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ scope.row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <footer class="footer" v-if="footerShow">
      <el-pagination
        :currentPage="page.currentPage"
        :page-size="page.pageSize"
        :page-sizes="pageSizes"
        :small="'small'"
        :disabled="false"
        :background="true"
        :layout="layout"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </footer>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  // 标题
  title: {
    type: String,
    default: '',
  },
  // 序号显示
  tableIndexColumn: {
    type: Boolean,
    default: true,
  },
  // 多选
  tableSelectionColumn: {
    type: Boolean,
    default: true,
  },
  listData: {
    type: Array,
    required: true,
  },
  listProp: {
    type: Array,
    default: () => [],
  },
  pageSizes: {
    type: Array,
    default: () => [2, 5, 10, 20, 30, 40, 50],
  },
  layout: {
    type: String,
    default: () => 'total, sizes, prev, pager, next, jumper',
  },
  total: {
    type: Number,
    default: 1,
  },
  page: {
    type: Object,
    default: () => ({ currentPage: 1, pageSize: 10 }),
  },
  // 分页
  footerShow: {
    type: Boolean,
    default: true,
  },
  // 展开行
  treeProps: {
    type: Object,
    default: () => ({}),
  },
});
const emits = defineEmits(['handleSelectionChange', 'update:page']);
const handleSelectionChange = (value: any) => {
  emits('handleSelectionChange', value);
};
const handleSizeChange = (pageSize: number) => {
  emits('update:page', { ...props.page, pageSize });
};
const handleCurrentChange = (currentPage: number) => {
  emits('update:page', { ...props.page, currentPage });
};
</script>

<style scoped lang="scss">
.page-table {
  width: 100%;
  border-top: 20px solid #f0f2f5;
  .table {
    padding: 20px;
  }
}
.header {
  padding: 10px 20px 5px;
  display: flex;
  justify-content: space-between;
}
.footer {
  padding-right: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
