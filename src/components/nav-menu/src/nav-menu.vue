<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse">Vue-TS</span>
    </div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="collapse"
    >
      <template v-for="item of menus" :key="item.id">
        <!-- 有下拉菜单的menu -->
        <template v-if="+item.type === 1">
          <!-- 一级菜单名称 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- {{ filterIcon(item.icon) }} -->
              <el-icon :size="16">
                <component :is="filterIcon(item.icon)"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <!-- 菜单项 -->
            <template v-for="subItem of item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="handleMenuItemClick(subItem)"
              >
                <i v-if="subItem.icon" :class="subItem.icon"></i>
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 没有下拉菜单的menu -->
        <template v-else-if="+item.type === 2">
          <el-menu-item :index="item.id + ''">
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store';
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { pathToMenu } from '@/utils/map-menus';

const store = useStore();
const router = useRouter();
const route = useRoute();

defineProps({
  collapse: {
    type: Boolean,
  },
});
// 获取菜单
const menus = computed(() => store.state.loginModule.userMenus);

// 设置高亮菜单项
const path = route.path; // 获取当前url
const defaultActive = ref(pathToMenu(menus.value, path).id + ''); // 根据url进行查找匹配

// 替换掉icon
const filterIcon = (value: string) => {
  return value.split(/el-icon-/)[1];
};
// menu点击事件跳转
const handleMenuItemClick = (item: any) => {
  router.push(item.url);
};
</script>

<style scoped lang="scss">
.nav-menu {
  height: 100%;
  background-color: #001529;
  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: #fff;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  :deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
