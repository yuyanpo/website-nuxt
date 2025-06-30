<script setup>
definePageMeta({
  layout: 'admin',
  title: '创建新闻',
  middleware: ['admin-auth'],
})

const router = useRouter()

// 表单数据
const newsForm = ref({
  title: '',
  summary: '',
  content: '',
  category: '',
  status: 'draft',
  publishDate: new Date().toISOString().slice(0, 16),
  cover: '',
  tags: [],
  seoTitle: '',
  seoDescription: '',
})

// 状态管理
const isSaving = ref(false)
const errors = ref({})

// 表单验证
const isFormValid = computed(() => {
  return newsForm.value.title.trim()
    && newsForm.value.content.trim()
    && newsForm.value.category
    && Object.keys(errors.value).length === 0
})

// 方法
function goBack() {
  router.push('/admin/news')
}

function validateForm() {
  errors.value = {}

  if (!newsForm.value.title.trim()) {
    errors.value.title = '请输入新闻标题'
  }

  if (!newsForm.value.category) {
    errors.value.category = '请选择新闻分类'
  }

  if (!newsForm.value.content.trim()) {
    errors.value.content = '请输入新闻内容'
  }
}

// 保存和发布
async function saveDraft() {
  newsForm.value.status = 'draft'
  await saveNews()
}

async function publishNews() {
  validateForm()
  if (isFormValid.value) {
    newsForm.value.status = 'published'
    await saveNews()
  }
}

async function saveNews() {
  isSaving.value = true
  try {
    // 这里应该调用API保存新闻
    await $fetch('/api/admin/news', {
      method: 'POST',
      body: newsForm.value,
    })

    // 保存成功后跳转
    router.push('/admin/news')
  }
  catch (error) {
    console.error('保存失败:', error)
    // 显示错误提示
  }
  finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="news-create">
    <div class="page-header">
      <div class="header-left">
        <button class="back-btn" @click="goBack">
          <div class="i-carbon:arrow-left h-18px w-18px" />
        </button>
        <h1>创建新闻</h1>
      </div>
      <div class="header-actions">
        <button class="btn-secondary btn" :disabled="isSaving" @click="saveDraft">
          保存草稿
        </button>
        <button class="btn btn-primary" :disabled="isSaving" @click="publishNews">
          发布
        </button>
      </div>
    </div>

    <div class="form-container">
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
.news-create {
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
