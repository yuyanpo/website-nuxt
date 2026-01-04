import type { RowDataPacket } from 'mysql2'
import bcrypt from 'bcrypt'
import { query } from '~/server/utils/db'

interface AdminUser extends RowDataPacket {
  id: number
  username: string
  password: string
  nickname: string
  email: string | null
  avatar: string | null
  role: number
  status: number
}

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event)

  if (!username || !password) {
    throw createError({
      statusCode: 400,
      message: '用户名和密码不能为空',
    })
  }

  // 从数据库查询用户
  const users = await query(
    'SELECT id, username, password, nickname, email, avatar, role, status FROM admin_users WHERE username = ?',
    [username],
  ) as AdminUser[]

  if (!users || users.length === 0) {
    throw createError({
      statusCode: 401,
      message: '用户名或密码错误',
    })
  }

  const user = users[0]

  // 检查用户状态
  if (user.status !== 1) {
    throw createError({
      statusCode: 403,
      message: '账号已被禁用，请联系管理员',
    })
  }

  // 验证密码
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    throw createError({
      statusCode: 401,
      message: '用户名或密码错误',
    })
  }

  // 更新最后登录时间
  await query(
    'UPDATE admin_users SET last_login_at = NOW() WHERE id = ?',
    [user.id],
  )

  // 设置用户会话
  await setUserSession(event, {
    user: {
      id: user.id,
      username: user.username,
      nickname: user.nickname || user.username,
      role: user.role,
      avatar: user.avatar || undefined,
    },
  })

  return {
    message: '登录成功',
  }
})
