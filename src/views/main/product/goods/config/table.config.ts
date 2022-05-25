// import { ITableType } from '@/base-ui/table';
export const tableConfig = {
  title: '用户',
  tableIndexColumn: true,
  tableSelectionColumn: true,
  listProp: [
    {
      label: '商品名称',
      prop: 'name',
    },
    {
      label: '原价',
      prop: 'oldPrice',
      slotName: 'oldPrice',
    },
    {
      label: '现价',
      prop: 'newPrice',
    },
    {
      label: '图片',
      prop: 'imgUrl',
      slotName: 'image',
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
