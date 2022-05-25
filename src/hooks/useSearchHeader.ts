import { ref } from 'vue';
import pageContent from '@/components/page-content/src/page-content.vue';
export function useSearchHeader() {
  const pageContentRef = ref<InstanceType<typeof pageContent>>();
  const handelResetClick = () => {
    pageContentRef.value?.getPageData();
  };
  const handelSearchClick = (queryInfo: any) => {
    pageContentRef.value?.getPageData(queryInfo);
  };
  return { pageContentRef, handelResetClick, handelSearchClick };
}
