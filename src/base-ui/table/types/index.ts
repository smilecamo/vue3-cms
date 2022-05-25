export interface IPropListType {
  label: string;
  prop?: string;
  slotName?: string;
  'min-width'?: string;
}
export interface ITableType {
  propList: IPropListType[];
  tableIndexColumn?: boolean;
  tableSelectionColumn?: boolean;
}
