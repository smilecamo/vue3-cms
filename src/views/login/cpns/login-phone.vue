<template>
  <div class="login-phone">
    <el-form label-width="70px" :rules="rules" :model="phoneMess" ref="formRef">
      <el-form-item label="手机号" prop="phoneNum">
        <el-input v-model="phoneMess.phoneNum" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="验证码" prop="verify">
        <div class="verify">
          <el-input v-model="phoneMess.verify" placeholder="请输入验证码" />
          <el-button type="primary" class="getVerify">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElForm } from 'element-plus';
import { phoneRules as rules } from '../config/account.config';
import localCache from 'utils/cache.ts';
import { useStore } from 'vuex';
const state = useStore();
const phoneMess = reactive({
  phoneNum: '',
  verify: '',
});
const formRef = ref<InstanceType<typeof ElForm>>();
const LoginPhoneMethod = (isKeepPass: boolean) => {
  formRef.value?.validate((valid) => {
    if (valid) {
      if (isKeepPass) {
        localCache.setCache('phoneNum', phoneMess.phoneNum);
        localCache.setCache('verify', phoneMess.password);
      } else {
        // 1.2 清除本地缓存
        localCache.deleteCache('phoneNum', phoneMess.phoneNum);
        localCache.deleteCache('verify', phoneMess.password);
      }
      // 调用登录
      state.dispatch('loginModule/phoneLoginAction', { ...phoneMess });
    }
  });
};
// 为了在 <script setup> 组件中明确要暴露出去的属性，使用 defineExpose 编译器宏：
defineExpose({
  LoginPhoneMethod,
});
</script>
<style scoped>
.verify {
  display: flex;
}
.getVerify {
  margin-left: 6px;
}
</style>
