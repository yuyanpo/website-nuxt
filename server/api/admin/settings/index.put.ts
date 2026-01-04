import { defineEventHandler, readBody } from 'h3'
import { query } from '~/server/utils/db'

interface SettingsBody {
  siteName?: string
  siteKeywords?: string
  siteDescription?: string
  icpNumber?: string
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<SettingsBody>(event)

    // 使用 UPSERT 语法确保记录存在
    await query(
      `INSERT INTO site_settings (id, site_name, site_keywords, site_description, icp_number)
       VALUES (1, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         site_name = VALUES(site_name),
         site_keywords = VALUES(site_keywords),
         site_description = VALUES(site_description),
         icp_number = VALUES(icp_number)`,
      [
        body.siteName || '',
        body.siteKeywords || '',
        body.siteDescription || '',
        body.icpNumber || '',
      ],
    )

    return { success: true, message: '设置保存成功' }
  }
  catch (error) {
    console.error('保存系统设置失败:', error)
    throw createError({ statusCode: 500, statusMessage: '保存系统设置失败' })
  }
})

