import type { IForm } from '@/base-ui/form/index';
export const dialogFormConfig: IForm = {
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
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码',
      isHidden: false,
    },
    {
      field: 'cellphone',
      type: 'input',
      label: '手机号',
      placeholder: '请输入手机号',
    },
    {
      field: 'roleId',
      type: 'select',
      label: '角色',
      placeholder: '请选择角色',
      selOptions: [],
    },
    {
      field: 'departmentId',
      type: 'select',
      label: '组织',
      placeholder: '请选择组织',
      selOptions: [],
    },
  ],
  labelWidth: '120px',
  itemStyle: {},
  colLayout: {
    span: 24,
  },
};
