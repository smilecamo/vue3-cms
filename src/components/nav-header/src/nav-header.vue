<template>
  <div class="contain">
    <el-icon :size="20" @click="handleIconChange">
      <component :is="icon ? 'fold' : 'expand'"></component>
    </el-icon>
    <div class="right">
      <div class="right-left">
        <HyBreadcrumb :breadCrumb="breadCrumb"></HyBreadcrumb>
      </div>
      <div class="right-info">
        <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        />
        <el-dropdown>
          <span class="el-dropdown-link">
            {{ name }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleLogout"
                >退出登录</el-dropdown-item
              >
              <el-dropdown-item>个人设置</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from '@/store';
import HyBreadcrumb from '@/base-ui/breadcrumb/index';
import { useRoute, useRouter } from 'vue-router';
import { pathToBreadCrumb } from '@/utils/map-menus';
const icon = ref(false);
const store = useStore();
const emit = defineEmits(['handelFoldChange']);
const name = computed(() => {
  return store.state.loginModule.userInfo.name;
});
const handleIconChange = () => {
  icon.value = !icon.value;
  emit('handelFoldChange', icon.value);
};

const breadCrumb = computed(() => {
  const store = useStore();
  const menus = store.state.loginModule.userMenus;
  const route = useRoute();
  const currentPath = route.path;
  return pathToBreadCrumb(menus, currentPath);
});
const router = useRouter();
const handleLogout = () => {
  router.push('login');
};
</script>

<style scoped lang="scss">
.contain {
  display: flex;
  align-items: center;
  width: 100%;
  .right {
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .right-info {
      cursor: pointer;
      display: flex;
      align-items: center;
      .el-dropdown-link {
        padding-left: 10px;
      }
    }
  }
}
</style>
