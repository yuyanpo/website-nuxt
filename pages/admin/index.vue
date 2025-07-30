<script setup>
definePageMeta({
  layout: 'admin',
  title: '管理后台',
  middleware: ['admin-auth'],
})

// 图表数据
// const visitorsChart = ref([60, 80, 40, 70, 90, 50, 75])
// const salesChart = ref([45, 65, 35, 80, 70, 85, 60])
// const ordersChart = ref([30, 50, 70, 45, 60, 40, 55])
// const usersChart = ref([20, 40, 60, 80, 50, 70, 90])

const chartData = ref([
  { date: '周一', value: 60 },
  { date: '周二', value: 80 },
  { date: '周三', value: 40 },
  { date: '周四', value: 70 },
  { date: '周五', value: 90 },
  { date: '周六', value: 50 },
  { date: '周日', value: 75 },
])

// 活动数据
const activities = ref([
  {
    type: 'user',
    icon: 'i-carbon:user-plus',
    title: '新用户注册',
    description: '用户 张三 完成了注册',
    time: '2分钟前',
    status: 'success',
  },
  {
    type: 'order',
    icon: 'i-carbon:shopping-cart',
    title: '新订单创建',
    description: '订单 #12345 等待处理',
    time: '10分钟前',
    status: 'pending',
  },
  {
    type: 'content',
    icon: 'i-carbon:document-add',
    title: '内容更新',
    description: '产品页面内容已更新',
    time: '30分钟前',
    status: 'success',
  },
  {
    type: 'system',
    icon: 'i-carbon:notification',
    title: '系统通知',
    description: '系统维护将在今晚进行',
    time: '2小时前',
    status: 'warning',
  },
])

// 数据格式化函数
function formatNumber(num) {
  return String(num)
}

function formatCurrency(amount) {
  return `¥${amount.toLocaleString('zh-CN')}`
}

// 方法
function refreshData() {
  // 刷新数据逻辑
  // TODO: 实现数据刷新功能
}

function navigateToAnalytics() {
  // 跳转到分析页面
  // TODO: 实现分析页面跳转
}

function navigateToSales() {
  // TODO: 实现销售页面跳转
}

function navigateToOrders() {
  // TODO: 实现订单页面跳转
}

function navigateToUsers() {
  // TODO: 实现用户页面跳转
}

function createNews() {
  navigateTo('/admin/news/create')
}

function manageContent() {
  navigateTo('/admin/content')
}

function viewReports() {
  // TODO: 实现查看报表功能
}

function systemSettings() {
  // TODO: 实现系统设置功能
}

function showTooltip(_point, _event) {
  // 显示工具提示
  // TODO: 实现工具提示功能
}

function hideTooltip() {
  // 隐藏工具提示
  // TODO: 实现隐藏工具提示功能
}
</script>

<template>
  <div class="space-y-6">
    <!-- 欢迎区域 -->
    <div class="border border-gray-100 rounded-2xl bg-white p-6 shadow-sm">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="mb-2 text-2xl text-gray-900 font-bold">
            欢迎回来! 👋
          </h1>
          <p class="text-gray-600">
            今天也是充满活力的一天，让我们一起来看看系统的运行情况吧
          </p>
        </div>
        <button
          class="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-blue-700 transition-colors hover:bg-blue-100"
          @click="refreshData"
        >
          <div class="i-carbon:refresh" />
          <span class="font-medium">刷新数据</span>
        </button>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-4 md:grid-cols-2">
      <!-- 访问量卡片 -->
      <div
        class="group cursor-pointer border border-gray-100 rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        @click="navigateToAnalytics"
      >
        <div class="mb-4 flex items-center justify-between">
          <div class="h-12 w-12 flex items-center justify-center rounded-xl from-blue-500 to-blue-600 bg-gradient-to-r">
            <div class="i-carbon:user-multiple text-xl text-white" />
          </div>
          <div class="flex items-center gap-1 text-sm text-green-600 font-medium">
            <div class="i-carbon:trending-up" />
            <span>+12%</span>
          </div>
        </div>
        <div class="mb-2">
          <p class="mb-1 text-sm text-gray-600">
            今日访问
          </p>
          <p class="text-2xl text-gray-900 font-bold">
            {{ formatNumber(8846) }}
          </p>
        </div>
        <div class="flex items-center gap-2 text-xs text-gray-500">
          <span>较昨日</span>
        </div>
      </div>

      <!-- 收入卡片 -->
      <div
        class="group cursor-pointer border border-gray-100 rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        @click="navigateToSales"
      >
        <div class="mb-4 flex items-center justify-between">
          <div class="h-12 w-12 flex items-center justify-center rounded-xl from-green-500 to-green-600 bg-gradient-to-r">
            <div class="i-carbon:currency-dollar text-xl text-white" />
          </div>
          <div class="flex items-center gap-1 text-sm text-green-600 font-medium">
            <div class="i-carbon:trending-up" />
            <span>+8%</span>
          </div>
        </div>
        <div class="mb-2">
          <p class="mb-1 text-sm text-gray-600">
            今日收入
          </p>
          <p class="text-2xl text-gray-900 font-bold">
            {{ formatCurrency(12628) }}
          </p>
        </div>
        <div class="flex items-center gap-2 text-xs text-gray-500">
          <span>较昨日</span>
        </div>
      </div>

      <!-- 订单卡片 -->
      <div
        class="group cursor-pointer border border-gray-100 rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        @click="navigateToOrders"
      >
        <div class="mb-4 flex items-center justify-between">
          <div class="h-12 w-12 flex items-center justify-center rounded-xl from-orange-500 to-orange-600 bg-gradient-to-r">
            <div class="i-carbon:shopping-cart text-xl text-white" />
          </div>
          <div class="flex items-center gap-1 text-sm text-red-600 font-medium">
            <div class="i-carbon:trending-down" />
            <span>-3%</span>
          </div>
        </div>
        <div class="mb-2">
          <p class="mb-1 text-sm text-gray-600">
            订单数量
          </p>
          <p class="text-2xl text-gray-900 font-bold">
            {{ formatNumber(1286) }}
          </p>
        </div>
        <div class="flex items-center gap-2 text-xs text-gray-500">
          <span>较昨日</span>
        </div>
      </div>

      <!-- 用户卡片 -->
      <div
        class="group cursor-pointer border border-gray-100 rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
        @click="navigateToUsers"
      >
        <div class="mb-4 flex items-center justify-between">
          <div class="h-12 w-12 flex items-center justify-center rounded-xl from-purple-500 to-purple-600 bg-gradient-to-r">
            <div class="i-carbon:user-plus text-xl text-white" />
          </div>
          <div class="flex items-center gap-1 text-sm text-green-600 font-medium">
            <div class="i-carbon:trending-up" />
            <span>+18%</span>
          </div>
        </div>
        <div class="mb-2">
          <p class="mb-1 text-sm text-gray-600">
            新增用户
          </p>
          <p class="text-2xl text-gray-900 font-bold">
            {{ formatNumber(458) }}
          </p>
        </div>
        <div class="flex items-center gap-2 text-xs text-gray-500">
          <span>较昨日</span>
        </div>
      </div>
    </div>

    <!-- 图表和活动区域 -->
    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <!-- 数据概览图表 -->
      <div class="border border-gray-100 rounded-2xl bg-white p-6 shadow-sm lg:col-span-2">
        <div class="mb-6 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="i-carbon:analytics text-xl text-blue-600" />
            <h2 class="text-lg text-gray-900 font-semibold">
              数据概览
            </h2>
          </div>
          <div class="flex gap-2">
            <button class="rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700 font-medium">
              7天
            </button>
            <button class="rounded-lg px-3 py-1 text-sm text-gray-500 hover:bg-gray-100">
              30天
            </button>
            <button class="rounded-lg px-3 py-1 text-sm text-gray-500 hover:bg-gray-100">
              90天
            </button>
          </div>
        </div>

        <!-- 简化图表 -->
        <div class="h-64 flex items-end justify-between gap-2">
          <div
            v-for="(point, index) in chartData"
            :key="index"
            class="group relative flex-1 cursor-pointer rounded-t-lg from-blue-500 to-blue-600 bg-gradient-to-t"
            :style="`height: ${point.value}%`"
            @mouseenter="showTooltip(point, $event)"
            @mouseleave="hideTooltip"
          >
            <div class="absolute left-1/2 transform rounded bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity -top-8 -translate-x-1/2 group-hover:opacity-100">
              {{ point.date }}: {{ point.value }}
            </div>
          </div>
        </div>

        <div class="mt-4 flex items-center gap-6">
          <div class="flex items-center gap-2">
            <div class="h-3 w-3 rounded-full bg-blue-500" />
            <span class="text-sm text-gray-600">访问量</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="h-3 w-3 rounded-full bg-green-500" />
            <span class="text-sm text-gray-600">销售额</span>
          </div>
        </div>
      </div>

      <!-- 实时动态 -->
      <div class="border border-gray-100 rounded-2xl bg-white p-6 shadow-sm">
        <div class="mb-6 flex items-center gap-3">
          <div class="i-carbon:notification text-xl text-blue-600" />
          <h2 class="text-lg text-gray-900 font-semibold">
            实时动态
          </h2>
        </div>

        <div class="space-y-4">
          <div
            v-for="activity in activities"
            :key="activity.title"
            class="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-gray-50"
          >
            <div
              class="h-8 w-8 flex flex-shrink-0 items-center justify-center rounded-lg"
              :class="{
                'bg-green-100 text-green-600': activity.status === 'success',
                'bg-yellow-100 text-yellow-600': activity.status === 'warning',
                'bg-blue-100 text-blue-600': activity.status === 'pending',
              }"
            >
              <div :class="activity.icon" />
            </div>
            <div class="min-w-0 flex-1">
              <p class="mb-1 text-sm text-gray-900 font-medium">
                {{ activity.title }}
              </p>
              <p class="mb-1 text-xs text-gray-600">
                {{ activity.description }}
              </p>
              <p class="text-xs text-gray-500">
                {{ activity.time }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 快捷操作 -->
    <div class="border border-gray-100 rounded-2xl bg-white p-6 shadow-sm">
      <h2 class="mb-4 text-lg text-gray-900 font-semibold">
        快捷操作
      </h2>
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-4 md:grid-cols-2">
        <button
          class="group flex items-center gap-3 border border-gray-200 rounded-xl p-4 transition-colors hover:bg-gray-50"
          @click="createNews"
        >
          <div class="h-10 w-10 flex items-center justify-center rounded-lg from-blue-500 to-blue-600 bg-gradient-to-r">
            <div class="i-carbon:document-add text-white" />
          </div>
          <div class="text-left">
            <p class="text-gray-900 font-medium">
              创建新闻
            </p>
            <p class="text-xs text-gray-500">
              发布新的新闻内容
            </p>
          </div>
        </button>

        <button
          class="group flex items-center gap-3 border border-gray-200 rounded-xl p-4 transition-colors hover:bg-gray-50"
          @click="manageContent"
        >
          <div class="h-10 w-10 flex items-center justify-center rounded-lg from-green-500 to-green-600 bg-gradient-to-r">
            <div class="i-carbon:document text-white" />
          </div>
          <div class="text-left">
            <p class="text-gray-900 font-medium">
              内容管理
            </p>
            <p class="text-xs text-gray-500">
              管理网站内容
            </p>
          </div>
        </button>

        <button
          class="group flex items-center gap-3 border border-gray-200 rounded-xl p-4 transition-colors hover:bg-gray-50"
          @click="viewReports"
        >
          <div class="h-10 w-10 flex items-center justify-center rounded-lg from-purple-500 to-purple-600 bg-gradient-to-r">
            <div class="i-carbon:chart-line text-white" />
          </div>
          <div class="text-left">
            <p class="text-gray-900 font-medium">
              查看报表
            </p>
            <p class="text-xs text-gray-500">
              生成数据报表
            </p>
          </div>
        </button>

        <button
          class="group flex items-center gap-3 border border-gray-200 rounded-xl p-4 transition-colors hover:bg-gray-50"
          @click="systemSettings"
        >
          <div class="h-10 w-10 flex items-center justify-center rounded-lg from-orange-500 to-orange-600 bg-gradient-to-r">
            <div class="i-carbon:settings text-white" />
          </div>
          <div class="text-left">
            <p class="text-gray-900 font-medium">
              系统设置
            </p>
            <p class="text-xs text-gray-500">
              配置系统参数
            </p>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
