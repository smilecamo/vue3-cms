<template>
  <div class="search-header">
    <hy-form v-bind="searchForm" v-model="formData">
      <template #footer>
        <div class="handel-btn">
          <el-button @click="handelReset">重置</el-button>
          <el-button type="primary" @click="handelSearch">搜索</el-button>
        </div>
      </template>
    </hy-form>
  </div>
</template>

<script lang="ts" setup>
import HyForm from '@/base-ui/form/index';
import { ref } from 'vue';
const props = defineProps({
  searchForm: {
    type: Object,
    required: true,
  },
});
// 双向绑定值有配置文件中的field决定
const formItems = props.searchForm?.formItems ?? [];
const formOriginData: any = {};
for (const key of formItems) {
  formOriginData[key.field] = '';
}

const formData = ref(formOriginData);

// 事件外部
const emits = defineEmits(['handelResetClick', 'handelSearchClick']);
// 重置操作
// form 组件时 是浅拷贝的赋值 所这里使用修改key的值触发更新
const handelReset = () => {
  for (const key in formOriginData) {
    formData.value[`${key}`] = formOriginData[key];
  }
  emits('handelResetClick');
};
const handelSearch = () => {
  emits('handelSearchClick', formData.value);
};
</script>

<style scoped>
.search-header {
  padding: 10px 6px;
}
.handel-btn {
  text-align: right;
  padding: 10px;
}
</style>
