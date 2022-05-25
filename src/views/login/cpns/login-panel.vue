<template>
  <div class="login-panel">
    <h2 class="title">后台管理系统</h2>
    <el-tabs type="border-card" stretch class="demo-tabs" v-model="currentTab">
      <el-tab-pane name="accountTab">
        <!-- #label 具名插槽语法糖：# -->
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><user-filled /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phoneTab">
        <!-- #label 具名插槽语法糖：# -->
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><iphone /></el-icon>
            <span>手机号登录</span>
          </span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>
    <div class="password-operate">
      <el-checkbox v-model="isKeepPass" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button type="primary" class="login-btn" @click="handleLogin"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
//1.手动导入 icons 组件
import { UserFilled, Iphone } from '@element-plus/icons-vue';
import LoginAccount from './login-account.vue';
import LoginPhone from './login-phone.vue';
let currentTab = ref<string>('accountTab');
let isKeepPass = ref(true);
const accountRef = ref<InstanceType<typeof LoginAccount>>();
const phoneRef = ref<InstanceType<typeof LoginPhone>>(); // 定义组件ref 需要在组件中使用
const handleLogin = () => {
  if (currentTab.value === 'accountTab') {
    accountRef.value?.LoginAccountMethod(isKeepPass.value);
  } else {
    phoneRef.value?.LoginPhoneMethod(isKeepPass.value);
  }
};
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
}
.login-panel {
  width: 320px;
  margin-top: -100px;
}
.el-icon {
  margin-right: 4px;
  vertical-align: middle;
}
.password-operate {
  display: flex;
  justify-content: space-between;
}
.login-btn {
  width: 100%;
  height: 36px;
}
</style>
