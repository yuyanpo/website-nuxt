import { defineEventHandler } from 'h3'
import { query } from '~/server/utils/db'

export default defineEventHandler(async () => {
  try {
    const rows = await query(
      `SELECT 
        id,
        username,
        nickname,
        email,
        avatar,
        role,
        status,
        last_login_at AS lastLoginAt,
        created_at AS createdAt,
        updated_at AS updatedAt
      FROM admin_users
      ORDER BY role DESC, created_at ASC`,
    )
    return rows
  }
  catch (error) {
    console.error('获取用户列表失败:', error)
    throw createError({ statusCode: 500, statusMessage: '获取用户列表失败' })
  }
})

