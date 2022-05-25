import type { IForm } from '@/base-ui/form/index';
export const dialogFormConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名',
      placeholder: '请输入角色名',
    },
    {
      field: 'intro',
      type: 'input',
      label: '角色描述',
      placeholder: '请输入角色描述',
    },
  ],
  labelWidth: '120px',
  itemStyle: {},
  colLayout: {
    span: 24,
  },
};
