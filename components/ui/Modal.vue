<script setup lang="ts">
interface Props {
  show: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnClickOutside?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  size: 'md',
  closeOnClickOutside: true,
})

const emit = defineEmits<{
  (e: 'update:show', value: boolean): void
  (e: 'close'): void
}>()

// 尺寸映射
const sizeClass = computed(() => {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
  }
  return sizes[props.size]
})

// 关闭弹窗
function close() {
  emit('update:show', false)
  emit('close')
}

// 点击遮罩层
function handleOverlayClick() {
  if (props.closeOnClickOutside) {
    close()
  }
}

// ESC 键关闭
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.show) {
    close()
  }
}

// 监听键盘事件
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        @click.self="handleOverlayClick"
      >
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95"
          enter-to-class="opacity-100 scale-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100"
          leave-to-class="opacity-0 scale-95"
        >
          <div
            v-if="show"
            class="mx-4 w-full rounded-2xl bg-white p-6 shadow-xl"
            :class="sizeClass"
          >
            <!-- 头部 -->
            <div v-if="title || $slots.header" class="mb-6 flex items-center justify-between">
              <slot name="header">
                <h3 class="text-lg text-gray-900 font-semibold">
                  {{ title }}
                </h3>
              </slot>
              <button
                class="p-1 text-gray-400 transition-colors hover:text-gray-600"
                @click="close"
              >
                <div class="i-carbon:close" />
              </button>
            </div>

            <!-- 内容 -->
            <div>
              <slot />
            </div>

            <!-- 底部 -->
            <div v-if="$slots.footer" class="mt-6">
              <slot name="footer" />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

