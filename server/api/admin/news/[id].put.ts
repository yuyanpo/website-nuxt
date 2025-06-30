import { defineEventHandler, getRouterParam, readBody } from 'h3'
import { query } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    // 获取路由参数中的ID
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({ statusCode: 400, statusMessage: '缺少新闻ID参数' })
    }

    // 获取请求体数据
    const body = await readBody(event)

    // 记录请求数据用于调试
    console.error('更新新闻请求数据:', {
      id,
      title: body.title,
      summary: body.summary,
      category: body.category,
      status: body.status,
      publishDate: body.publishDate,
      hasContent: !!body.content,
      contentLength: body.content?.length,
    })

    // 验证必需的字段
    if (!body.title || !body.content || !body.category) {
      console.error('缺少必需字段:', {
        hasTitle: !!body.title,
        hasContent: !!body.content,
        hasCategory: !!body.category,
      })
      throw createError({ statusCode: 400, statusMessage: '缺少必需的字段' })
    }

    // 验证分类是否有效
    const validCategories = ['company', 'industry', 'product']
    if (!validCategories.includes(body.category)) {
      throw createError({ statusCode: 400, statusMessage: '无效的新闻分类' })
    }

    // 首先检查新闻是否存在
    const existingRows = await query(
      'SELECT id FROM news WHERE id = ?',
      [id],
    ) as any[]

    if (!existingRows || existingRows.length === 0) {
      throw createError({ statusCode: 404, statusMessage: '新闻不存在' })
    }

    // 处理发布日期格式
    let publishDate = new Date()
    if (body.publishDate) {
      publishDate = new Date(body.publishDate)
    }

    // 更新新闻
    await query(
      `UPDATE news SET
        title = ?,
        summary = ?,
        content = ?,
        category = ?,
        cover_url = ?,
        status = ?,
        publish_date = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?`,
      [
        body.title,
        body.summary || null,
        body.content,
        body.category,
        body.cover || null,
        body.status || 'draft',
        publishDate,
        id,
      ],
    )

    // 返回更新后的新闻数据
    const updatedRows = await query(
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

    return updatedRows[0]
  }
  catch (error: any) {
    console.error('更新新闻失败 - 详细错误信息:', {
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      sqlMessage: error.sqlMessage,
      stack: error.stack,
    })

    // 如果是已知的错误，直接抛出
    if (error?.statusCode) {
      throw error
    }

    // MySQL错误处理
    if (error.code) {
      switch (error.code) {
        case 'ER_BAD_FIELD_ERROR':
          throw createError({ statusCode: 500, statusMessage: '数据库字段错误' })
        case 'ER_NO_SUCH_TABLE':
          throw createError({ statusCode: 500, statusMessage: '数据库表不存在' })
        case 'ER_DATA_TOO_LONG':
          throw createError({ statusCode: 400, statusMessage: '数据过长' })
        default:
          throw createError({ statusCode: 500, statusMessage: `数据库错误: ${error.code}` })
      }
    }

    // 其他数据库错误
    throw createError({ statusCode: 500, statusMessage: '新闻更新失败' })
  }
})
