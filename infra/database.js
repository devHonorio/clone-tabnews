import { Client } from 'pg'

async function query(queryObject) {
  const client = new Client({
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    ssl: process.env.NODE_ENV === 'development' ? false : true,
  })

  try {
    await client.connect()
    const result = await client.query(queryObject)
    return result
  } catch (error) {
    console.log(error)
    throw error
  } finally {
    await client.end()
  }
}

export default { query }
