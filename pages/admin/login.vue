<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1>后台管理系统</h1>
        <p>请登录以继续</p>
      </div>
      
      <div v-if="loginError" class="login-error">
        {{ loginError }}
      </div>
      
      <form @submit.prevent="handleLogin" class="login-form">
        <div class="form-group">
          <label for="username">用户名</label>
          <div class="input-wrapper">
            <div class="i-carbon:user w-20px h-20px opacity-50" />
            <input 
              id="username" 
              v-model="username" 
              type="text" 
              placeholder="请输入用户名" 
              required
            />
          </div>
        </div>
        
        <div class="form-group">
          <label for="password">密码</label>
          <div class="input-wrapper">
            <div class="i-carbon:password w-20px h-20px opacity-50" />
            <input 
              id="password" 
              v-model="password" 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="请输入密码" 
              required
            />
            <div 
              class="password-toggle" 
              @click="showPassword = !showPassword"
            >
              <div v-if="showPassword" class="i-carbon:view-off w-20px h-20px cursor-pointer" />
              <div v-else class="i-carbon:view w-20px h-20px cursor-pointer" />
            </div>
          </div>
        </div>
        
        <div class="form-footer">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe" />
            <span>记住我</span>
          </label>
          <a href="#" class="forgot-password">忘记密码?</a>
        </div>
        
        <button type="submit" class="login-button" :disabled="isLoading">
          <div v-if="isLoading" class="i-carbon:circle-dash w-20px h-20px animate-spin mr-2" />
          {{ isLoading ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: false,
  middleware: ['admin-auth']
})

const { loggedIn, user, fetch: refreshSession } = useUserSession()
const username = ref('admin')
const password = ref('admin123')
const rememberMe = ref(false)
const showPassword = ref(false)
const isLoading = ref(false)
const loginError = ref('')

const handleLogin = async () => {
  loginError.value = ''
  isLoading.value = true
  
  $fetch('/api/login', {
    method: 'POST',
    body: {
      username: username.value,
      password: password.value,
    }
  })
  .then(async () => {
    // Refresh the session on client-side and redirect to the home page
    await refreshSession()
    await navigateTo('/admin')
  })
  .catch((error) => {
    loginError.value = error.data?.message || '登录过程中发生错误，请重试'
    console.error('Login error:', error)
  })
  .finally(() => {
    isLoading.value = false
  })
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  background-image: linear-gradient(45deg, #1890ff11 0%, #00000005 100%);
}

.login-card {
  width: 100%;
  max-width: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  padding: 40px;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.login-header h1 {
  margin: 0;
  color: #1890ff;
  font-size: 26px;
}

.login-header p {
  margin-top: 8px;
  color: #8c8c8c;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.3s;
  background: #fff;
  padding: 0 12px;
}

.input-wrapper:focus-within {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.input-wrapper input {
  flex: 1;
  border: none;
  outline: none;
  padding: 12px 8px;
  font-size: 14px;
}

.password-toggle {
  cursor: pointer;
  color: #8c8c8c;
}

.form-footer {
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  font-size: 14px;
}

.remember-me {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.remember-me input {
  margin-right: 6px;
}

.forgot-password {
  color: #1890ff;
  text-decoration: none;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-button {
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button:hover:not(:disabled) {
  background-color: #40a9ff;
}

.login-button:disabled {
  background-color: #91d5ff;
  cursor: not-allowed;
}

.login-error {
  background-color: #fff1f0;
  border: 1px solid #ffa39e;
  color: #f5222d;
  padding: 12px;
  margin-bottom: 24px;
  border-radius: 4px;
  font-size: 14px;
}
</style>
