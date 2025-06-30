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

// 加载新闻数据
const { data: newsData, pending: loading } = await useLazyFetch(`/api/admin/news/${newsId}`, {
  headers: useRequestHeaders(['cookie']),
})

function goBack() {
  router.push('/admin/news')
}

function editNews() {
  if (!newsId || newsId === 'null' || newsId === 'undefined') {
    console.error('无法编辑：无效的新闻ID')
    return
  }
  router.push(`/admin/news/edit/${newsId}`)
}

function previewNews() {
  if (!newsId || newsId === 'null' || newsId === 'undefined') {
    console.error('无法预览：无效的新闻ID')
    return
  }
  // 这里可以跳转到前台新闻详情页面
  window.open(`/news/${newsId}`, '_blank')
}

// 工具方法
function getCategoryName(category) {
  const categoryMap = {
    company: '公司新闻',
    industry: '行业资讯',
    product: '产品动态',
  }
  return categoryMap[category] || '未分类'
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('zh-CN')
}
</script>

<template>
  <div class="news-view">
    <div class="page-header">
      <div class="header-left">
        <button class="back-btn" @click="goBack">
          <div class="i-carbon:arrow-left h-18px w-18px" />
        </button>
        <h1>查看新闻</h1>
      </div>
      <div v-if="newsData" class="header-actions">
        <button class="btn-secondary btn" @click="editNews">
          <div class="i-carbon:edit mr-1 h-16px w-16px" />
          编辑
        </button>
        <button v-if="newsData.status === 'published'" class="btn btn-primary" @click="previewNews">
          <div class="i-carbon:view mr-1 h-16px w-16px" />
          前台预览
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

    <div v-else class="content-container">
      <!-- 新闻信息卡片 -->
      <div class="info-card">
        <div class="info-row">
          <span class="label">状态:</span>
          <span class="status-badge" :class="newsData.status">
            {{ newsData.status === 'published' ? '已发布' : '草稿' }}
          </span>
        </div>
        <div class="info-row">
          <span class="label">分类:</span>
          <span class="category-tag" :class="newsData.category">
            {{ getCategoryName(newsData.category) }}
          </span>
        </div>
        <div class="info-row">
          <span class="label">发布时间:</span>
          <span>{{ formatDate(newsData.publishDate) }}</span>
        </div>
        <div class="info-row">
          <span class="label">ID:</span>
          <span>{{ newsData.id }}</span>
        </div>
      </div>

      <!-- 新闻内容预览 -->
      <div class="content-preview">
        <div class="article">
          <div v-if="newsData.cover" class="article-cover">
            <img :src="newsData.cover" :alt="newsData.title">
          </div>

          <div class="article-header">
            <h1 class="article-title">
              {{ newsData.title }}
            </h1>
            <div class="article-meta">
              <span class="article-category">{{ getCategoryName(newsData.category) }}</span>
              <span class="article-date">{{ formatDate(newsData.publishDate) }}</span>
            </div>
          </div>

          <div v-if="newsData.summary" class="article-summary">
            {{ newsData.summary }}
          </div>

          <div class="article-content">
            <div v-html="newsData.content" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-view {
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
  display: flex;
  align-items: center;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
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

.content-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.info-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.info-row:last-child {
  margin-bottom: 0;
}

.label {
  font-weight: 500;
  color: #374151;
  min-width: 80px;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.published {
  background: #d1fae5;
  color: #065f46;
}

.status-badge.draft {
  background: #fef3c7;
  color: #92400e;
}

.category-tag {
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
  color: white;
}

.category-tag.company {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.category-tag.industry {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.category-tag.product {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.content-preview {
  background: white;
  border-radius: 12px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.article {
  max-width: 100%;
}

.article-cover {
  margin-bottom: 24px;
  border-radius: 12px;
  overflow: hidden;
}

.article-cover img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.article-header {
  margin-bottom: 24px;
}

.article-title {
  margin: 0 0 16px 0;
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  line-height: 1.3;
}

.article-meta {
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: #6b7280;
}

.article-category {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 8px;
  font-weight: 500;
}

.article-summary {
  margin-bottom: 32px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  border-left: 4px solid #667eea;
  font-size: 16px;
  line-height: 1.6;
  color: #4b5563;
  font-style: italic;
}

.article-content {
  line-height: 1.8;
  color: #374151;
  font-size: 16px;
}

.article-content :deep(h1),
.article-content :deep(h2),
.article-content :deep(h3),
.article-content :deep(h4),
.article-content :deep(h5),
.article-content :deep(h6) {
  margin: 32px 0 16px 0;
  font-weight: 600;
  color: #1f2937;
}

.article-content :deep(h1) {
  font-size: 24px;
}
.article-content :deep(h2) {
  font-size: 22px;
}
.article-content :deep(h3) {
  font-size: 20px;
}

.article-content :deep(p) {
  margin: 16px 0;
  line-height: 1.8;
}

.article-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 16px 0;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin: 16px 0;
  padding-left: 24px;
}

.article-content :deep(li) {
  margin: 8px 0;
  line-height: 1.6;
}

.article-content :deep(blockquote) {
  margin: 24px 0;
  padding: 16px 20px;
  background: #f8fafc;
  border-left: 4px solid #667eea;
  border-radius: 0 8px 8px 0;
}

.article-content :deep(code) {
  background: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', monospace;
  font-size: 14px;
}

.article-content :deep(pre) {
  background: #1e293b;
  color: #f8fafc;
  padding: 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 20px 0;
}

.article-content :deep(pre code) {
  background: none;
  padding: 0;
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
    justify-content: center;
  }

  .content-preview {
    padding: 20px;
  }

  .article-title {
    font-size: 24px;
  }

  .article-meta {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
