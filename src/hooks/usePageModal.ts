import { ref } from 'vue';
import pageModal from '@/components/page-modal';
type callFn = (item?: any) => void;
export default function usePageModal(newCb?: callFn, editCb?: callFn) {
  const pageModalRef = ref<InstanceType<typeof pageModal>>();
  const defaultInfo = ref({});
  const handleAddDate = () => {
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
      pageModalRef.value.formData = {};
    }
    newCb && newCb();
  };
  const handleEditData = (item: any) => {
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
      defaultInfo.value = { ...item };
    }
    editCb && editCb(item);
  };
  return {
    pageModalRef,
    defaultInfo,
    handleAddDate,
    handleEditData,
  };
}
