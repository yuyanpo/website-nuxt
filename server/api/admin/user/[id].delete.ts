import type { RowDataPacket } from 'mysql2'
import { defineEventHandler } from 'h3'
import { ROLE } from '~/constants'
import { query } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id

    if (!id) {
      throw createError({ statusCode: 400, statusMessage: '用户 ID 不能为空' })
    }

    // 查询用户信息
    const users = await query(
      'SELECT id, role FROM admin_users WHERE id = ?',
      [id],
    ) as RowDataPacket[]

    if (!users || users.length === 0) {
      throw createError({ statusCode: 404, statusMessage: '用户不存在' })
    }

    const user = users[0]

    // 不允许删除超级管理员
    if (user.role === ROLE.SUPER_ADMIN) {
      throw createError({ statusCode: 403, statusMessage: '不能删除超级管理员账号' })
    }

    // 删除用户
    await query('DELETE FROM admin_users WHERE id = ?', [id])

    return { success: true, message: '用户删除成功' }
  }
  catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('删除用户失败:', error)
    throw createError({ statusCode: 500, statusMessage: '删除用户失败' })
  }
})

