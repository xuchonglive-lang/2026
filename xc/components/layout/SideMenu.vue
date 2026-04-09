<template>
  <view class="w-[200px] bg-base-100 min-h-full border-r border-base-200">
    <ul class="menu p-3 w-full gap-1 mt-2">
      <li v-for="item in menuItems" :key="item.path || item.title">
        <a 
          :class="{'active bg-primary/10 text-primary font-bold border-l-4 border-primary rounded-l-none': currentPath === item.path, 'border-l-4 border-transparent': currentPath !== item.path}" 
          @click="navigateTo(item.path)"
          class="rounded-lg transition-all duration-200 hover:bg-base-200 hover:translate-x-1"
        >
          {{ item.title }}
        </a>
      </li>
    </ul>
  </view>
</template>

<script>
export default {
  name: 'SideMenu',
  props: {
    menuItems: { type: Array, default: () => [] },
  },
  data() {
    return {
      currentPath: '',
    }
  },
  mounted() {
    const pages = getCurrentPages()
    if (pages.length > 0) {
      this.currentPath = '/' + pages[pages.length - 1].route
    }
  },
  methods: {
    navigateTo(path) {
      if (!path || this.currentPath === path) return
      uni.vk.navigateTo(path)
    },
  },
}
</script>

<style lang="scss" scoped>
/* Scoped styles removed in favor of Tailwind CSS / DaisyUI utility classes */
</style>
