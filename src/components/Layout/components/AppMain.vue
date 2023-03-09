<template>
  <el-main>
    <router-view v-slot="{ Component }">
      <transition name="nested">
        <component :is="Component" />
      </transition>
    </router-view>
  </el-main>
</template>

<script setup lang="ts">
// import { ref, watch, computed } from "vue";
// import { useRoute } from "vue-router";
// const route = useRoute();
// const key = route.path;
</script>

<style scoped>
.nested-enter-active .inner,
.nested-leave-active .inner {
  transition: all 0.3s ease-in-out;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
  transform: translateX(30px);
  opacity: 0;
}
</style>
