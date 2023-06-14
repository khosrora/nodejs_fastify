



const indexRoute = {
    schema: {
        tags: ['home'],
        security: [{ apiKey: [] }],
        response: {
            200: {
                type: 'object',
                properties: {
                    header: {
                        type: "object",
                        properties: {
                            authorization: { type: "string" }
                        }
                    },
                    message: { type: "string" }
                }
            }
        }
    }
}

const midd = (req, res, next) => {
    console.log("one");
    next()
}

const midd2 = (req, res, next) => {
    console.log("two");
    next()
}

export default function indexRoutes(fastify, options, done) {
    fastify.get("/", { preHandler: [midd, midd2] }, async (req, reply) => {
        reply.send({
            header: req.headers,
            message: "hello fastify"
        })
    })
    done();
}