import { registerUserHandler, loginRouteHandler, refreshTokenRouteHandler } from "../handler/auth..handler.js";


const registerRoute = {
    schema: {
        tags: ['authentication'],
        summary: "",
        security: [{ apiKey: [] }],
        body: {
            type: "object",
            properties: {
                first_name: {
                    type: "string",
                    description: "the id of product"
                },
                last_name: {
                    type: "string",
                    description: "the id of product"
                },
                username: {
                    type: "string",
                    description: "the id of product"
                },
                password: {
                    type: "string",
                    description: "the id of product"
                }
            }
        },
        response: {
            201: {
                type: 'object'
            }
        }
    },
    handler: registerUserHandler
}


const loginRoute = {
    schema: {
        tags: ['authentication'],
        summary: "",
        security: [{ apiKey: [] }],
        body: {
            type: "object",
            properties: {
                username: {
                    type: "string",
                    description: "the id of product"
                },
                password: {
                    type: "string",
                    description: "the id of product"
                }
            }
        },
        response: {
            201: {
                type: 'object'
            }
        }
    },
    handler: loginRouteHandler
}

const refreshToken = {
    schema: {
        tags: ['authentication'],
        summary: "",
        security: [{ apiKey: [] }],
        body: {
            type: "object",
            properties: {
                token: {
                    type: "string",
                }
            }
        }
    },
    handler: refreshTokenRouteHandler
}

export default function authRoutes(fastify, options, done) {
    fastify.post("/register", registerRoute)
    fastify.post("/login", loginRoute)
    fastify.post("/refresh_token", refreshToken)
    done();
}