<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="30%"
    destroy-on-close
    center
  >
    <hy-form v-bind="formConfig" v-model="formData"></hy-form>
    <slot></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handelCancel">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from '@/store';
import HyForm from '@/base-ui/form';
const props = defineProps({
  title: {
    type: String,
    default: () => '标题',
  },
  formConfig: {
    type: Object,
    required: true,
  },
  defaultInfo: {
    type: Object,
    required: true,
  },
  otherInfo: {
    type: Object,
    default: () => ({}),
  },
  pageName: {
    type: String,
    required: true,
  },
});
const dialogVisible = ref(false);
const formData = ref({});
//
watch(
  () => props.defaultInfo,
  (newValue) => {
    formData.value = newValue;
  },
);

const store = useStore();
const handelCancel = () => {
  dialogVisible.value = false;
};
const handelConfirm = () => {
  dialogVisible.value = false;
  if (Object.keys(props.defaultInfo).length > 0) {
    store.dispatch('systemModule/editPageDataAction', {
      pageName: props.pageName,
      editData: { ...formData.value, ...props.otherInfo },
      id: props.defaultInfo.id,
    });
  } else {
    store.dispatch('systemModule/createPageDataAction', {
      pageName: props.pageName,
      newData: { ...formData.value, ...props.otherInfo.value },
    });
  }
};
defineExpose({
  dialogVisible,
  formData,
});
</script>

<style scoped></style>
