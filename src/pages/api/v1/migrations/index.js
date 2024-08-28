import migrateRunner from 'node-pg-migrate'
import { join } from 'node:path'
import database from 'infra/database'

export default async function migrations(request, response) {
  const dbClient = await database.getNewClient()

  const migrationsOptions = {
    dbClient,
    dryRun: true,
    dir: join('infra', 'migrations'),
    direction: 'up',
    verbose: true,
    migrationsTable: 'pgmigrations',
  }

  const method = request.method
  if (method === 'GET') {
    const pendingMigrations = await migrateRunner(migrationsOptions)
    await dbClient.end()

    return response.status(200).json(pendingMigrations)
  } else if (method === 'POST') {
    const migratedMigrations = await migrateRunner({
      ...migrationsOptions,
      dryRun: false,
    })

    const migratedMigrationsStatus = migratedMigrations.length > 0 ? 201 : 200
    await dbClient.end()

    return response.status(migratedMigrationsStatus).json(migratedMigrations)
  }

  return response.status(405)
}
