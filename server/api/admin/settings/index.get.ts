import { defineEventHandler } from 'h3'
import { query } from '~/server/utils/db'

export default defineEventHandler(async () => {
  try {
    const rows = await query(
      `SELECT 
        id,
        site_name AS siteName,
        site_keywords AS siteKeywords,
        site_description AS siteDescription,
        icp_number AS icpNumber,
        updated_at AS updatedAt
      FROM site_settings
      WHERE id = 1`,
    ) as any[]

    // 如果没有记录，返回默认值
    if (!rows || rows.length === 0) {
      return {
        siteName: '',
        siteKeywords: '',
        siteDescription: '',
        icpNumber: '',
      }
    }

    return rows[0]
  }
  catch (error) {
    console.error('获取系统设置失败:', error)
    throw createError({ statusCode: 500, statusMessage: '获取系统设置失败' })
  }
})

