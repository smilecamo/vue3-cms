import { useStore } from '@/store';

export default function usePermission(pageName: string, action: string) {
  const store = useStore();
  const path = `system:${pageName}:${action}`;
  const permission = store.state.loginModule.permission;
  return !!permission?.filter((item) => {
    return path === item;
  });
}
