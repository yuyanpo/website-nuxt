<script setup>
definePageMeta({
  layout: 'admin',
  title: '管理后台',
  middleware: ['admin-auth'],
})

// 数据格式化函数
function formatNumber(num) {
  return num.toLocaleString('zh-CN')
}

function formatCurrency(amount) {
  return `¥${amount.toLocaleString('zh-CN')}`
}

// 图表数据
const visitorsChart = ref([60, 80, 40, 70, 90, 50, 75])
const salesChart = ref([45, 65, 35, 80, 70, 85, 60])
const ordersChart = ref([30, 50, 70, 45, 60, 40, 55])
const usersChart = ref([20, 40, 60, 80, 50, 70, 90])

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
    icon: 'i-carbon:user-plus w-16px h-16px',
    title: '新用户注册',
    description: '用户 张三 完成了注册',
    time: '2分钟前',
    status: 'success',
  },
  {
    type: 'order',
    icon: 'i-carbon:shopping-cart w-16px h-16px',
    title: '新订单创建',
    description: '订单 #12345 等待处理',
    time: '10分钟前',
    status: 'pending',
  },
  {
    type: 'content',
    icon: 'i-carbon:document-add w-16px h-16px',
    title: '内容更新',
    description: '产品页面内容已更新',
    time: '30分钟前',
    status: 'success',
  },
  {
    type: 'system',
    icon: 'i-carbon:notification w-16px h-16px',
    title: '系统通知',
    description: '系统维护将在今晚进行',
    time: '2小时前',
    status: 'warning',
  },
])

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
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <div class="header-content">
        <h1>欢迎回来! 👋</h1>
        <p>今天也是充满活力的一天，让我们一起来看看系统的运行情况吧</p>
      </div>
      <div class="header-actions">
        <button class="refresh-btn" @click="refreshData">
          <div class="i-carbon:refresh h-18px w-18px" />
          刷新数据
        </button>
      </div>
    </div>

    <div class="dashboard-cards">
      <div class="card visitors" @click="navigateToAnalytics">
        <div class="card-background">
          <div class="card-icon">
            <div class="i-carbon:user-multiple h-32px w-32px" />
          </div>
          <div class="card-content">
            <div class="card-title">
              今日访问
            </div>
            <div class="card-number">
              {{ formatNumber(8846) }}
            </div>
            <div class="card-footer">
              <span class="trend positive">
                <div class="i-carbon:trending-up h-12px w-12px" />
                12%
              </span>
              <span class="period">较昨日</span>
            </div>
          </div>
        </div>
        <div class="card-chart">
          <div class="mini-chart">
            <div v-for="(height, index) in visitorsChart" :key="index" class="chart-bar" :style="`height: ${height}%`" />
          </div>
        </div>
      </div>

      <div class="card sales" @click="navigateToSales">
        <div class="card-background">
          <div class="card-icon">
            <div class="i-carbon:currency-dollar h-32px w-32px" />
          </div>
          <div class="card-content">
            <div class="card-title">
              今日收入
            </div>
            <div class="card-number">
              {{ formatCurrency(12628) }}
            </div>
            <div class="card-footer">
              <span class="trend positive">
                <div class="i-carbon:trending-up h-12px w-12px" />
                8%
              </span>
              <span class="period">较昨日</span>
            </div>
          </div>
        </div>
        <div class="card-chart">
          <div class="mini-chart">
            <div v-for="(height, index) in salesChart" :key="index" class="chart-bar" :style="`height: ${height}%`" />
          </div>
        </div>
      </div>

      <div class="card orders" @click="navigateToOrders">
        <div class="card-background">
          <div class="card-icon">
            <div class="i-carbon:shopping-cart h-32px w-32px" />
          </div>
          <div class="card-content">
            <div class="card-title">
              订单数量
            </div>
            <div class="card-number">
              {{ formatNumber(1286) }}
            </div>
            <div class="card-footer">
              <span class="trend negative">
                <div class="i-carbon:trending-down h-12px w-12px" />
                3%
              </span>
              <span class="period">较昨日</span>
            </div>
          </div>
        </div>
        <div class="card-chart">
          <div class="mini-chart">
            <div v-for="(height, index) in ordersChart" :key="index" class="chart-bar" :style="`height: ${height}%`" />
          </div>
        </div>
      </div>

      <div class="card users" @click="navigateToUsers">
        <div class="card-background">
          <div class="card-icon">
            <div class="i-carbon:user-plus h-32px w-32px" />
          </div>
          <div class="card-content">
            <div class="card-title">
              新增用户
            </div>
            <div class="card-number">
              {{ formatNumber(458) }}
            </div>
            <div class="card-footer">
              <span class="trend positive">
                <div class="i-carbon:trending-up h-12px w-12px" />
                18%
              </span>
              <span class="period">较昨日</span>
            </div>
          </div>
        </div>
        <div class="card-chart">
          <div class="mini-chart">
            <div v-for="(height, index) in usersChart" :key="index" class="chart-bar" :style="`height: ${height}%`" />
          </div>
        </div>
      </div>
    </div>

    <div class="data-section">
      <div class="chart-container">
        <div class="chart-header">
          <h2>
            <div class="i-carbon:analytics h-24px w-24px" />
            数据概览
          </h2>
          <div class="chart-controls">
            <button class="time-btn active">
              7天
            </button>
            <button class="time-btn">
              30天
            </button>
            <button class="time-btn">
              90天
            </button>
          </div>
        </div>
        <div class="chart">
          <div class="chart-grid">
            <div v-for="i in 5" :key="i" class="grid-line" />
          </div>
          <div class="chart-data">
            <div
              v-for="(point, index) in chartData"
              :key="index"
              class="data-point"
              :style="`height: ${point.value}%; left: ${index * 14.28}%`"
              @mouseenter="showTooltip(point, $event)"
              @mouseleave="hideTooltip"
            >
              <div class="point-dot" />
            </div>
          </div>
        </div>
        <div class="chart-legend">
          <div class="legend-item">
            <div class="legend-color visitors" />
            <span>访问量</span>
          </div>
          <div class="legend-item">
            <div class="legend-color sales" />
            <span>销售额</span>
          </div>
        </div>
      </div>

      <div class="activity-panel">
        <div class="panel-header">
          <h2>
            <div class="i-carbon:notification h-24px w-24px" />
            实时动态
          </h2>
          <button class="more-btn">
            <div class="i-carbon:overflow-menu-horizontal h-20px w-20px" />
          </button>
        </div>
        <div class="activity-list">
          <div v-for="(activity, index) in activities" :key="index" class="activity-item">
            <div class="activity-avatar" :class="activity.type">
              <div :class="activity.icon" />
            </div>
            <div class="activity-content">
              <div class="activity-title">
                {{ activity.title }}
              </div>
              <div class="activity-description">
                {{ activity.description }}
              </div>
              <div class="activity-time">
                {{ activity.time }}
              </div>
            </div>
            <div class="activity-status" :class="activity.status">
              <div class="status-dot" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 快速操作区域 -->
    <div class="quick-actions">
      <h2>
        <div class="i-carbon:lightning h-24px w-24px" />
        快速操作
      </h2>
      <div class="actions-grid">
        <button class="action-item" @click="createNews">
          <div class="action-icon">
            <div class="i-carbon:document-add h-28px w-28px" />
          </div>
          <span>创建新闻</span>
        </button>
        <button class="action-item" @click="manageContent">
          <div class="action-icon">
            <div class="i-carbon:edit h-28px w-28px" />
          </div>
          <span>编辑内容</span>
        </button>
        <button class="action-item" @click="viewReports">
          <div class="action-icon">
            <div class="i-carbon:chart-line h-28px w-28px" />
          </div>
          <span>查看报表</span>
        </button>
        <button class="action-item" @click="systemSettings">
          <div class="action-icon">
            <div class="i-carbon:settings h-28px w-28px" />
          </div>
          <span>系统设置</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-dashboard {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  padding: 24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.header-content h1 {
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-content p {
  margin: 0;
  color: #6b7280;
  font-size: 16px;
}

.refresh-btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  padding: 12px 20px;
  color: white;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.refresh-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
}

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}

.card {
  background: white;
  border-radius: 20px;
  padding: 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  position: relative;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
}

.card-background {
  padding: 24px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
}

.card.visitors {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.card.sales {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.card.orders {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.card.users {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  color: white;
}

.card-icon {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 16px;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-content {
  flex: 1;
  margin-left: 20px;
}

.card-title {
  font-size: 14px;
  opacity: 0.9;
  margin-bottom: 8px;
  font-weight: 500;
}

.card-number {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 12px;
  line-height: 1;
}

.card-footer {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
}

.trend {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 12px;
}

.trend.positive {
  background: rgba(34, 197, 94, 0.2);
  color: #16a34a;
}

.trend.negative {
  background: rgba(239, 68, 68, 0.2);
  color: #dc2626;
}

.period {
  opacity: 0.8;
  font-size: 13px;
}

.card-chart {
  padding: 0 24px 20px;
}

.mini-chart {
  display: flex;
  align-items: end;
  gap: 3px;
  height: 40px;
}

.chart-bar {
  flex: 1;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  min-height: 8px;
  transition: all 0.3s ease;
}

.chart-bar:hover {
  background: rgba(255, 255, 255, 0.5);
}

.data-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 32px;
}

.chart-container {
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.chart-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 12px;
}

.chart-controls {
  display: flex;
  gap: 8px;
}

.time-btn {
  background: transparent;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.time-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-color: transparent;
}

.time-btn:hover:not(.active) {
  background: #f3f4f6;
}

.chart {
  height: 200px;
  position: relative;
  margin-bottom: 20px;
}

.chart-grid {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.grid-line {
  height: 1px;
  background: #f3f4f6;
}

.chart-data {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.data-point {
  position: absolute;
  width: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 6px;
  transform: translateX(-50%);
  cursor: pointer;
  transition: all 0.3s ease;
}

.data-point:hover {
  transform: translateX(-50%) scale(1.2);
}

.point-dot {
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background: white;
  border: 2px solid #667eea;
  border-radius: 50%;
}

.chart-legend {
  display: flex;
  gap: 24px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #6b7280;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.legend-color.visitors {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.legend-color.sales {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.activity-panel {
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.panel-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 12px;
}

.more-btn {
  background: transparent;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.3s ease;
}

.more-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.activity-item:hover {
  background: #f8fafc;
}

.activity-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.activity-avatar.user {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.activity-avatar.order {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.activity-avatar.content {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.activity-avatar.system {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.activity-description {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 4px;
}

.activity-time {
  color: #9ca3af;
  font-size: 12px;
}

.activity-status {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.activity-status.success .status-dot {
  background: #22c55e;
}

.activity-status.pending .status-dot {
  background: #f59e0b;
}

.activity-status.warning .status-dot {
  background: #ef4444;
}

.quick-actions {
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.quick-actions h2 {
  margin: 0 0 24px 0;
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  display: flex;
  align-items: center;
  gap: 12px;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.action-item {
  background: transparent;
  border: 2px solid #e5e7eb;
  border-radius: 16px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}

.action-item:hover {
  border-color: #667eea;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  transform: translateY(-4px);
}

.action-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 16px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-item span {
  font-weight: 600;
  color: #374151;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .data-section {
    grid-template-columns: 1fr;
  }

  .dashboard-cards {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 768px) {
  .dashboard-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .dashboard-cards {
    grid-template-columns: 1fr;
  }

  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
