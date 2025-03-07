import { defineEventHandler, readBody } from 'h3'
import { query } from '~/server/utils/db'
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const result = await query(
      `INSERT INTO news SET 
        title = ?, 
        content = ?, 
        category = ?, 
        cover_url = ?, 
        status = ?, 
        publish_date = ?
      `,
      [
        body.title,
        body.content,
        body.category,
        body.cover,
        body.status || 'draft',
        body.publishDate || new Date()
      ]
    )
    return { 
      success: true,
      // 修复找不到命名空间 "mysql" 的问题，假设使用 mysql2 库
      id: (result as { insertId: number }).insertId
    }
  } catch (error) {
    console.error('创建新闻失败:', error)
    throw createError({ statusCode: 500, statusMessage: '新闻创建失败' })
  }
})