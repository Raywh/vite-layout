<!-- vue3.6  setup lang="ts" pinia 登录页面 -->
<template>
  <div class="login">
    <el-card class="login-card">
      <div class="login-title">用户登录</div>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="80px"
        class="login-form"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model.trim="ruleForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model.trim="ruleForm.password"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import router from "@/router";
import { useAuthStore } from "@/store/user";
import { useLogin } from "@/api/user";
import { ElMessage } from "element-plus";
// get auth store
const authStore = useAuthStore();
const ruleFormRef = ref<FormInstance>();
// define Form data
const ruleForm = reactive({
  username: "00000000",
  password: "123456abc",
});

const rules = reactive<FormRules>({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

// define Form submit function
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const result = await useLogin({
        username: ruleForm.username,
        password: ruleForm.password,
      });
      console.log("Login result:", result);
      authStore.setUser("result");
      // Redirect to the home page
      // router.push("/");
      if (result && result.code === 0) {
        console.log("Login success");
        authStore.setUserToken(result.data.token);
        router.push("/");
      } else {
        ElMessage({
          showClose: true,
          message: result?.message || "Warning, this is a warning message.",
          type: "warning",
        });
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.login-card {
  width: 360px;
}

.login-title {
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.login-form {
  margin-top: 20px;
}
</style>
