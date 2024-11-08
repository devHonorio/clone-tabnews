import database from 'infra/database'
import orchestrator from 'src/tests/orchestrator'

beforeAll(async () => {
  await orchestrator.waitForAllServices()
  await database.query('drop schema public cascade; create schema public;')
})

async function fetchPostMigrations() {
  return await fetch('http://localhost:3000/api/v1/migrations', {
    method: 'POST',
  })
}

describe('POST /api/v1/migrations', () => {
  describe('Anonymous user', () => {
    describe('Running pending migrations', () => {
      test('First time', async () => {
        const response = await fetchPostMigrations()

        expect(response.status).toBe(201)

        const responseBory = await response.json()

        expect(Array.isArray(responseBory)).toBe(true)

        expect(responseBory.length).toBeGreaterThan(0)
      })

      test('Second time', async () => {
        const response = await fetchPostMigrations()

        expect(response.status).toBe(200)

        const responseBory = await response.json()

        expect(responseBory.length).toBe(0)
      })
    })
  })
})
