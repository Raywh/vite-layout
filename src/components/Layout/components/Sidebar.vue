<template>
    <el-aside class="page-side">
      <el-scrollbar>
        <el-menu
          :router="true"
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          :default-active="activePath"
          text-color="#fff"
        >
          <template v-for="item in private_routes" :key="item.path">
            <template v-if="item.children.length === 1">
              <el-menu-item :index="item.children[0].path">
                <el-icon>
                  <component :is="item.children[0].meta.icon" />
                </el-icon>
                <span>{{ item.children[0].meta.title }}</span>
              </el-menu-item>
            </template>

            <el-sub-menu v-if="item.children.length > 1" :index="item.path">
              <template #title>
                <el-icon><icon-menu /> </el-icon>
                {{ item.meta?.title }}
              </template>
              <el-menu-item
                v-for="child in item.children"
                :key="child.path"
                :index="child.path"
                >
                <el-icon><icon-menu /> </el-icon>
                {{ child.meta.title }}
              </el-menu-item>
            </el-sub-menu>
          </template>
        </el-menu>
      </el-scrollbar>
    </el-aside>
</template>

<script setup lang="ts">
import { computed } from "vue";
// 从路由中获取菜单
import { private_routes } from "@/router/menuRoutes";
import { Menu as IconMenu } from "@element-plus/icons-vue";
// 获取当前 路由的 path
import { useRoute } from "vue-router";
const route = useRoute();
// 获取当前 路由的 path
const activePath = computed(() => route.path);
</script>

<style scoped>
.page-side {
  background: #545c64;
  display: flex;
  flex-wrap: wrap;
  width: 150px;
}

.el-menu {
  border-right: none;
}
.el-scrollbar {
  height: 100%;
  width: 100%;
}
</style>
