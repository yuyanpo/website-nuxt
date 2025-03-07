import { defineEventHandler } from 'h3'
import adminAuthMiddleware from '~/middleware/admin-auth'

export default defineEventHandler({
//   onRequest: [adminAuthMiddleware],
  handler: async (event) => {
    // 管理端内容管理接口实现
    return { success: true }
  }
})