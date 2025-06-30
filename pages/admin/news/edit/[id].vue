<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth'],
})

const router = useRouter()
const route = useRoute()
const newsId = route.params.id

// 检查ID是否有效
if (!newsId || newsId === 'null' || newsId === 'undefined') {
  console.error('无效的新闻ID:', newsId)
  throw createError({ statusCode: 400, statusMessage: '无效的新闻ID' })
}

// 加载现有新闻数据
const { data: newsData, pending: loading } = await useLazyFetch(`/api/admin/news/${newsId}`, {
  headers: useRequestHeaders(['cookie']),
})

// 表单数据
const newsForm = ref({
  id: newsId,
  title: '',
  summary: '',
  content: '',
  category: '',
  status: 'draft',
  publishDate: new Date().toISOString(),
})

// 状态管理
const isSaving = ref(false)

// 表单验证
const isFormValid = computed(() => {
  return newsForm.value.title.trim()
    && newsForm.value.content.trim()
    && newsForm.value.category
})

// 监听数据加载完成，初始化表单
watch(newsData, (data) => {
  if (data) {
    newsForm.value = {
      id: data.id,
      title: data.title || '',
      summary: data.summary || '',
      content: data.content || '',
      category: data.category || '',
      status: data.status || 'draft',
      publishDate: data.publishDate || new Date().toISOString(),
    }
  }
}, { immediate: true })

function goBack() {
  router.push('/admin/news')
}

async function saveDraft() {
  newsForm.value.status = 'draft'
  await saveNews()
}

async function publishNews() {
  if (!isFormValid.value) {
    console.warn('请填写必填字段')
    return
  }

  newsForm.value.status = 'published'
  await saveNews()
}

async function saveNews() {
  if (!newsForm.value.title || !newsForm.value.content || !newsForm.value.category) {
    console.warn('请填写必填字段')
    return
  }

  isSaving.value = true
  try {
    await $fetch(`/api/admin/news/${newsId}`, {
      method: 'PUT',
      body: newsForm.value,
    })

    router.push('/admin/news')
  }
  catch (error) {
    console.error('保存失败:', error)
  }
  finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="news-edit">
    <div class="page-header">
      <div class="header-left">
        <button class="back-btn" @click="goBack">
          <div class="i-carbon:arrow-left h-18px w-18px" />
        </button>
        <h1>编辑新闻</h1>
      </div>
      <div class="header-actions">
        <button class="btn-secondary btn" :disabled="isSaving" @click="saveDraft">
          保存草稿
        </button>
        <button class="btn btn-primary" :disabled="isSaving" @click="publishNews">
          更新发布
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <div class="loading-spinner" />
      <p>加载中...</p>
    </div>

    <div v-else-if="!newsData" class="error">
      <div class="error-icon">
        <div class="i-carbon:warning h-32px w-32px" />
      </div>
      <h3>新闻不存在</h3>
      <p>找不到指定的新闻，可能已被删除。</p>
      <button class="btn btn-primary" @click="goBack">
        返回列表
      </button>
    </div>

    <div v-else class="form-container">
      <form @submit.prevent="publishNews">
        <div class="form-group">
          <label class="form-label required">新闻标题</label>
          <input
            v-model="newsForm.title"
            type="text"
            class="form-input"
            placeholder="请输入新闻标题..."
            required
          >
        </div>

        <div class="form-group">
          <label class="form-label">新闻摘要</label>
          <textarea
            v-model="newsForm.summary"
            class="form-textarea"
            placeholder="请输入新闻摘要..."
            rows="3"
          />
        </div>

        <div class="form-group">
          <label class="form-label required">新闻分类</label>
          <select v-model="newsForm.category" class="form-select" required>
            <option value="">
              请选择分类
            </option>
            <option value="company">
              公司新闻
            </option>
            <option value="industry">
              行业资讯
            </option>
            <option value="product">
              产品动态
            </option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label required">新闻内容</label>
          <textarea
            v-model="newsForm.content"
            class="form-textarea large"
            placeholder="请输入新闻内容..."
            rows="12"
            required
          />
        </div>

        <div class="form-group">
          <label class="form-label">发布状态</label>
          <select v-model="newsForm.status" class="form-select">
            <option value="draft">
              草稿
            </option>
            <option value="published">
              已发布
            </option>
          </select>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.news-edit {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.back-btn {
  background: #f3f4f6;
  border: none;
  border-radius: 8px;
  padding: 10px;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.3s ease;
}

.back-btn:hover {
  background: #e5e7eb;
}

.page-header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
  background: white;
  color: #6b7280;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover {
  background: #f9fafb;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.loading-spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #f3f4f6;
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 16px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading p {
  margin: 0;
  color: #6b7280;
  font-size: 16px;
}

.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.error-icon {
  color: #f59e0b;
  margin-bottom: 16px;
}

.error h3 {
  margin: 0 0 8px 0;
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

.error p {
  margin: 0 0 24px 0;
  color: #6b7280;
  font-size: 16px;
}

.form-container {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.form-label.required::after {
  content: '*';
  color: #ef4444;
  margin-left: 4px;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-textarea {
  resize: vertical;
  font-family: inherit;
}

.form-textarea.large {
  min-height: 300px;
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }

  .header-actions {
    justify-content: stretch;
  }

  .btn {
    flex: 1;
  }
}
</style>
