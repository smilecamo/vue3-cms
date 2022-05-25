// import { ITableType } from '@/base-ui/table';
export const tableConfig = {
  title: '角色',
  tableIndexColumn: true,
  tableSelectionColumn: true,
  listProp: [
    {
      label: '用户名',
      prop: 'name',
    },
    {
      label: '角色',
      prop: 'intro',
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
