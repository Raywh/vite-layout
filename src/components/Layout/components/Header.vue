<template>
  <el-header>
    <div class="toolbar">
      <el-dropdown>
        <div class="channel-title">
          <el-icon><setting /></el-icon>
          <span class="channel-title-name">{{ channel_id || "设置" }}</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="go('/index')">主页</el-dropdown-item>
            <el-dropdown-item @click="go('/account/index')">我的</el-dropdown-item>
            <el-dropdown-item @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import router from '@/router'

import { Setting } from "@element-plus/icons-vue";
// 从store中获取用户信息
import { useAuthStore } from "@/store/user";
const authStore = useAuthStore();
const channel_id = authStore.info.channel_id || "设置";

// 调用store中的退出方法
const logout = () => {
  authStore.logout();
};
// 根据参数 路由跳转
const go = (path: string) => {
  router.push(path);
};
</script>

<style scoped>
.toolbar {
  display: flex;
  align-items: center;
  justify-content: end;
  height: 100%;
  margin-right: 10px;
}

.el-header {
  background-color: #b3c0d1;
  color: rgb(255, 253, 253);
}
.channel-title {
  line-height: 19px;
  font-size: 19px;
  display: flex;
  align-items: center;
}
.channel-title-name {
  margin-left: 5px;
  color: #009688;
}
</style>
