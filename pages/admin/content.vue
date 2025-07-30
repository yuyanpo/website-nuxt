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
  { id: 'company', name: '公司信息', icon: 'i-carbon:building', count: 3 },
  { id: 'services', name: '服务项目', icon: 'i-carbon:service-levels', count: 4 },
  { id: 'pages', name: '页面内容', icon: 'i-carbon:document-multiple-01', count: 5 },
  { id: 'media', name: '媒体资源', icon: 'i-carbon:image', count: 12 },
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
    icon: 'i-carbon:code',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 2,
    title: '移动应用',
    description: 'iOS和Android应用开发',
    icon: 'i-carbon:mobile',
    color: 'from-purple-500 to-purple-600',
  },
  {
    id: 3,
    title: '系统集成',
    description: '企业系统集成解决方案',
    icon: 'i-carbon:deployment-unit-technical',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    id: 4,
    title: '技术咨询',
    description: '专业的技术咨询服务',
    icon: 'i-carbon:user-speaker',
    color: 'from-green-500 to-green-600',
  },
])

// 页面数据
const pages = ref([
  {
    id: 1,
    title: '首页',
    description: '网站主页内容',
    icon: 'i-carbon:home',
    status: 'published',
    lastModified: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    title: '关于我们',
    description: '公司介绍页面',
    icon: 'i-carbon:information',
    status: 'published',
    lastModified: '2024-01-14T15:20:00Z',
  },
  {
    id: 3,
    title: '服务项目',
    description: '服务介绍页面',
    icon: 'i-carbon:service-levels',
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
    size: '2.5MB',
    url: '/images/logo.png',
    uploadedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    name: 'team-photo.jpg',
    type: 'image',
    size: '1.8MB',
    url: '/images/team.jpg',
    uploadedAt: '2024-01-14T15:20:00Z',
  },
])

// 方法
function editContent(content, title, placeholder) {
  currentEditingContent.value = content
  editorTitle.value = title
  editorPlaceholder.value = placeholder
  editorContent.value = companyInfo.value[content] || ''
  showEditor.value = true
}

function saveContent() {
  if (currentEditingContent.value) {
    companyInfo.value[currentEditingContent.value] = editorContent.value
  }
  showEditor.value = false
}

function cancelEdit() {
  showEditor.value = false
}

function editService(service) {
  // TODO: 实现服务编辑功能
}

function deleteService(serviceId) {
  // TODO: 实现服务删除功能
}

function editPage(page) {
  // TODO: 实现页面编辑功能
}

function deletePage(pageId) {
  // TODO: 实现页面删除功能
}

function uploadMedia() {
  // TODO: 实现媒体上传功能
}

function deleteMedia(mediaId) {
  // TODO: 实现媒体删除功能
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('zh-CN')
}

function getStatusBadge(status) {
  const statusConfig = {
    published: { class: 'bg-green-100 text-green-700', text: '已发布' },
    draft: { class: 'bg-yellow-100 text-yellow-700', text: '草稿' },
    archived: { class: 'bg-gray-100 text-gray-700', text: '已归档' },
  }
  return statusConfig[status] || statusConfig.draft
}
</script>

<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="border border-gray-100 rounded-2xl bg-white p-6 shadow-sm">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="mb-2 text-2xl text-gray-900 font-bold">
            内容管理
          </h1>
          <p class="text-gray-600">
            管理网站的各种内容，包括公司信息、服务项目、页面内容和媒体资源
          </p>
        </div>
        <button class="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
          <div class="i-carbon:add" />
          <span class="font-medium">新建内容</span>
        </button>
      </div>
    </div>

    <!-- 标签页导航 -->
    <div class="border border-gray-100 rounded-2xl bg-white p-6 shadow-sm">
      <div class="flex rounded-xl bg-gray-100 p-1 space-x-1">
        <button
          v-for="tab in contentTabs"
          :key="tab.id"
          class="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
          :class="activeTab === tab.id
            ? 'bg-white text-blue-600 shadow-sm'
            : 'text-gray-600 hover:text-gray-900'"
          @click="activeTab = tab.id"
        >
          <div :class="tab.icon" />
          <span>{{ tab.name }}</span>
          <span class="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">{{ tab.count }}</span>
        </button>
      </div>
    </div>

    <!-- 公司信息标签页 -->
    <div v-if="activeTab === 'company'" class="space-y-6">
      <div class="border border-gray-100 rounded-2xl bg-white p-6 shadow-sm">
        <h2 class="mb-4 text-lg text-gray-900 font-semibold">
          公司基本信息
        </h2>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="space-y-4">
            <div>
              <label class="mb-2 block text-sm text-gray-700 font-medium">公司介绍</label>
              <div class="relative">
                <textarea
                  v-model="companyInfo.introduction"
                  rows="4"
                  class="w-full border border-gray-200 rounded-xl p-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入公司介绍..."
                />
                <button class="absolute right-2 top-2 p-1 text-gray-400 transition-colors hover:text-blue-600">
                  <div class="i-carbon:edit" />
                </button>
              </div>
            </div>

            <div>
              <label class="mb-2 block text-sm text-gray-700 font-medium">联系电话</label>
              <input
                v-model="companyInfo.phone"
                type="text"
                class="w-full border border-gray-200 rounded-xl p-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="请输入联系电话"
              >
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="mb-2 block text-sm text-gray-700 font-medium">邮箱地址</label>
              <input
                v-model="companyInfo.email"
                type="email"
                class="w-full border border-gray-200 rounded-xl p-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="请输入邮箱地址"
              >
            </div>

            <div>
              <label class="mb-2 block text-sm text-gray-700 font-medium">公司地址</label>
              <input
                v-model="companyInfo.address"
                type="text"
                class="w-full border border-gray-200 rounded-xl p-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="请输入公司地址"
              >
            </div>
          </div>
        </div>
      </div>

      <!-- 发展历程 -->
      <div class="border border-gray-100 rounded-2xl bg-white p-6 shadow-sm">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg text-gray-900 font-semibold">
            发展历程
          </h2>
          <button class="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-1 text-blue-700 transition-colors hover:bg-blue-100">
            <div class="i-carbon:add" />
            <span class="text-sm font-medium">添加里程碑</span>
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-for="(milestone, index) in companyInfo.milestones"
            :key="index"
            class="flex items-center gap-4 border border-gray-200 rounded-xl p-4 transition-colors hover:bg-gray-50"
          >
            <div class="h-16 w-16 flex items-center justify-center rounded-xl from-blue-500 to-blue-600 bg-gradient-to-r text-white font-bold">
              {{ milestone.year }}
            </div>
            <div class="flex-1">
              <p class="text-gray-900 font-medium">
                {{ milestone.event }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <button class="p-2 text-gray-400 transition-colors hover:text-blue-600">
                <div class="i-carbon:edit" />
              </button>
              <button class="p-2 text-gray-400 transition-colors hover:text-red-600">
                <div class="i-carbon:trash-can" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 服务项目标签页 -->
    <div v-if="activeTab === 'services'" class="space-y-6">
      <div class="border border-gray-100 rounded-2xl bg-white p-6 shadow-sm">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-lg text-gray-900 font-semibold">
            服务项目
          </h2>
          <button class="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
            <div class="i-carbon:add" />
            <span class="font-medium">添加服务</span>
          </button>
        </div>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2">
          <div
            v-for="service in services"
            :key="service.id"
            class="border border-gray-200 rounded-xl p-4 transition-shadow hover:shadow-md"
          >
            <div class="mb-3 flex items-start justify-between">
              <div
                class="h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-r text-white"
                :class="service.color"
              >
                <div :class="service.icon" />
              </div>
              <div class="flex items-center gap-1">
                <button class="p-1 text-gray-400 transition-colors hover:text-blue-600" @click="editService(service)">
                  <div class="i-carbon:edit" />
                </button>
                <button class="p-1 text-gray-400 transition-colors hover:text-red-600" @click="deleteService(service.id)">
                  <div class="i-carbon:trash-can" />
                </button>
              </div>
            </div>
            <h3 class="mb-2 text-gray-900 font-semibold">
              {{ service.title }}
            </h3>
            <p class="text-sm text-gray-600">
              {{ service.description }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 页面内容标签页 -->
    <div v-if="activeTab === 'pages'" class="space-y-6">
      <div class="border border-gray-100 rounded-2xl bg-white p-6 shadow-sm">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-lg text-gray-900 font-semibold">
            页面内容
          </h2>
          <button class="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
            <div class="i-carbon:add" />
            <span class="font-medium">新建页面</span>
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-for="page in pages"
            :key="page.id"
            class="flex items-center justify-between border border-gray-200 rounded-xl p-4 transition-colors hover:bg-gray-50"
          >
            <div class="flex items-center gap-4">
              <div class="h-10 w-10 flex items-center justify-center rounded-lg bg-gray-100">
                <div :class="page.icon" class="text-gray-600" />
              </div>
              <div>
                <h3 class="text-gray-900 font-semibold">
                  {{ page.title }}
                </h3>
                <p class="text-sm text-gray-600">
                  {{ page.description }}
                </p>
                <p class="mt-1 text-xs text-gray-500">
                  最后修改: {{ formatDate(page.lastModified) }}
                </p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <span
                class="rounded-full px-2 py-1 text-xs font-medium"
                :class="getStatusBadge(page.status).class"
              >
                {{ getStatusBadge(page.status).text }}
              </span>
              <button class="p-2 text-gray-400 transition-colors hover:text-blue-600" @click="editPage(page)">
                <div class="i-carbon:edit" />
              </button>
              <button class="p-2 text-gray-400 transition-colors hover:text-red-600" @click="deletePage(page.id)">
                <div class="i-carbon:trash-can" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 媒体资源标签页 -->
    <div v-if="activeTab === 'media'" class="space-y-6">
      <div class="border border-gray-100 rounded-2xl bg-white p-6 shadow-sm">
        <div class="mb-6 flex items-center justify-between">
          <h2 class="text-lg text-gray-900 font-semibold">
            媒体资源
          </h2>
          <button class="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700" @click="uploadMedia">
            <div class="i-carbon:upload" />
            <span class="font-medium">上传文件</span>
          </button>
        </div>

        <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
          <div
            v-for="media in mediaFiles"
            :key="media.id"
            class="border border-gray-200 rounded-xl p-4 transition-shadow hover:shadow-md"
          >
            <div class="mb-3 flex items-center justify-between">
              <div class="h-12 w-12 flex items-center justify-center rounded-lg bg-gray-100">
                <div class="i-carbon:image text-gray-600" />
              </div>
              <button class="p-1 text-gray-400 transition-colors hover:text-red-600" @click="deleteMedia(media.id)">
                <div class="i-carbon:trash-can" />
              </button>
            </div>
            <h3 class="mb-1 truncate text-gray-900 font-medium">
              {{ media.name }}
            </h3>
            <p class="text-xs text-gray-500">
              {{ media.size }} • {{ formatDate(media.uploadedAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑器模态框 -->
    <div v-if="showEditor" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="mx-4 max-w-2xl w-full rounded-2xl bg-white p-6">
        <div class="mb-4 flex items-center justify-between">
          <h3 class="text-lg text-gray-900 font-semibold">
            {{ editorTitle }}
          </h3>
          <button class="p-2 text-gray-400 transition-colors hover:text-gray-600" @click="cancelEdit">
            <div class="i-carbon:close" />
          </button>
        </div>

        <textarea
          v-model="editorContent"
          rows="8"
          class="w-full border border-gray-200 rounded-xl p-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
          :placeholder="editorPlaceholder"
        />

        <div class="mt-4 flex items-center justify-end gap-3">
          <button class="px-4 py-2 text-gray-600 transition-colors hover:text-gray-800" @click="cancelEdit">
            取消
          </button>
          <button class="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700" @click="saveContent">
            保存
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
