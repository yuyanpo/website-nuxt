<script setup>
definePageMeta({
  layout: false,
  middleware: ['admin-auth'],
})

useHead({ title: '管理系统登录' })

const { fetch: refreshSession } = useUserSession()
const username = ref('admin')
const password = ref('admin1234')
const showPassword = ref(false)
const isLoading = ref(false)
const loginError = ref('')

async function handleLogin() {
  loginError.value = ''
  isLoading.value = true

  $fetch('/api/login', {
    method: 'POST',
    body: {
      username: username.value,
      password: password.value,
    },
  })
    .then(async () => {
    // Refresh the session on client-side and redirect to the home page
      await refreshSession()
      await navigateTo('/admin')
    })
    .catch((error) => {
      loginError.value = error.data?.message || '登录过程中发生错误，请重试'
    })
    .finally(() => {
      isLoading.value = false
    })
}
</script>

<template>
  <div class="login-page">
    <!-- 背景装饰 -->
    <div class="background-decoration">
      <div class="decoration-circle circle-1" />
      <div class="decoration-circle circle-2" />
      <div class="decoration-circle circle-3" />
      <div class="decoration-wave" />
    </div>

    <div class="login-container">
      <!-- 左侧信息面板 -->
      <div class="info-panel">
        <div class="info-content">
          <div class="brand">
            <div class="brand-icon">
              <div class="i-carbon:cube h-40px w-40px" />
            </div>
            <h1>管理系统</h1>
            <p>现代化的企业管理解决方案</p>
          </div>

          <div class="features">
            <div class="feature-item">
              <div class="feature-icon">
                <div class="i-carbon:shield-check h-24px w-24px" />
              </div>
              <div class="feature-text">
                <h3>安全可靠</h3>
                <p>企业级安全防护，保障数据安全</p>
              </div>
            </div>

            <div class="feature-item">
              <div class="feature-icon">
                <div class="i-carbon:chart-line h-24px w-24px" />
              </div>
              <div class="feature-text">
                <h3>数据分析</h3>
                <p>实时数据分析，助力业务决策</p>
              </div>
            </div>

            <div class="feature-item">
              <div class="feature-icon">
                <div class="i-carbon:cloud h-24px w-24px" />
              </div>
              <div class="feature-text">
                <h3>云端部署</h3>
                <p>支持云端部署，随时随地访问</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧登录表单 -->
      <div class="login-panel">
        <div class="login-form-container">
          <div class="login-header">
            <h2>欢迎回来</h2>
            <p>请使用您的账户信息登录系统</p>
          </div>

          <!-- 错误提示 -->
          <div v-if="loginError" class="error-message">
            <div class="i-carbon:warning h-16px w-16px" />
            <span>{{ loginError }}</span>
          </div>

          <form class="login-form" @submit.prevent="handleLogin">
            <!-- 用户名输入 -->
            <div class="form-group">
              <label for="username" class="form-label">用户名</label>
              <div class="input-wrapper">
                <div class="input-icon">
                  <div class="i-carbon:user h-18px w-18px" />
                </div>
                <input
                  id="username"
                  v-model="username"
                  class="form-input"
                  type="text"
                  placeholder="请输入用户名"
                  required
                  autocomplete="username"
                >
              </div>
            </div>

            <!-- 密码输入 -->
            <div class="form-group">
              <label for="password" class="form-label">密码</label>
              <div class="input-wrapper">
                <div class="input-icon">
                  <div class="i-carbon:password h-18px w-18px" />
                </div>
                <input
                  id="password"
                  v-model="password"
                  class="form-input"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="请输入密码"
                  required
                  autocomplete="current-password"
                >
                <button
                  type="button"
                  class="password-toggle"
                  @click="showPassword = !showPassword"
                >
                  <div v-if="showPassword" class="i-carbon:view-off h-18px w-18px" />
                  <div v-else class="i-carbon:view h-18px w-18px" />
                </button>
              </div>
            </div>

            <!-- 记住我选项 -->
            <div class="form-options">
              <label class="checkbox-label">
                <input type="checkbox" class="checkbox">
                <span class="checkbox-text">记住我</span>
              </label>
              <a href="#" class="forgot-password">忘记密码？</a>
            </div>

            <!-- 登录按钮 -->
            <button
              type="submit"
              class="login-button"
              :disabled="isLoading"
            >
              <div v-if="isLoading" class="i-carbon:circle-dash h-20px w-20px animate-spin" />
              <div v-else class="i-carbon:login h-20px w-20px" />
              <span>{{ isLoading ? '登录中...' : '登录' }}</span>
            </button>
          </form>

          <!-- 其他登录方式 -->
          <div class="divider">
            <span>或</span>
          </div>

          <div class="social-login">
            <button class="social-button google">
              <div class="i-carbon:logo-google h-20px w-20px" />
              <span>使用 Google 登录</span>
            </button>
            <button class="social-button microsoft">
              <div class="i-carbon:logo-microsoft h-20px w-20px" />
              <span>使用 Microsoft 登录</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: 10%;
  left: 10%;
  animation: float 6s ease-in-out infinite;
}

.circle-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: 15%;
  animation: float 8s ease-in-out infinite reverse;
}

.circle-3 {
  width: 300px;
  height: 300px;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  animation: float 10s ease-in-out infinite;
}

.decoration-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%);
  transform: skewY(-2deg);
  transform-origin: bottom left;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

.login-container {
  display: flex;
  width: 90%;
  max-width: 1200px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  min-height: 600px;
}

.info-panel {
  flex: 1;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  padding: 60px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

.info-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%);
}

.info-content {
  position: relative;
  z-index: 1;
}

.brand {
  margin-bottom: 60px;
  text-align: center;
}

.brand-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;
  color: white;
}

.brand h1 {
  margin: 0 0 12px 0;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.brand p {
  margin: 0;
  font-size: 16px;
  opacity: 0.8;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 20px;
}

.feature-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feature-text h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
}

.feature-text p {
  margin: 0;
  font-size: 14px;
  opacity: 0.8;
  line-height: 1.5;
}

.login-panel {
  flex: 1;
  padding: 60px 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-form-container {
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 40px;
}

.login-header h2 {
  margin: 0 0 12px 0;
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
}

.login-header p {
  margin: 0;
  color: #6b7280;
  font-size: 16px;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
  color: #dc2626;
  font-size: 14px;
  margin-bottom: 24px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 16px;
  color: #9ca3af;
  z-index: 1;
}

.form-input {
  width: 100%;
  padding: 16px 48px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: white;
}

.form-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
}

.password-toggle {
  position: absolute;
  right: 16px;
  background: transparent;
  border: none;
  color: #9ca3af;
  cursor: pointer;
  padding: 4px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.password-toggle:hover {
  background: #f3f4f6;
  color: #374151;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 14px;
  color: #4b5563;
}

.checkbox {
  width: 16px;
  height: 16px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  cursor: pointer;
}

.checkbox:checked {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: #667eea;
}

.forgot-password {
  font-size: 14px;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.forgot-password:hover {
  color: #5a6fd8;
  text-decoration: underline;
}

.login-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 8px;
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.divider {
  position: relative;
  text-align: center;
  margin: 32px 0;
}

.divider::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: #e5e7eb;
}

.divider span {
  background: white;
  padding: 0 16px;
  color: #9ca3af;
  font-size: 14px;
}

.social-login {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.social-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 12px 20px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  color: #4b5563;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.social-button:hover {
  border-color: #d1d5db;
  background: #f9fafb;
  transform: translateY(-1px);
}

.social-button.google:hover {
  border-color: #4285f4;
  color: #4285f4;
}

.social-button.microsoft:hover {
  border-color: #0078d4;
  color: #0078d4;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .login-container {
    max-width: 900px;
  }

  .info-panel,
  .login-panel {
    padding: 40px 32px;
  }
}

@media (max-width: 768px) {
  .login-page {
    padding: 20px;
  }

  .login-container {
    flex-direction: column;
    width: 100%;
    max-width: 480px;
    min-height: auto;
  }

  .info-panel {
    padding: 40px 32px 32px;
  }

  .brand {
    margin-bottom: 40px;
  }

  .features {
    gap: 24px;
  }

  .feature-item {
    gap: 16px;
  }

  .login-panel {
    padding: 32px;
  }

  .circle-1,
  .circle-2,
  .circle-3 {
    display: none;
  }
}

@media (max-width: 480px) {
  .login-panel {
    padding: 24px;
  }

  .login-form-container {
    max-width: 100%;
  }

  .social-login {
    gap: 8px;
  }
}

/* 动画 */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
