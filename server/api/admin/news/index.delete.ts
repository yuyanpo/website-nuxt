import { defineEventHandler } from 'h3'
import { query } from '~/server/utils/db'
export default defineEventHandler(async (event) => {
  try {
    await query(
      'DELETE FROM news WHERE id = ?',
      [event.context.params?.id]
    )
    return { success: true }
  } catch (error) {
    console.error('删除新闻失败:', error)
    throw createError({ statusCode: 500, statusMessage: '新闻删除失败' })
  }
})