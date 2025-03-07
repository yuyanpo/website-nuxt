<template>
  <div class="admin-dashboard">
    <h1>控制台</h1>
    <div class="dashboard-cards">
      <div class="card">
        <div class="card-icon visitors">
          <div class="i-carbon:user-avatar w-36px h-36px" />
        </div>
        <div class="card-content">
          <div class="card-title">访问量</div>
          <div class="card-number">8,846</div>
          <div class="card-footer">
            <span class="positive">↑ 12%</span> 较上周
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-icon sales">
          <div class="i-carbon:shopping-cart w-36px h-36px" />
        </div>
        <div class="card-content">
          <div class="card-title">销售额</div>
          <div class="card-number">¥12,628</div>
          <div class="card-footer">
            <span class="positive">↑ 8%</span> 较上周
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-icon orders">
          <div class="i-carbon:document w-36px h-36px" />
        </div>
        <div class="card-content">
          <div class="card-title">订单数</div>
          <div class="card-number">1,286</div>
          <div class="card-footer">
            <span class="negative">↓ 3%</span> 较上周
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-icon users">
          <div class="i-carbon:user-multiple w-36px h-36px" />
        </div>
        <div class="card-content">
          <div class="card-title">新增用户</div>
          <div class="card-number">458</div>
          <div class="card-footer">
            <span class="positive">↑ 18%</span> 较上周
          </div>
        </div>
      </div>
    </div>
    
    <div class="data-section">
      <div class="chart-container">
        <h2>访问趋势</h2>
        <div class="chart">
          <!-- 这里可以集成图表组件 -->
          <div class="placeholder-chart">
            <div class="bar" style="height: 60%;"></div>
            <div class="bar" style="height: 80%;"></div>
            <div class="bar" style="height: 40%;"></div>
            <div class="bar" style="height: 70%;"></div>
            <div class="bar" style="height: 90%;"></div>
            <div class="bar" style="height: 50%;"></div>
            <div class="bar" style="height: 75%;"></div>
          </div>
        </div>
      </div>
      
      <div class="recent-activity">
        <h2>最近活动</h2>
        <ul class="activity-list">
          <li>
            <div class="activity-icon">
              <div class="i-carbon:user-avatar-filled" />
            </div>
            <div class="activity-content">
              <div class="activity-title">新用户注册</div>
              <div class="activity-time">10分钟前</div>
            </div>
          </li>
          <li>
            <div class="activity-icon">
              <div class="i-carbon:shopping-cart-arrow-down" />
            </div>
            <div class="activity-content">
              <div class="activity-title">新订单创建</div>
              <div class="activity-time">30分钟前</div>
            </div>
          </li>
          <li>
            <div class="activity-icon">
              <div class="i-carbon:document-add" />
            </div>
            <div class="activity-content">
              <div class="activity-title">内容更新</div>
              <div class="activity-time">2小时前</div>
            </div>
          </li>
          <li>
            <div class="activity-icon">
              <div class="i-carbon:notification" />
            </div>
            <div class="activity-content">
              <div class="activity-title">系统通知</div>
              <div class="activity-time">1天前</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  title: '管理后台',
  middleware: ['admin-auth']
})
</script>

<style scoped>
.admin-dashboard {
  width: 100%;
}

h1 {
  margin-bottom: 24px;
  font-size: 24px;
}

.dashboard-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 24px;
}

.card {
  background-color: white;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  display: flex;
  overflow: hidden;
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 16px;
  color: white;
}

.visitors {
  background-color: #1890ff;
}

.sales {
  background-color: #52c41a;
}

.orders {
  background-color: #faad14;
}

.users {
  background-color: #722ed1;
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: 14px;
  color: #8c8c8c;
  margin-bottom: 8px;
}

.card-number {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
}

.card-footer {
  font-size: 12px;
  color: #8c8c8c;
}

.positive {
  color: #52c41a;
}

.negative {
  color: #ff4d4f;
}

.data-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}

.chart-container, .recent-activity {
  background-color: white;
  border-radius: 4px;
  padding: 24px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
}

h2 {
  margin-bottom: 16px;
  font-size: 18px;
}

.placeholder-chart {
  height: 200px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 20px 0;
}

.bar {
  width: 40px;
  background-color: #1890ff;
  border-radius: 4px 4px 0 0;
}

.activity-list {
  list-style: none;
  padding: 0;
}

.activity-list li {
  display: flex;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.activity-list li:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e6f7ff;
  color: #1890ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.activity-title {
  font-weight: 500;
}

.activity-time {
  font-size: 12px;
  color: #8c8c8c;
  margin-top: 4px;
}

@media (max-width: 1200px) {
  .dashboard-cards {
    grid-template-columns: repeat(2, 1fr);
  }
  .data-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .dashboard-cards {
    grid-template-columns: 1fr;
  }
}
</style>
