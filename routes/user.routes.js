import { changeProfileHandler, getProfileHandler } from "../handler/user.handler.js";
import { getUserMiddleware } from "../utils/get-user.js";


const changeProfileRoute = {
    schema: {
        tags: ['user'],
        summary: "",
        security: [{ apiKey: [] }],
        body: {
            type: "object",
            properties: {
                address: {
                    type: "string",
                },
                latitudes: {
                    type: "string",
                },
                longitudes: {
                    type: "string",
                }
            }
        },
        response: {
            201: {
                type: 'object'
            }
        }
    },
    handler: changeProfileHandler 
}


const getProfileRoute = {
    schema: {
        tags: ['user'],
        summary: "",
        security: [{ apiKey: [] }],
        response: {
            201: {
                type: 'object'
            }
        }
    },
    handler: getProfileHandler , 
    preHandler : getUserMiddleware
}

export default function userRoutes(fastify, options, done) {
    fastify.patch("/change", changeProfileRoute)
    fastify.get("/get", getProfileRoute)
    done();
}