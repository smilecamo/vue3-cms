// import { ITableType } from '@/base-ui/table';
export const tableConfig = {
  title: '用户',
  tableIndexColumn: true,
  tableSelectionColumn: true,
  listProp: [
    {
      label: '姓名',
      prop: 'name',
    },
    {
      label: '真实姓名',
      prop: 'realname',
    },
    {
      label: '手机号',
      prop: 'cellphone',
    },
    {
      label: '状态',
      prop: 'enable',
      slotName: 'enable',
    },
    {
      label: '更新时间',
      prop: 'updateAt',
      slotName: 'updateAt',
    },
    {
      label: '创建时间',
      prop: 'createAt',
      slotName: 'createAt',
    },
    {
      label: '操作',
      slotName: 'handle',
    },
  ],
};
