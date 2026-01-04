import type { RowDataPacket } from 'mysql2'
import { defineEventHandler, readBody } from 'h3'
import { ROLE } from '~/constants'
import { query } from '~/server/utils/db'

interface UpdateUserBody {
  nickname?: string
  email?: string
  role?: number
  status?: number
}

export default defineEventHandler(async (event) => {
  try {
    const id = event.context.params?.id
    const body = await readBody<UpdateUserBody>(event)

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

    // 不允许编辑超级管理员
    if (user.role === ROLE.SUPER_ADMIN) {
      throw createError({ statusCode: 403, statusMessage: '不能编辑超级管理员账号' })
    }

    // 不允许将用户升级为超级管理员
    if (body.role === ROLE.SUPER_ADMIN) {
      throw createError({ statusCode: 403, statusMessage: '不能将用户设置为超级管理员' })
    }

    // 更新用户
    await query(
      `UPDATE admin_users SET
        nickname = ?,
        email = ?,
        role = ?,
        status = ?
      WHERE id = ?`,
      [
        body.nickname || null,
        body.email || null,
        body.role ?? ROLE.ADMIN,
        body.status ?? 1,
        id,
      ],
    )

    return { success: true, message: '用户更新成功' }
  }
  catch (error: any) {
    if (error.statusCode) {
      throw error
    }
    console.error('更新用户失败:', error)
    throw createError({ statusCode: 500, statusMessage: '更新用户失败' })
  }
})

