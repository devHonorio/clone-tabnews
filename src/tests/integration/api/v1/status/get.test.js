import orchestrator from 'src/tests/orchestrator'

beforeAll(async () => await orchestrator.waitForAllServices())

test('GET to /api/v1/status should return 200', async () => {
  const response = await fetch('http://localhost:3000/api/v1/status')

  expect(response.status).toBe(200)

  const responseBory = await response.json()

  const parsedUpdateAt = new Date(responseBory.update_at).toISOString()
  expect(responseBory.update_at).toEqual(parsedUpdateAt)

  expect(responseBory.dependencies).toBeDefined()

  expect(responseBory.dependencies.database).toBeDefined()

  expect(responseBory.dependencies.database.version).toBe('16.1')
  expect(responseBory.dependencies.database.max_connections).toBe(100)
  expect(responseBory.dependencies.database.opened_connections).toBe(1)
})
