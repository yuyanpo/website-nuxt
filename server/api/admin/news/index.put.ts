import { defineEventHandler, readBody } from 'h3'
import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const connection = await pool.getConnection()
    
    await connection.query(
      `UPDATE news SET
        title = ?,
        content = ?,
        category = ?,
        cover_url = ?,
        status = ?,
        publish_date = ?
      WHERE id = ?`,
      [
        body.title,
        body.content,
        body.category,
        body.cover,
        body.status,
        body.publishDate,
        event.context.params?.id
      ]
    )

    connection.release()
    return { success: true }
  } catch (error) {
    console.error('更新新闻失败:', error)
    throw createError({ statusCode: 500, statusMessage: '新闻更新失败' })
  }
})