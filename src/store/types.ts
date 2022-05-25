import ILoginState from './login/types';
import { ISystemType } from './main/system/types';
import { IDashboardState } from './main/analysis/types';
interface IRootState {
  entireRole: string[];
  entireDepartment: string[];
  entireMenu: any[];
}

interface IRootWithModule {
  loginModule: ILoginState;
  systemModule: ISystemType;
  dashboardModule: IDashboardState;
}

export type IStoreType = IRootState & IRootWithModule;
export default IRootState;
