<template>
  <el-container class="layout-container">
    <Sidebar />

    <div class="main-page">
      <div class="header">
        <Header />
      </div>
      <div class="main">
        <el-scrollbar>
          <AppMain />
        </el-scrollbar>
      </div>
    </div>
  </el-container>
  <el-backtop target=".main .el-scrollbar__wrap" />

</template>

<script lang="ts" setup>
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";
import AppMain from "./components/AppMain.vue";
</script>

<style scoped>
.layout-container {
  height: 100vh;
  display: flex;
}
.main-page {
  flex: 1;
  right: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.header {
  height: 60px;
}
.main {
  flex: 1;
  width: 100%;
  overflow: auto;
}
</style>
