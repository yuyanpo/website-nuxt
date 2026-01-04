import { defineEventHandler } from 'h3'
import { query } from '~/server/utils/db'

// 公开接口，无需认证
export default defineEventHandler(async () => {
  try {
    const rows = await query(
      `SELECT 
        site_name AS siteName,
        site_keywords AS siteKeywords,
        site_description AS siteDescription,
        icp_number AS icpNumber
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
    console.error('获取网站设置失败:', error)
    // 返回空值而不是抛出错误，避免影响前台展示
    return {
      siteName: '',
      siteKeywords: '',
      siteDescription: '',
      icpNumber: '',
    }
  }
})
