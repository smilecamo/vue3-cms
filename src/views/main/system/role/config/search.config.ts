import type { IForm } from '@/base-ui/form/index';
export const searchForm: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名',
    },
  ],
  labelWidth: '120px',
  itemStyle: {
    padding: '10px 40px',
  },
  // colLayout: {
  //   span: 8,
  // },
};
