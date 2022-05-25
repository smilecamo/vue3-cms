<template>
  <div class="login">
    <login-panel />
  </div>
</template>

<script setup lang="ts">
import loginPanel from './cpns/login-panel';
</script>

<style scoped>
.login {
  display: flex;
  /* 居中排列 */
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  /* background-image: url('@/assets/img/login-bg.svg'); */
}
</style>
