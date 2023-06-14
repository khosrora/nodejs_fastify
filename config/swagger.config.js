export const fastifySwaggerConfig = {
    info: {
        title: "fastify swagger",
        description: "swagger Documention on my application",
        version: "0.1.0"
    },
    tags: [
        { name: "products", description: "admin can write and user can read !!! :/" } , 
        { name: "user", description: "admin can write and user can read !!! :/" } , 
    ],
    host: 'localhost:5000',
    schemes: ["http"],
    securityDefinitions: {
        apiKey: {
            type: 'apiKey',
            in: "header",
            name: "authorization"
        }
    }
}