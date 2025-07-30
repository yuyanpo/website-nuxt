import { defineEventHandler, getRouterParam } from 'h3'
import { query } from '~/server/utils/db'

export default defineEventHandler(async (event) => {
  try {
    // 获取路由参数中的ID
    const id = getRouterParam(event, 'id')

    if (!id) {
      throw createError({ statusCode: 400, statusMessage: '缺少新闻ID参数' })
    }

    // 首先检查新闻是否存在
    const existingRows = await query(
      'SELECT id FROM news WHERE id = ?',
      [id],
    ) as any[]

    if (!existingRows || existingRows.length === 0) {
      throw createError({ statusCode: 404, statusMessage: '新闻不存在' })
    }

    // 删除新闻
    await query(
      'DELETE FROM news WHERE id = ?',
      [id],
    )

    return { success: true, message: '新闻删除成功' }
  }
  catch (error: any) {
    console.error('删除新闻失败:', error)

    // 如果是已知的错误，直接抛出
    if (error?.statusCode) {
      throw error
    }

    // 其他数据库错误
    throw createError({ statusCode: 500, statusMessage: '新闻删除失败' })
  }
})
