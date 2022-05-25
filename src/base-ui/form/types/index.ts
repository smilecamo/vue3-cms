export interface IFormType {
  field?: string;
  type: string;
  label: string;
  rules?: any[];
  placeholder?: any;
  selOptions?: any[];
  otherOptions?: any;
  isHidden?: boolean;
}
export interface IForm {
  formItems: IFormType[];
  labelWidth?: string;
  itemStyle?: any;
  colLayout?: any;
}
