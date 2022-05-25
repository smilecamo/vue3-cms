<template>
  <slot name="header"></slot>
  <el-form :label-width="labelWidth">
    <el-row>
      <template v-for="formItem of formItems" :key="formItem.label">
        <el-col v-bind="colLayout">
          <el-form-item
            v-if="!formItem.isHidden"
            :label="formItem.label"
            :rules="formItem.rules"
            :style="itemStyle"
          >
            <template
              v-if="formItem.type === 'input' || formItem.type === 'password'"
            >
              <el-input
                type="input"
                v-model="formData[`${formItem.field}`]"
                :show-password="formItem.type === 'password'"
                :placeholder="formItem.placeholder"
              >
              </el-input>
            </template>
            <template v-if="formItem.type === 'select'">
              <el-select
                v-model="formData[`${formItem.field}`]"
                :placeholder="formItem.placeholder"
                style="width: 100%"
              >
                <el-option
                  v-for="item in formItem.selOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </template>
            <template v-if="formItem.type === 'datePicker'">
              <el-date-picker
                v-model="formData[`${formItem.field}`]"
                style="width: 100%"
                v-bind="formItem.otherOptions"
              >
              </el-date-picker>
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
  <slot name="footer"></slot>
</template>

<script setup lang="ts">
import { PropType, ref, watch } from 'vue';
import { IFormType } from '../types/index';
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  formItems: {
    type: Array as PropType<IFormType[]>,
    default: () => [],
  },
  labelWidth: {
    type: String,
    default: '100px',
  },
  itemStyle: {
    type: Object,
    default: () => ({
      padding: '10px 40px',
    }),
  },
  colLayout: {
    type: Object,
    default: () => ({
      xs: 24,
      sm: 24,
      md: 12,
      lg: 8,
      xl: 6,
    }),
  },
});
const emit = defineEmits(['update:modelValue']);
const formData = ref({ ...props.modelValue });
watch(
  formData,
  (newValue) => {
    emit('update:modelValue', newValue);
  },
  {
    deep: true,
  },
);
</script>

<style scoped></style>
