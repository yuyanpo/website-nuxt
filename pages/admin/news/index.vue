<template>
  <div class="news-management">
    <div class="page-header">
      <h1>新闻管理</h1>
      <button class="create-btn" @click="navigateToCreate">
        <div class="i-carbon:add w-18px h-18px mr-1" />
        创建新闻
      </button>
    </div>

    <div class="filter-bar">
      <div class="search-box">
        <input type="text" v-model="searchKeyword" placeholder="搜索标题..." />
        <div class="i-carbon:search w-20px h-20px" />
      </div>
      <div class="filter-box">
        <select v-model="categoryFilter">
          <option value="">全部分类</option>
          <option value="company">公司新闻</option>
          <option value="industry">行业资讯</option>
          <option value="product">产品动态</option>
        </select>
      </div>
    </div>

    <div class="news-table">
      <table>
        <thead>
          <tr>
            <th style="width: 60px">ID</th>
            <th style="width: 100px">封面</th>
            <th style="width: 35%">标题</th>
            <th>分类</th>
            <th>发布日期</th>
            <th>状态</th>
            <th style="width: 150px">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="news in filteredNews" :key="news.id">
            <td>{{ news.id }}</td>
            <td>
              <div class="news-cover" :style="`background-image: url(${news.cover})`"></div>
            </td>
            <td class="news-title">{{ news.title }}</td>
            <td>
              <span class="category-tag" :class="news.category">
                {{ getCategoryName(news.category) }}
              </span>
            </td>
            <td>{{ formatDate(news.publishDate) }}</td>
            <td>
              <span class="status-badge" :class="news.status">
                {{ news.status === 'published' ? '已发布' : '草稿' }}
              </span>
            </td>
            <td>
              <div class="action-buttons">
                <button class="view-btn" @click="viewNews(news.id)">
                  <div class="i-carbon:view w-16px h-16px" />
                </button>
                <button class="edit-btn" @click="editNews(news.id)">
                  <div class="i-carbon:edit w-16px h-16px" />
                </button>
                <button class="delete-btn" @click="confirmDelete(news)">
                  <div class="i-carbon:trash-can w-16px h-16px" />
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredNews.length === 0">
            <td colspan="7" class="no-data">暂无数据</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页 -->
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="currentPage--">
        <div class="i-carbon:chevron-left w-16px h-16px" />
      </button>
      <span class="page-info">{{ currentPage }} / {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="currentPage++">
        <div class="i-carbon:chevron-right w-16px h-16px" />
      </button>
    </div>

    <!-- 删除确认对话框 -->
    <div v-if="showDeleteConfirm" class="delete-confirm-modal">
      <div class="modal-content">
        <h3>确认删除</h3>
        <p>您确定要删除新闻 <strong>"{{ newsToDelete?.title }}"</strong> 吗？此操作无法撤销。</p>
        <div class="modal-actions">
          <button class="cancel-btn" @click="showDeleteConfirm = false">取消</button>
          <button class="confirm-btn" @click="deleteNews">确认删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['admin-auth']
})

// 状态变量
const router = useRouter()
const searchKeyword = ref('')
const categoryFilter = ref('')
const currentPage = ref(1)
const showDeleteConfirm = ref(false)
const newsToDelete = ref(null)
const pageSize = 10

// 从API获取新闻数据
const { data: newsData, refresh: refreshNews } = await useFetch('/api/admin/news', {
  headers: useRequestHeaders(['cookie'])
})

// 过滤新闻数据
const filteredNews = computed(() => {
  let result = [...newsData.value]
  
  // 搜索过滤
  if (searchKeyword.value) {
    result = result.filter(item => 
      item.title.toLowerCase().includes(searchKeyword.value.toLowerCase())
    )
  }
  
  // 分类过滤
  if (categoryFilter.value) {
    result = result.filter(item => item.category === categoryFilter.value)
  }
  
  // 分页
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return result.slice(start, end)
})

// 计算总页数
const totalPages = computed(() => {
  let filteredData = [...newsData.value]
  
  if (searchKeyword.value) {
    filteredData = filteredData.filter(item => 
      item.title.toLowerCase().includes(searchKeyword.value.toLowerCase())
    )
  }
  
  if (categoryFilter.value) {
    filteredData = filteredData.filter(item => item.category === categoryFilter.value)
  }
  
  return Math.ceil(filteredData.length / pageSize) || 1
})

// 获取分类名称
const getCategoryName = (category) => {
  const categoryMap = {
    'company': '公司新闻',
    'industry': '行业资讯',
    'product': '产品动态'
  }
  return categoryMap[category] || '未分类'
}

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN')
}

// 查看新闻
const viewNews = (id) => {
  if (!id) {
    console.error('无效的新闻ID');
    return;
  }
  router.push(`/admin/news/view/${id}`)
}

const editNews = (id) => {
  if (!id) {
    console.error('无效的新闻ID');
    return;
  }
  router.push(`/admin/news/edit/${id}`)
}

// 确认删除
const confirmDelete = (news) => {
  newsToDelete.value = news
  showDeleteConfirm.value = true
}

// 删除新闻
const deleteNews = async () => {
  const id = newsToDelete.value?.id
  if (!id) {
    console.error('删除操作缺少有效ID')
    return
  }
  try {
    await $fetch(`/api/news/${id}`, {
      method: 'DELETE'
    })
    await refreshNews()
    showDeleteConfirm.value = false
  } catch (error) {
    console.error('删除新闻失败:', error)
  }
}

// 跳转到创建新闻
const navigateToCreate = () => {
  router.push('/admin/news/create')
}

// 监听过滤器变化，重置页码
watch([searchKeyword, categoryFilter], () => {
  currentPage.value = 1
})
</script>

<style scoped>
.news-management {
  width: 100%;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

h1 {
  font-size: 24px;
  margin: 0;
}

.create-btn {
  display: flex;
  align-items: center;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s;
}

.create-btn:hover {
  background-color: #40a9ff;
}

.filter-bar {
  display: flex;
  margin-bottom: 16px;
  gap: 16px;
}

.search-box {
  position: relative;
  flex: 1;
}

.search-box input {
  width: 100%;
  padding: 8px 36px 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
}

.search-box .i-carbon\:search {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #8c8c8c;
}

.filter-box select {
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: white;
  min-width: 150px;
}

.news-table {
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  margin-bottom: 16px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  background-color: #fafafa;
  padding: 16px;
  text-align: left;
  font-weight: 500;
  color: #262626;
  border-bottom: 1px solid #f0f0f0;
}

td {
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: middle;
}

.news-cover {
  width: 100px;
  height: 60px;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
}

.news-title {
  font-weight: 500;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.category-tag {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.category-tag.company {
  background-color: #e6f7ff;
  color: #1890ff;
}

.category-tag.industry {
  background-color: #f6ffed;
  color: #52c41a;
}

.category-tag.product {
  background-color: #fff7e6;
  color: #fa8c16;
}

.status-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.status-badge.published {
  background-color: #f6ffed;
  color: #52c41a;
}

.status-badge.draft {
  background-color: #f5f5f5;
  color: #8c8c8c;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-buttons button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s;
}

.view-btn:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.edit-btn:hover {
  color: #faad14;
  border-color: #faad14;
}

.delete-btn:hover {
  color: #ff4d4f;
  border-color: #ff4d4f;
}

.no-data {
  text-align: center;
  color: #8c8c8c;
  padding: 40px 0;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
}

.pagination button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination button:hover:not(:disabled) {
  color: #1890ff;
  border-color: #1890ff;
}

.pagination button:disabled {
  color: #d9d9d9;
  cursor: not-allowed;
}

.page-info {
  font-size: 14px;
  color: #262626;
}

.delete-confirm-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  border-radius: 4px;
  padding: 24px;
  width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.modal-content h3 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #262626;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

.cancel-btn {
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-btn {
  padding: 8px 16px;
  border: none;
  background-color: #ff4d4f;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}
</style>
