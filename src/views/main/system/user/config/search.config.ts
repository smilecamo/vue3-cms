import type { IForm } from '@/base-ui/form/index';
export const searchForm: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '姓名',
      placeholder: '请输入姓名',
    },
    {
      field: 'realname',
      type: 'input',
      label: '真实姓名',
      placeholder: '请输入真实姓名',
    },
    {
      field: 'enable',
      type: 'select',
      label: '状态',
      placeholder: '请输入状态',
      selOptions: [
        {
          label: '暂停',
          value: '0',
        },
        {
          label: '启用',
          value: '1',
        },
      ],
    },
    {
      field: 'createAt',
      type: 'datePicker',
      label: '创建时间',
      placeholder: '请输入创建时间',
      otherOptions: {
        type: 'daterange',
        'start-placeholder': '开始时间',
        'end-placeholder': '结束时间',
      },
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
