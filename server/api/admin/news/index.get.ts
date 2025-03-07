import { defineEventHandler } from 'h3'
import { query } from '~/server/utils/db'
export default defineEventHandler(async (event) => {
  try {
    const rows = await query(
      `SELECT 
        id,
        title,
        content,
        category,
        cover_url as cover,
        status,
        publish_date as publishDate,
        created_at as createdAt,
        updated_at as updatedAt
      FROM news
      ORDER BY created_at DESC`
    )
    return rows
  } catch (error) {
    console.error('Database query error:', error)
    throw createError({ statusCode: 500, statusMessage: '数据库查询失败' })
  }
})