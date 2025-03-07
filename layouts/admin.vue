<template>
  <div class="admin-layout">
    <div class="admin-sidebar">
      <div class="logo">
        <h2>管理系统</h2>
      </div>
      <ul class="menu">
        <li>
          <NuxtLink to="/admin" class="menu-item" active-class="active">
            <div class="icon">
              <div class="i-carbon:dashboard w-20px h-20px" />
            </div>
            <span>控制台</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/news" class="menu-item" active-class="active">
            <div class="icon">
              <div class="i-carbon:document-multiple-02 w-20px h-20px" />
            </div>
            <span>新闻管理</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/content" class="menu-item" active-class="active">
            <div class="icon">
              <div class="i-carbon:document w-20px h-20px" />
            </div>
            <span>内容管理</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="admin-main">
      <div class="admin-header">
        <div class="breadcrumb">
          <span>{{ currentRoute }}</span>
        </div>
        <div class="user-info">
          <span>{{ user?.name }}</span>
          <div class="i-carbon:user-avatar w-24px h-24px" />
          <button class="logout-button" @click="handleLogout">退出</button>
        </div>
      </div>
      <div class="admin-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

const { user, clear: clearSession } = useUserSession()

// 获取当前路由名称
const currentRoute = computed(() => {
  if (route.path === '/admin') return '控制台'
  if (route.path === '/admin/content') return '内容管理'
  if (route.path.includes('/admin/news')) {
    if (route.path === '/admin/news') return '新闻管理'
    if (route.path.includes('/admin/news/edit')) return '编辑新闻'
    if (route.path.includes('/admin/news/create')) return '创建新闻'
    if (route.path.includes('/admin/news/view')) return '新闻详情'
    return '新闻管理'
  }
  return '管理系统'
})

// 退出登录
async function handleLogout() {
  if (import.meta.client) {
    await clearSession()
    await navigateTo('/admin/login')
  }
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.admin-sidebar {
  width: 250px;
  background-color: #001529;
  color: white;
  padding: 20px 0;
}

.logo {
  text-align: center;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
}

.menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 24px;
  color: rgba(255, 255, 255, 0.65);
  text-decoration: none;
  transition: all 0.3s;
}

.menu-item:hover, .menu-item.active {
  color: white;
  background-color: #1890ff;
}

.menu-item .icon {
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.admin-header {
  display: flex;
  justify-content: space-between;
  padding: 0 24px;
  height: 64px;
  line-height: 64px;
  background: white;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logout-button {
  background-color: transparent;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  margin-left: 8px;
  transition: all 0.3s;
}

.logout-button:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.admin-content {
  flex: 1;
  padding: 24px;
  background-color: #f0f2f5;
}
</style>
