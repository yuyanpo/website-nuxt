import { defineEventHandler, getRouterParam } from 'h3'
import { query } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    // 获取路由参数中的ID
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({ statusCode: 400, statusMessage: '缺少新闻ID参数' })
    }

    // 查询指定ID的新闻
    const rows = await query(
      `SELECT 
        id,
        title,
        summary,
        content,
        category,
        cover_url as cover,
        status,
        publish_date as publishDate,
        created_at as createdAt,
        updated_at as updatedAt
      FROM news
      WHERE id = ?`,
      [id],
    ) as any[]

    // 如果没有找到新闻
    if (!rows || rows.length === 0) {
      throw createError({ statusCode: 404, statusMessage: '新闻不存在' })
    }

    // 返回第一条记录
    return rows[0]
  }
  catch (error: any) {
    console.error('Database query error:', error)

    // 如果是已知的错误，直接抛出
    if (error?.statusCode) {
      throw error
    }

    // 其他数据库错误
    throw createError({ statusCode: 500, statusMessage: '数据库查询失败' })
  }
})
