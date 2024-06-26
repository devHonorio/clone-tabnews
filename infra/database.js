import { Client } from 'pg'

async function query(queryObject) {
  const client = new Client({
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
  })

  await client.connect()

  try {
    const result = await client.query(queryObject)
    return result
  } catch (error) {
    console.log(error)
  } finally {
    await client.end()
  }
}

export default { query }
