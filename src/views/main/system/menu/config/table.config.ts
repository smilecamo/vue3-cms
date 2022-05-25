// import { ITableType } from '@/base-ui/table';
export const tableConfig = {
  title: '菜单',
  listProp: [
    {
      label: '名称',
      prop: 'name',
    },
    {
      label: '路径',
      prop: 'url',
      slotName: 'url',
    },
    {
      label: '权限',
      prop: 'permission',
      slotName: 'permission',
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
  footerShow: false,
  tableSelectionColumn: false,
  tableIndexColumn: false,
  treeProps: {
    rowKey: 'id',
    treeProps: { children: 'children' },
  },
};
