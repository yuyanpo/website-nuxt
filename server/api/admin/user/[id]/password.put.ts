import type { RowDataPacket } from 'mysql2'
import bcrypt from 'bcrypt'
import { defineEventHandler, readBody } from 'h3'
import { ROLE } from '~/constants'
import { query } from '~/server/utils/db'

interface ResetPasswordBody {
  password: string
}

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id
    const body = await readBody<ResetPasswordBody>(event)

    if (!id) {
      throw createError({ statusCode: 400, statusMessage: '用户 ID 不能为空' })
    }

    if (!body.password || body.password.length < 6) {
      throw createError({ statusCode: 400, statusMessage: '密码长度至少 6 个字符' })
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

    // 不允许重置超级管理员密码
    if (user.role === ROLE.SUPER_ADMIN) {
      throw createError({ statusCode: 403, statusMessage: '不能重置超级管理员密码' })
    }

    // 加密新密码
    const hashedPassword = await bcrypt.hash(body.password, 10)

    // 更新密码
    await query(
      'UPDATE admin_users SET password = ? WHERE id = ?',
      [hashedPassword, id],
    )

    return { success: true, message: '密码重置成功' }
  }
  catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('重置密码失败:', error)
    throw createError({ statusCode: 500, statusMessage: '重置密码失败' })
  }
})

