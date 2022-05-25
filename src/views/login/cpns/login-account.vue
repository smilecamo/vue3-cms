<template>
  <div class="login-account">
    <el-form label-width="70px" :rules="rules" :model="account" ref="formRef">
      <el-form-item label="账号" prop="name">
        <el-input placeholder="请输入账号" v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <!-- 使用 show-password 属性即可得到一个可切换显示隐藏的密码框 -->
        <el-input
          placeholder="请输入密码"
          type="password"
          show-password
          v-model="account.password"
        />
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElForm } from 'element-plus'; // 拿到类型 给下面的ref定义类型
import { rules } from '../config/account.config';
import localCache from 'utils/cache.ts';
import { useStore } from 'vuex';
const account = reactive({
  name: localCache.getCache('name') ?? '',
  password: localCache.getCache('password') ?? '',
});
const state = useStore();
const formRef = ref<InstanceType<typeof ElForm>>(); // 定义ref类型
const LoginAccountMethod = (isKeepPass: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1. 判断是否需要记录密码
      if (isKeepPass) {
        // 1.1 本地缓存
        localCache.setCache('name', account.name);
        localCache.setCache('password', account.password);
      } else {
        // 1.2 清除本地缓存
        localCache.deleteCache('name', account.name);
        localCache.deleteCache('password', account.password);
      }
      // 2. 登录
      state.dispatch('loginModule/accountLoginAction', { ...account });
    }
  });
};

// 为了在 <script setup> 组件中明确要暴露出去的属性，使用 defineExpose 编译器宏：
defineExpose({
  LoginAccountMethod,
});
</script>
