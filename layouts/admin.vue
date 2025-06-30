<script setup>
const route = useRoute()

const { user, clear: clearSession } = useUserSession()

// 获取当前路由名称
const currentRoute = computed(() => {
  if (route.path === '/admin')
    return '控制台'
  if (route.path === '/admin/content')
    return '内容管理'
  if (route.path.includes('/admin/news')) {
    if (route.path === '/admin/news')
      return '新闻管理'
    if (route.path.includes('/admin/news/edit'))
      return '编辑新闻'
    if (route.path.includes('/admin/news/create'))
      return '创建新闻'
    if (route.path.includes('/admin/news/view'))
      return '新闻详情'
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

<template>
  <div class="admin-layout">
    <div class="admin-sidebar">
      <div class="logo">
        <div class="logo-icon">
          <div class="i-carbon:cube h-28px w-28px" />
        </div>
        <h2>管理系统</h2>
      </div>
      <ul class="menu">
        <li>
          <NuxtLink to="/admin" class="menu-item" active-class="active">
            <div class="icon">
              <div class="i-carbon:dashboard h-20px w-20px" />
            </div>
            <span>控制台</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/news" class="menu-item" active-class="active">
            <div class="icon">
              <div class="i-carbon:document-multiple-02 h-20px w-20px" />
            </div>
            <span>新闻管理</span>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/admin/content" class="menu-item" active-class="active">
            <div class="icon">
              <div class="i-carbon:document h-20px w-20px" />
            </div>
            <span>内容管理</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div class="admin-main">
      <div class="admin-header">
        <div class="breadcrumb">
          <div class="breadcrumb-icon">
            <div class="i-carbon:location h-16px w-16px" />
          </div>
          <span>{{ currentRoute }}</span>
        </div>
        <div class="user-info">
          <div class="user-avatar">
            <div class="i-carbon:user-avatar h-32px w-32px" />
          </div>
          <div class="user-details">
            <span class="user-name">{{ user?.name || '管理员' }}</span>
            <span class="user-role">系统管理员</span>
          </div>
          <div class="user-actions">
            <button class="settings-button" title="设置">
              <div class="i-carbon:settings h-18px w-18px" />
            </button>
            <button class="logout-button" title="退出登录" @click="handleLogout">
              <div class="i-carbon:logout h-18px w-18px" />
              <span>退出</span>
            </button>
          </div>
        </div>
      </div>
      <div class="admin-content">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.admin-sidebar {
  width: 280px;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  padding: 0;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.admin-sidebar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%);
  pointer-events: none;
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 20px;
  position: relative;
}

.logo-icon {
  margin-right: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.menu {
  list-style: none;
  padding: 0 16px;
  margin: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
  margin-bottom: 8px;
  position: relative;
  overflow: hidden;
}

.menu-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transform: scaleY(0);
  transition: transform 0.3s ease;
}

.menu-item:hover {
  color: white;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
}

.menu-item:hover::before {
  transform: scaleY(1);
}

.menu-item.active {
  color: white;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.menu-item.active::before {
  transform: scaleY(1);
}

.menu-item .icon {
  margin-right: 16px;
  display: flex;
  align-items: center;
  transition: transform 0.3s ease;
}

.menu-item:hover .icon {
  transform: scale(1.1);
}

.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin: 20px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 32px;
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 14px;
}

.breadcrumb-icon {
  color: #9ca3af;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-name {
  font-weight: 600;
  color: #1f2937;
  font-size: 14px;
}

.user-role {
  font-size: 12px;
  color: #6b7280;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.settings-button {
  background: transparent;
  border: none;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.3s ease;
}

.settings-button:hover {
  background: #f3f4f6;
  color: #374151;
  transform: rotate(90deg);
}

.logout-button {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  color: white;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.logout-button:hover {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
}

.admin-content {
  flex: 1;
  padding: 32px;
  background: #f8fafc;
  overflow-y: auto;
}

/* 滚动条样式 */
.admin-content::-webkit-scrollbar {
  width: 6px;
}

.admin-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.admin-content::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 3px;
}

.admin-content::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #5a6fd8 0%, #6b5b95 100%);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .admin-layout {
    flex-direction: column;
  }

  .admin-sidebar {
    width: 100%;
    height: auto;
  }

  .admin-main {
    margin: 0;
    border-radius: 0;
  }

  .user-details {
    display: none;
  }
}
</style>
