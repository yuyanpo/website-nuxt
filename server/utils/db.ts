import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export const getConnection = async () => {
  const connection = await pool.getConnection()
  return {
    connection,
    release: () => connection.release()
  }
}

export const query = async (sql: string, values?: any[]) => {
  const { connection, release } = await getConnection()
  try {
    const [results] = await connection.query(sql, values)
    return results
  } finally {
    release()
  }
}