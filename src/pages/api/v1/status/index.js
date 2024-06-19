import database from '../../../../../infra/database.js'
const status = async (request, response) => {
  const result = await database.query('SELECT 1 + 1 as sum;')

  console.log(result.rows[0])
  response
    .status(200)
    .json({ chave: 'Os alunos do curso.dev são acima da média' })
}
export default status
