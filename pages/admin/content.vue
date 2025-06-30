<script setup>
definePageMeta({
  layout: 'admin',
  title: '内容管理',
  middleware: ['admin-auth'],
})

// 响应式数据
const activeTab = ref('company')
const showEditor = ref(false)
const editorTitle = ref('')
const editorContent = ref('')
const editorPlaceholder = ref('')
const currentEditingContent = ref('')

// 内容标签
const contentTabs = ref([
  { id: 'company', name: '公司信息', icon: 'i-carbon:building w-18px h-18px', count: 3 },
  { id: 'services', name: '服务项目', icon: 'i-carbon:service-levels w-18px h-18px', count: 4 },
  { id: 'pages', name: '页面内容', icon: 'i-carbon:document-multiple-01 w-18px h-18px', count: 5 },
  { id: 'media', name: '媒体资源', icon: 'i-carbon:image w-18px h-18px', count: 12 },
])

// 公司信息数据
const companyInfo = ref({
  introduction: '我们是一家专业的技术服务公司，致力于为客户提供优质的解决方案...',
  phone: '+86 400-123-4567',
  email: 'contact@company.com',
  address: '北京市朝阳区科技园区123号',
  milestones: [
    { year: '2020', event: '公司成立，开始技术服务业务' },
    { year: '2021', event: '获得行业认证，业务规模扩大' },
    { year: '2022', event: '推出创新产品，获得市场认可' },
    { year: '2023', event: '国际业务拓展，服务覆盖全球' },
  ],
})

// 服务数据
const services = ref([
  {
    id: 1,
    title: '网站开发',
    description: '专业的网站开发服务',
    icon: 'i-carbon:code w-20px h-20px',
    color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  {
    id: 2,
    title: '移动应用',
    description: 'iOS和Android应用开发',
    icon: 'i-carbon:mobile w-20px h-20px',
    color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  },
  {
    id: 3,
    title: '系统集成',
    description: '企业系统集成解决方案',
    icon: 'i-carbon:deployment-unit-technical w-20px h-20px',
    color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  },
  {
    id: 4,
    title: '技术咨询',
    description: '专业的技术咨询服务',
    icon: 'i-carbon:user-speaker w-20px h-20px',
    color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  },
])

// 页面数据
const pages = ref([
  {
    id: 1,
    title: '首页',
    description: '网站主页内容',
    icon: 'i-carbon:home w-18px h-18px',
    status: 'published',
    lastModified: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    title: '关于我们',
    description: '公司介绍页面',
    icon: 'i-carbon:information w-18px h-18px',
    status: 'published',
    lastModified: '2024-01-14T15:20:00Z',
  },
  {
    id: 3,
    title: '服务项目',
    description: '服务介绍页面',
    icon: 'i-carbon:service-levels w-18px h-18px',
    status: 'draft',
    lastModified: '2024-01-13T09:15:00Z',
  },
])

// 媒体文件数据
const mediaFiles = ref([
  {
    id: 1,
    name: 'company-logo.png',
    type: 'image',
    url: '/logo.svg',
    size: 25600,
  },
  {
    id: 2,
    name: 'team-photo.jpg',
    type: 'image',
    url: '/images/company.webp',
    size: 156800,
  },
])

// 方法
function editContent(contentType) {
  currentEditingContent.value = contentType

  switch (contentType) {
    case 'company-intro':
      editorTitle.value = '编辑公司简介'
      editorContent.value = companyInfo.value.introduction
      editorPlaceholder.value = '请输入公司简介内容...'
      break
    // 可以添加更多内容类型
  }

  showEditor.value = true
}

function closeEditor() {
  showEditor.value = false
  editorContent.value = ''
}

function saveContent() {
  switch (currentEditingContent.value) {
    case 'company-intro':
      companyInfo.value.introduction = editorContent.value
      break
  }
  closeEditor()
}

function getWordCount(text) {
  return text ? text.length : 0
}

function getStatusText(status) {
  const statusMap = {
    published: '已发布',
    draft: '草稿',
    archived: '已归档',
  }
  return statusMap[status] || '未知状态'
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('zh-CN')
}

function formatFileSize(bytes) {
  if (bytes === 0)
    return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`
}

function previewChanges() {
  // TODO: 实现预览功能
}

function saveAllChanges() {
  // TODO: 实现保存功能
}

function editService(_service) {
  // TODO: 实现服务编辑
}

function addNewService() {
  // TODO: 实现添加服务
}

function deleteService(_serviceId) {
  // TODO: 实现删除服务
}

function editPage(_page) {
  // TODO: 实现页面编辑
}

function previewPage(_page) {
  // TODO: 实现页面预览
}

function triggerFileUpload() {
  // TODO: 实现文件上传触发
}

function handleFileUpload() {
  // TODO: 实现文件上传处理
}

function handleFileDrop() {
  // TODO: 实现拖拽上传
}

function copyMediaUrl(_media) {
  // TODO: 实现复制媒体URL
}

function deleteMedia(_mediaId) {
  // TODO: 实现删除媒体文件
}
</script>

<template>
  <div class="content-management">
    <div class="page-header">
      <div class="header-left">
        <h1>
          <div class="i-carbon:document h-28px w-28px" />
          内容管理
        </h1>
        <p>管理网站的各种静态内容和页面信息</p>
      </div>
      <div class="header-actions">
        <button class="action-btn secondary" @click="previewChanges">
          <div class="i-carbon:view h-18px w-18px" />
          预览更改
        </button>
        <button class="action-btn primary" @click="saveAllChanges">
          <div class="i-carbon:save h-18px w-18px" />
          保存更改
        </button>
      </div>
    </div>

    <!-- 内容分类标签 -->
    <div class="content-tabs">
      <button
        v-for="tab in contentTabs"
        :key="tab.id"
        class="tab-button"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        <div :class="tab.icon" />
        <span>{{ tab.name }}</span>
        <span class="tab-count">{{ tab.count }}</span>
      </button>
    </div>

    <!-- 公司信息内容 -->
    <div v-if="activeTab === 'company'" class="content-section">
      <div class="section-grid">
        <div class="content-card">
          <div class="card-header">
            <h3>
              <div class="i-carbon:building h-20px w-20px" />
              公司简介
            </h3>
            <button class="edit-btn" @click="editContent('company-intro')">
              <div class="i-carbon:edit h-16px w-16px" />
            </button>
          </div>
          <div class="card-content">
            <div class="content-preview">
              <p>{{ companyInfo.introduction || '点击编辑公司简介...' }}</p>
            </div>
            <div class="content-meta">
              <span class="last-updated">最后更新: 2024-01-15</span>
              <span class="word-count">字数: {{ getWordCount(companyInfo.introduction) }}</span>
            </div>
          </div>
        </div>

        <div class="content-card">
          <div class="card-header">
            <h3>
              <div class="i-carbon:location h-20px w-20px" />
              联系信息
            </h3>
            <button class="edit-btn" @click="editContent('contact-info')">
              <div class="i-carbon:edit h-16px w-16px" />
            </button>
          </div>
          <div class="card-content">
            <div class="contact-info">
              <div class="info-item">
                <div class="i-carbon:phone h-16px w-16px" />
                <span>{{ companyInfo.phone || '未设置电话' }}</span>
              </div>
              <div class="info-item">
                <div class="i-carbon:email h-16px w-16px" />
                <span>{{ companyInfo.email || '未设置邮箱' }}</span>
              </div>
              <div class="info-item">
                <div class="i-carbon:location h-16px w-16px" />
                <span>{{ companyInfo.address || '未设置地址' }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="content-card">
          <div class="card-header">
            <h3>
              <div class="i-carbon:chart-line h-20px w-20px" />
              发展历程
            </h3>
            <button class="edit-btn" @click="editContent('history')">
              <div class="i-carbon:edit h-16px w-16px" />
            </button>
          </div>
          <div class="card-content">
            <div class="timeline-preview">
              <div v-for="milestone in companyInfo.milestones" :key="milestone.year" class="timeline-item">
                <div class="timeline-year">
                  {{ milestone.year }}
                </div>
                <div class="timeline-content">
                  {{ milestone.event }}
                </div>
              </div>
              <div v-if="!companyInfo.milestones?.length" class="empty-state">
                暂无发展历程记录
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 服务内容 -->
    <div v-if="activeTab === 'services'" class="content-section">
      <div class="services-header">
        <h2>服务项目管理</h2>
        <button class="action-btn primary" @click="addNewService">
          <div class="i-carbon:add h-18px w-18px" />
          添加服务
        </button>
      </div>

      <div class="services-grid">
        <div v-for="service in services" :key="service.id" class="service-card">
          <div class="service-header">
            <div class="service-icon" :style="`background: ${service.color}`">
              <div :class="service.icon" />
            </div>
            <div class="service-info">
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
            </div>
            <div class="service-actions">
              <button class="action-btn small" @click="editService(service)">
                <div class="i-carbon:edit h-14px w-14px" />
              </button>
              <button class="action-btn small danger" @click="deleteService(service.id)">
                <div class="i-carbon:trash-can h-14px w-14px" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 页面内容 -->
    <div v-if="activeTab === 'pages'" class="content-section">
      <div class="pages-list">
        <div v-for="page in pages" :key="page.id" class="page-item">
          <div class="page-info">
            <div class="page-icon">
              <div :class="page.icon" />
            </div>
            <div class="page-details">
              <h3>{{ page.title }}</h3>
              <p>{{ page.description }}</p>
              <div class="page-meta">
                <span class="status" :class="page.status">{{ getStatusText(page.status) }}</span>
                <span class="last-modified">{{ formatDate(page.lastModified) }}</span>
              </div>
            </div>
          </div>
          <div class="page-actions">
            <button class="action-btn small" @click="editPage(page)">
              编辑
            </button>
            <button class="action-btn small secondary" @click="previewPage(page)">
              预览
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 媒体资源 -->
    <div v-if="activeTab === 'media'" class="content-section">
      <div class="media-header">
        <div class="upload-area" @click="triggerFileUpload" @dragover.prevent @drop.prevent="handleFileDrop">
          <div class="upload-icon">
            <div class="i-carbon:cloud-upload h-32px w-32px" />
          </div>
          <p>点击上传或拖拽文件到此处</p>
          <small>支持 JPG, PNG, GIF, PDF 等格式</small>
          <input type="file" multiple accept="image/*,application/pdf" style="display: none;" @change="handleFileUpload">
        </div>
      </div>

      <div class="media-grid">
        <div v-for="media in mediaFiles" :key="media.id" class="media-item">
          <div class="media-thumbnail">
            <img v-if="media.type === 'image'" :src="media.url" :alt="media.name">
            <div v-else class="file-icon">
              <div class="i-carbon:document h-24px w-24px" />
            </div>
          </div>
          <div class="media-info">
            <h4>{{ media.name }}</h4>
            <p>{{ formatFileSize(media.size) }}</p>
          </div>
          <div class="media-actions">
            <button class="action-btn small" @click="copyMediaUrl(media)">
              <div class="i-carbon:copy h-14px w-14px" />
            </button>
            <button class="action-btn small danger" @click="deleteMedia(media.id)">
              <div class="i-carbon:trash-can h-14px w-14px" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑器模态框 -->
    <div v-if="showEditor" class="editor-modal">
      <div class="editor-backdrop" @click="closeEditor" />
      <div class="editor-container">
        <div class="editor-header">
          <h2>{{ editorTitle }}</h2>
          <button class="close-btn" @click="closeEditor">
            <div class="i-carbon:close h-20px w-20px" />
          </button>
        </div>
        <div class="editor-content">
          <div class="editor-toolbar">
            <button class="tool-btn" title="加粗">
              <div class="i-carbon:text-bold h-16px w-16px" />
            </button>
            <button class="tool-btn" title="斜体">
              <div class="i-carbon:text-italic h-16px w-16px" />
            </button>
            <button class="tool-btn" title="下划线">
              <div class="i-carbon:text-underline h-16px w-16px" />
            </button>
            <div class="toolbar-separator" />
            <button class="tool-btn" title="添加链接">
              <div class="i-carbon:link h-16px w-16px" />
            </button>
            <button class="tool-btn" title="插入图片">
              <div class="i-carbon:image h-16px w-16px" />
            </button>
          </div>
          <textarea
            v-model="editorContent"
            class="editor-textarea"
            :placeholder="editorPlaceholder"
          />
        </div>
        <div class="editor-footer">
          <button class="action-btn secondary" @click="closeEditor">
            取消
          </button>
          <button class="action-btn primary" @click="saveContent">
            保存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-management {
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
  padding: 24px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.header-left h1 {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 8px 0;
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-left p {
  margin: 0;
  color: #6b7280;
  font-size: 16px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border: none;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.action-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3);
}

.action-btn.secondary {
  background: white;
  color: #6b7280;
  border: 1px solid #e5e7eb;
}

.action-btn.secondary:hover {
  background: #f3f4f6;
  color: #374151;
}

.action-btn.small {
  padding: 8px 12px;
  font-size: 12px;
}

.action-btn.danger {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
}

.content-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 32px;
  padding: 8px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: transparent;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #6b7280;
  font-weight: 500;
}

.tab-button.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.tab-button:hover:not(.active) {
  background: #f3f4f6;
  color: #374151;
}

.tab-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.tab-button.active .tab-count {
  background: rgba(255, 255, 255, 0.3);
}

.content-section {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.section-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;
}

.content-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.content-card:hover {
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-header h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
}

.edit-btn {
  background: transparent;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.3s ease;
}

.edit-btn:hover {
  background: #667eea;
  border-color: #667eea;
  color: white;
}

.content-preview p {
  margin: 0;
  color: #4b5563;
  line-height: 1.6;
}

.content-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
  font-size: 14px;
  color: #6b7280;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #4b5563;
}

.timeline-preview {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.timeline-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.timeline-year {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  min-width: 60px;
  text-align: center;
}

.timeline-content {
  flex: 1;
  color: #4b5563;
  line-height: 1.5;
}

.empty-state {
  color: #9ca3af;
  font-style: italic;
  text-align: center;
  padding: 32px;
}

.services-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.services-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.service-card {
  background: #f8fafc;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.service-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.service-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.service-info {
  flex: 1;
}

.service-info h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.service-info p {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}

.service-actions {
  display: flex;
  gap: 8px;
}

.pages-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.page-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.page-item:hover {
  border-color: #667eea;
  background: white;
}

.page-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.page-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.page-details h3 {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
}

.page-details p {
  margin: 0 0 8px 0;
  color: #6b7280;
  font-size: 14px;
}

.page-meta {
  display: flex;
  gap: 16px;
  align-items: center;
}

.status {
  padding: 4px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
}

.status.published {
  background: rgba(34, 197, 94, 0.1);
  color: #16a34a;
}

.status.draft {
  background: rgba(249, 115, 22, 0.1);
  color: #ea580c;
}

.last-modified {
  color: #9ca3af;
  font-size: 12px;
}

.page-actions {
  display: flex;
  gap: 8px;
}

.media-header {
  margin-bottom: 32px;
}

.upload-area {
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 48px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.upload-area:hover {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.05);
}

.upload-icon {
  color: #9ca3af;
  margin-bottom: 16px;
}

.upload-area p {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
  color: #374151;
}

.upload-area small {
  color: #6b7280;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.media-item {
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  transition: all 0.3s ease;
}

.media-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.media-thumbnail {
  width: 100%;
  height: 120px;
  background: #e5e7eb;
  border-radius: 8px;
  margin-bottom: 12px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.media-thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-icon {
  color: #9ca3af;
}

.media-info h4 {
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: #1f2937;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.media-info p {
  margin: 0;
  color: #6b7280;
  font-size: 12px;
}

.media-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
}

/* 编辑器模态框样式 */
.editor-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.editor-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.editor-container {
  position: relative;
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
}

.editor-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
}

.close-btn {
  background: transparent;
  border: none;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: #f3f4f6;
  color: #374151;
}

.editor-content {
  flex: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.editor-toolbar {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.tool-btn {
  background: transparent;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 8px;
  cursor: pointer;
  color: #6b7280;
  transition: all 0.3s ease;
}

.tool-btn:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
  color: #374151;
}

.toolbar-separator {
  width: 1px;
  background: #e5e7eb;
  margin: 0 8px;
}

.editor-textarea {
  flex: 1;
  min-height: 200px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 16px;
  font-size: 14px;
  line-height: 1.6;
  resize: vertical;
  font-family: inherit;
}

.editor-textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.editor-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 24px;
  border-top: 1px solid #e5e7eb;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }

  .content-tabs {
    flex-wrap: wrap;
  }

  .section-grid {
    grid-template-columns: 1fr;
  }

  .services-grid {
    grid-template-columns: 1fr;
  }

  .media-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  .editor-container {
    width: 95%;
    max-height: 90vh;
  }
}
</style>
