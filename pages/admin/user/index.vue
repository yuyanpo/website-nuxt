<script setup lang="ts">
import { ROLE } from '~/constants'

definePageMeta({
  layout: 'admin',
  title: '用户管理',
  middleware: ['admin-auth'],
})

interface AdminUser {
  id: number
  username: string
  nickname: string
  email: string | null
  avatar: string | null
  role: number
  status: number
  lastLoginAt: string | null
  createdAt: string
  updatedAt: string
}

// 用户列表
const { data: users, status, refresh } = await useFetch<AdminUser[]>('/api/admin/user', {
  lazy: true,
})

// 弹窗状态
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showPasswordModal = ref(false)
const showDeleteConfirm = ref(false)

// 当前操作的用户
const currentUser = ref<AdminUser | null>(null)

// 表单数据
const createForm = reactive({
  username: '',
  password: '',
  nickname: '',
  email: '',
  role: ROLE.ADMIN as number,
  status: 1 as number,
})

const editForm = reactive({
  nickname: '',
  email: '',
  role: ROLE.ADMIN as number,
  status: 1 as number,
})

const passwordForm = reactive({
  password: '',
  confirmPassword: '',
})

// 操作状态
const submitting = ref(false)
const actionMessage = ref('')
const actionError = ref('')

// 判断是否为超级管理员
function isSuperAdmin(user: AdminUser) {
  return user.role === ROLE.SUPER_ADMIN
}

// 获取角色名称
function getRoleName(role: number) {
  return role === ROLE.SUPER_ADMIN ? '超级管理员' : '普通管理员'
}

// 获取角色样式
function getRoleBadgeClass(role: number) {
  return role === ROLE.SUPER_ADMIN
    ? 'bg-purple-100 text-purple-700'
    : 'bg-blue-100 text-blue-700'
}

// 获取状态名称
function getStatusName(status: number) {
  return status === 1 ? '启用' : '禁用'
}

// 获取状态样式
function getStatusBadgeClass(status: number) {
  return status === 1
    ? 'bg-green-100 text-green-700'
    : 'bg-red-100 text-red-700'
}

// 格式化日期
function formatDate(dateString: string | null) {
  if (!dateString)
    return '-'
  return new Date(dateString).toLocaleString('zh-CN')
}

// 显示消息
function showMessage(message: string, isError = false) {
  if (isError) {
    actionError.value = message
    actionMessage.value = ''
  }
  else {
    actionMessage.value = message
    actionError.value = ''
  }
  setTimeout(() => {
    actionMessage.value = ''
    actionError.value = ''
  }, 3000)
}

// 打开创建弹窗
function openCreateModal() {
  createForm.username = ''
  createForm.password = ''
  createForm.nickname = ''
  createForm.email = ''
  createForm.role = ROLE.ADMIN
  createForm.status = 1
  showCreateModal.value = true
}

// 打开编辑弹窗
function openEditModal(user: AdminUser) {
  if (isSuperAdmin(user))
    return
  currentUser.value = user
  editForm.nickname = user.nickname || ''
  editForm.email = user.email || ''
  editForm.role = user.role
  editForm.status = user.status
  showEditModal.value = true
}

// 打开重置密码弹窗
function openPasswordModal(user: AdminUser) {
  if (isSuperAdmin(user))
    return
  currentUser.value = user
  passwordForm.password = ''
  passwordForm.confirmPassword = ''
  showPasswordModal.value = true
}

// 打开删除确认
function openDeleteConfirm(user: AdminUser) {
  if (isSuperAdmin(user))
    return
  currentUser.value = user
  showDeleteConfirm.value = true
}

// 创建用户
async function handleCreate() {
  if (!createForm.username || !createForm.password) {
    showMessage('用户名和密码不能为空', true)
    return
  }
  if (createForm.password.length < 6) {
    showMessage('密码长度至少 6 个字符', true)
    return
  }

  submitting.value = true
  try {
    await $fetch('/api/admin/user', {
      method: 'POST',
      body: createForm,
    })
    showCreateModal.value = false
    showMessage('用户创建成功')
    await refresh()
  }
  catch (error: any) {
    showMessage(error.data?.statusMessage || '创建失败', true)
  }
  finally {
    submitting.value = false
  }
}

// 更新用户
async function handleUpdate() {
  if (!currentUser.value)
    return

  submitting.value = true
  try {
    await $fetch(`/api/admin/user/${currentUser.value.id}`, {
      method: 'PUT',
      body: editForm,
    })
    showEditModal.value = false
    showMessage('用户更新成功')
    await refresh()
  }
  catch (error: any) {
    showMessage(error.data?.statusMessage || '更新失败', true)
  }
  finally {
    submitting.value = false
  }
}

// 重置密码
async function handleResetPassword() {
  if (!currentUser.value)
    return

  if (!passwordForm.password || passwordForm.password.length < 6) {
    showMessage('密码长度至少 6 个字符', true)
    return
  }
  if (passwordForm.password !== passwordForm.confirmPassword) {
    showMessage('两次输入的密码不一致', true)
    return
  }

  submitting.value = true
  try {
    await $fetch(`/api/admin/user/${currentUser.value.id}/password`, {
      method: 'PUT',
      body: { password: passwordForm.password },
    })
    showPasswordModal.value = false
    showMessage('密码重置成功')
  }
  catch (error: any) {
    showMessage(error.data?.statusMessage || '重置失败', true)
  }
  finally {
    submitting.value = false
  }
}

// 删除用户
async function handleDelete() {
  if (!currentUser.value)
    return

  submitting.value = true
  try {
    await $fetch(`/api/admin/user/${currentUser.value.id}`, {
      method: 'DELETE',
    })
    showDeleteConfirm.value = false
    showMessage('用户删除成功')
    await refresh()
  }
  catch (error: any) {
    showMessage(error.data?.statusMessage || '删除失败', true)
  }
  finally {
    submitting.value = false
  }
}

// 快速切换状态
async function toggleStatus(user: AdminUser) {
  if (isSuperAdmin(user))
    return

  try {
    await $fetch(`/api/admin/user/${user.id}`, {
      method: 'PUT',
      body: {
        nickname: user.nickname,
        email: user.email,
        role: user.role,
        status: user.status === 1 ? 0 : 1,
      },
    })
    showMessage(user.status === 1 ? '用户已禁用' : '用户已启用')
    await refresh()
  }
  catch (error: any) {
    showMessage(error.data?.statusMessage || '操作失败', true)
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- 页面标题 -->
    <div class="border border-gray-100 rounded-2xl bg-white p-6 shadow-sm">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="mb-2 text-2xl text-gray-900 font-bold">
            用户管理
          </h1>
          <p class="text-gray-600">
            管理系统管理员账号，包括创建、编辑、禁用和删除用户
          </p>
        </div>
        <button
          class="flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-white transition-colors hover:bg-teal-700"
          @click="openCreateModal"
        >
          <div class="i-carbon:add" />
          <span class="font-medium">新建用户</span>
        </button>
      </div>
    </div>

    <!-- 消息提示 -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="actionMessage" class="flex items-center gap-2 rounded-xl bg-green-50 p-4 text-green-700">
        <div class="i-carbon:checkmark-filled" />
        <span>{{ actionMessage }}</span>
      </div>
      <div v-else-if="actionError" class="flex items-center gap-2 rounded-xl bg-red-50 p-4 text-red-700">
        <div class="i-carbon:warning-filled" />
        <span>{{ actionError }}</span>
      </div>
    </Transition>

    <!-- 加载状态 -->
    <div v-if="status === 'pending'" class="border border-gray-100 rounded-2xl bg-white p-12 shadow-sm">
      <div class="flex flex-col items-center justify-center">
        <div class="i-carbon:circle-dash mb-4 h-8 w-8 animate-spin text-teal-600" />
        <p class="text-gray-500">
          加载用户列表...
        </p>
      </div>
    </div>

    <!-- 用户列表 -->
    <div v-else class="border border-gray-100 rounded-2xl bg-white shadow-sm">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-100 bg-gray-50">
              <th class="px-6 py-4 text-left text-sm text-gray-600 font-medium">
                用户信息
              </th>
              <th class="px-6 py-4 text-left text-sm text-gray-600 font-medium">
                角色
              </th>
              <th class="px-6 py-4 text-left text-sm text-gray-600 font-medium">
                状态
              </th>
              <th class="px-6 py-4 text-left text-sm text-gray-600 font-medium">
                最后登录
              </th>
              <th class="px-6 py-4 text-left text-sm text-gray-600 font-medium">
                创建时间
              </th>
              <th class="px-6 py-4 text-right text-sm text-gray-600 font-medium">
                操作
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="user in users" :key="user.id" class="transition-colors hover:bg-gray-50">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="h-10 w-10 flex flex-shrink-0 items-center justify-center rounded-full from-teal-500 to-teal-600 bg-gradient-to-r text-sm text-white font-medium">
                    {{ (user.nickname || user.username).charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <div class="text-gray-900 font-medium">
                      {{ user.nickname || user.username }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ user.username }}
                      <span v-if="user.email" class="ml-2">· {{ user.email }}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium"
                  :class="getRoleBadgeClass(user.role)"
                >
                  <div v-if="isSuperAdmin(user)" class="i-custom:crown h-4 w-4" />
                  {{ getRoleName(user.role) }}
                </span>
              </td>
              <td class="px-6 py-4">
                <button
                  class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition-colors"
                  :class="[getStatusBadgeClass(user.status), isSuperAdmin(user) ? 'cursor-not-allowed' : 'cursor-pointer hover:opacity-80']"
                  :disabled="isSuperAdmin(user)"
                  @click="toggleStatus(user)"
                >
                  {{ getStatusName(user.status) }}
                </button>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                {{ formatDate(user.lastLoginAt) }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                {{ formatDate(user.createdAt) }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-end gap-1">
                  <template v-if="!isSuperAdmin(user)">
                    <button
                      class="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-blue-600"
                      title="编辑"
                      @click="openEditModal(user)"
                    >
                      <div class="i-carbon:edit" />
                    </button>
                    <button
                      class="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-orange-600"
                      title="重置密码"
                      @click="openPasswordModal(user)"
                    >
                      <div class="i-carbon:password" />
                    </button>
                    <button
                      class="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-600"
                      title="删除"
                      @click="openDeleteConfirm(user)"
                    >
                      <div class="i-carbon:trash-can" />
                    </button>
                  </template>
                  <template v-else>
                    <span class="px-2 text-xs text-gray-400">受保护账号</span>
                  </template>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 空状态 -->
      <div v-if="users && users.length === 0" class="py-12 text-center">
        <div class="i-carbon:user-multiple mx-auto mb-4 h-12 w-12 text-gray-300" />
        <p class="text-gray-500">
          暂无用户数据
        </p>
      </div>
    </div>

    <!-- 创建用户弹窗 -->
    <UiModal v-model:show="showCreateModal" title="新建用户" size="lg">
      <form class="space-y-4" @submit.prevent="handleCreate">
        <div>
          <label class="mb-1.5 block text-sm text-gray-700 font-medium">用户名 <span class="text-red-500">*</span></label>
          <input
            v-model="createForm.username"
            type="text"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            placeholder="请输入用户名"
          >
        </div>

        <div>
          <label class="mb-1.5 block text-sm text-gray-700 font-medium">密码 <span class="text-red-500">*</span></label>
          <input
            v-model="createForm.password"
            type="password"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            placeholder="请输入密码（至少6位）"
          >
        </div>

        <div>
          <label class="mb-1.5 block text-sm text-gray-700 font-medium">昵称</label>
          <input
            v-model="createForm.nickname"
            type="text"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            placeholder="请输入昵称"
          >
        </div>

        <div>
          <label class="mb-1.5 block text-sm text-gray-700 font-medium">邮箱</label>
          <input
            v-model="createForm.email"
            type="email"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            placeholder="请输入邮箱"
          >
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="mb-1.5 block text-sm text-gray-700 font-medium">角色</label>
            <select
              v-model="createForm.role"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            >
              <option :value="ROLE.ADMIN">
                普通管理员
              </option>
            </select>
          </div>
          <div>
            <label class="mb-1.5 block text-sm text-gray-700 font-medium">状态</label>
            <select
              v-model="createForm.status"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            >
              <option :value="1">
                启用
              </option>
              <option :value="0">
                禁用
              </option>
            </select>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-4">
          <button
            type="button"
            class="rounded-xl px-4 py-2.5 text-gray-600 transition-colors hover:bg-gray-100"
            @click="showCreateModal = false"
          >
            取消
          </button>
          <button
            type="submit"
            class="flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-white transition-colors disabled:cursor-not-allowed hover:bg-teal-700 disabled:opacity-60"
            :disabled="submitting"
          >
            <div v-if="submitting" class="i-carbon:circle-dash h-4 w-4 animate-spin" />
            <span>{{ submitting ? '创建中...' : '创建用户' }}</span>
          </button>
        </div>
      </form>
    </UiModal>

    <!-- 编辑用户弹窗 -->
    <UiModal v-model:show="showEditModal" title="编辑用户" size="lg">
      <form class="space-y-4" @submit.prevent="handleUpdate">
        <div>
          <label class="mb-1.5 block text-sm text-gray-700 font-medium">用户名</label>
          <input
            type="text"
            :value="currentUser?.username"
            disabled
            class="w-full cursor-not-allowed border border-gray-200 rounded-xl bg-gray-50 px-4 py-2.5 text-gray-500"
          >
        </div>

        <div>
          <label class="mb-1.5 block text-sm text-gray-700 font-medium">昵称</label>
          <input
            v-model="editForm.nickname"
            type="text"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            placeholder="请输入昵称"
          >
        </div>

        <div>
          <label class="mb-1.5 block text-sm text-gray-700 font-medium">邮箱</label>
          <input
            v-model="editForm.email"
            type="email"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            placeholder="请输入邮箱"
          >
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="mb-1.5 block text-sm text-gray-700 font-medium">角色</label>
            <select
              v-model="editForm.role"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            >
              <option :value="ROLE.ADMIN">
                普通管理员
              </option>
            </select>
          </div>
          <div>
            <label class="mb-1.5 block text-sm text-gray-700 font-medium">状态</label>
            <select
              v-model="editForm.status"
              class="w-full border border-gray-200 rounded-xl px-4 py-2.5 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            >
              <option :value="1">
                启用
              </option>
              <option :value="0">
                禁用
              </option>
            </select>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-4">
          <button
            type="button"
            class="rounded-xl px-4 py-2.5 text-gray-600 transition-colors hover:bg-gray-100"
            @click="showEditModal = false"
          >
            取消
          </button>
          <button
            type="submit"
            class="flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-white transition-colors disabled:cursor-not-allowed hover:bg-teal-700 disabled:opacity-60"
            :disabled="submitting"
          >
            <div v-if="submitting" class="i-carbon:circle-dash h-4 w-4 animate-spin" />
            <span>{{ submitting ? '保存中...' : '保存修改' }}</span>
          </button>
        </div>
      </form>
    </UiModal>

    <!-- 重置密码弹窗 -->
    <UiModal v-model:show="showPasswordModal" title="重置密码" size="md">
      <p class="mb-4 text-sm text-gray-600">
        为用户 <span class="text-gray-900 font-medium">{{ currentUser?.nickname || currentUser?.username }}</span> 重置密码
      </p>

      <form class="space-y-4" @submit.prevent="handleResetPassword">
        <div>
          <label class="mb-1.5 block text-sm text-gray-700 font-medium">新密码 <span class="text-red-500">*</span></label>
          <input
            v-model="passwordForm.password"
            type="password"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            placeholder="请输入新密码（至少6位）"
          >
        </div>

        <div>
          <label class="mb-1.5 block text-sm text-gray-700 font-medium">确认密码 <span class="text-red-500">*</span></label>
          <input
            v-model="passwordForm.confirmPassword"
            type="password"
            class="w-full border border-gray-200 rounded-xl px-4 py-2.5 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            placeholder="请再次输入新密码"
          >
        </div>

        <div class="flex justify-end gap-3 pt-4">
          <button
            type="button"
            class="rounded-xl px-4 py-2.5 text-gray-600 transition-colors hover:bg-gray-100"
            @click="showPasswordModal = false"
          >
            取消
          </button>
          <button
            type="submit"
            class="flex items-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 text-white transition-colors disabled:cursor-not-allowed hover:bg-orange-700 disabled:opacity-60"
            :disabled="submitting"
          >
            <div v-if="submitting" class="i-carbon:circle-dash h-4 w-4 animate-spin" />
            <span>{{ submitting ? '重置中...' : '重置密码' }}</span>
          </button>
        </div>
      </form>
    </UiModal>

    <!-- 删除确认弹窗 -->
    <UiModal v-model:show="showDeleteConfirm" size="md">
      <template #header>
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 flex items-center justify-center rounded-full bg-red-100">
            <div class="i-carbon:warning text-xl text-red-600" />
          </div>
          <h3 class="text-lg text-gray-900 font-semibold">
            确认删除
          </h3>
        </div>
      </template>

      <p class="text-gray-600">
        确定要删除用户 <span class="text-gray-900 font-medium">{{ currentUser?.nickname || currentUser?.username }}</span> 吗？此操作不可恢复。
      </p>

      <template #footer>
        <div class="flex justify-end gap-3">
          <button
            class="rounded-xl px-4 py-2.5 text-gray-600 transition-colors hover:bg-gray-100"
            @click="showDeleteConfirm = false"
          >
            取消
          </button>
          <button
            class="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-white transition-colors disabled:cursor-not-allowed hover:bg-red-700 disabled:opacity-60"
            :disabled="submitting"
            @click="handleDelete"
          >
            <div v-if="submitting" class="i-carbon:circle-dash h-4 w-4 animate-spin" />
            <span>{{ submitting ? '删除中...' : '确认删除' }}</span>
          </button>
        </div>
      </template>
    </UiModal>
  </div>
</template>
