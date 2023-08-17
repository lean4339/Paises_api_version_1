import indexController from "../controllers/indexController.js"
export default async function routes (fastify, options) {
    fastify.get('/', async (request, reply) => {
      reply.send(await indexController.getAllCountries(request));
    })
  }