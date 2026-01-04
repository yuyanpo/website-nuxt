import type { RowDataPacket } from 'mysql2'
import bcrypt from 'bcrypt'
import { defineEventHandler, readBody } from 'h3'
import { ROLE } from '~/constants'
import { query } from '~/server/utils/db'

interface CreateUserBody {
  username: string
  password: string
  nickname?: string
  email?: string
  role?: number
  status?: number
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<CreateUserBody>(event)

    // 验证必填字段
    if (!body.username || !body.password) {
      throw createError({ statusCode: 400, statusMessage: '用户名和密码不能为空' })
    }

    // 验证用户名长度
    if (body.username.length < 3 || body.username.length > 50) {
      throw createError({ statusCode: 400, statusMessage: '用户名长度应在 3-50 个字符之间' })
    }

    // 验证密码长度
    if (body.password.length < 6) {
      throw createError({ statusCode: 400, statusMessage: '密码长度至少 6 个字符' })
    }

    // 不允许创建超级管理员
    if (body.role === ROLE.SUPER_ADMIN) {
      throw createError({ statusCode: 403, statusMessage: '不能创建超级管理员账号' })
    }

    // 检查用户名是否已存在
    const existingUsers = await query(
      'SELECT id FROM admin_users WHERE username = ?',
      [body.username],
    ) as RowDataPacket[]

    if (existingUsers && existingUsers.length > 0) {
      throw createError({ statusCode: 400, statusMessage: '用户名已存在' })
    }

    // 加密密码
    const hashedPassword = await bcrypt.hash(body.password, 10)

    // 插入用户
    await query(
      `INSERT INTO admin_users (username, password, nickname, email, role, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        body.username,
        hashedPassword,
        body.nickname || body.username,
        body.email || null,
        body.role || ROLE.ADMIN,
        body.status ?? 1,
      ],
    )

    return { success: true, message: '用户创建成功' }
  }
  catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('创建用户失败:', error)
    throw createError({ statusCode: 500, statusMessage: '创建用户失败' })
  }
})

