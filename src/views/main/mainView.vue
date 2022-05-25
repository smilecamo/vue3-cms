<template>
  <div class="main">
    <el-container class="main-content">
      <el-aside class="ani" :width="collapse ? '60px' : '210px'">
        <nav-menu :collapse="collapse"></nav-menu>
      </el-aside>
      <el-container class="page">
        <el-header>
          <nav-header @handelFoldChange="handelFoldChange"></nav-header
        ></el-header>
        <div class="page-info">
          <div class="info-page"><router-view></router-view></div>
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const collapse = ref(false);
const handelFoldChange = (fold: boolean) => {
  collapse.value = fold;
};
</script>

<style scoped lang="scss">
.main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.main-content,
.page {
  height: 100%;
  background-color: #f0f2f5;
  .page-info {
    background: #f0f2f5;
    overflow-y: scroll;
    .info-page {
      margin: 20px;
      border-radius: 6px;
      background: #fff;
    }
  }
}
.page-content {
  height: calc(100% - 48px);
}
.el-header,
.el-footer {
  display: flex;
  color: #333;
  text-align: center;
  align-items: center;
}
.el-header {
  background: #fff;
  height: 48px !important;
}
.el-aside {
  overflow-x: hidden;
  overflow-y: auto;
  line-height: 200px;
  text-align: left;
  cursor: pointer;
  background-color: #001529;
  transition: width 0.3s linear;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none;
  }
}
.el-main {
  color: #333;
  text-align: center;
  background-color: #f0f2f5;
}
.ani {
  // animation: 2s 0.2s;
}
</style>
