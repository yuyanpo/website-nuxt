import { defineEventHandler, readBody } from 'h3'
import { query } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    // 验证必需的字段
    if (!body.title || !body.content || !body.category) {
      throw createError({ statusCode: 400, statusMessage: '缺少必需的字段' })
    }

    // 验证分类是否有效
    const validCategories = ['company', 'industry', 'product']
    if (!validCategories.includes(body.category)) {
      throw createError({ statusCode: 400, statusMessage: '无效的新闻分类' })
    }

    // 处理发布日期格式
    let publishDate = new Date()
    if (body.publishDate) {
      publishDate = new Date(body.publishDate)
    }

    const result = await query(
      `INSERT INTO news SET 
        title = ?, 
        summary = ?,
        content = ?, 
        category = ?, 
        cover_url = ?, 
        status = ?, 
        publish_date = ?
      `,
      [
        body.title,
        body.summary || null,
        body.content,
        body.category,
        body.cover || null,
        body.status || 'draft',
        publishDate,
      ],
    ) as any

    const newId = result.insertId

    // 返回创建的新闻数据
    const newRows = await query(
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
      [newId],
    ) as any[]

    return newRows[0]
  }
  catch (error: any) {
    console.error('创建新闻失败:', error)

    // 如果是已知的错误，直接抛出
    if (error?.statusCode) {
      throw error
    }

    // 其他数据库错误
    throw createError({ statusCode: 500, statusMessage: '新闻创建失败' })
  }
})
