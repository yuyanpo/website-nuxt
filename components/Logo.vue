<template>
  <div class="flex items-center gap-2">
    <div class="i-carbon-application" :class="[dark ? 'text-teal-400' : 'text-teal-600', `text-${size || '2xl'}`]"></div>
    <span class="font-bold" :class="[dark ? 'text-white' : 'text-gray-800', `text-${size || 'xl'}`]">公司名称</span>
  </div>
</template>

<script setup>
// 组件属性
defineProps({
  dark: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: '2xl'
  }
})
</script>
