import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import dotEnv from "dotenv"
import Fastify from 'fastify';
import fastifyBcrypt from "fastify-bcrypt"
import fastifyjwt from "@fastify/jwt"
import { fastifySwaggerConfig } from "./config/swagger.config.js";


import indexRoutes from "./routes/index.routes.js";
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";


dotEnv.config();
import "./config/sequlize.connection.js"

export const fastify = Fastify({
    logger: true
});
const { PORT, SECRET_KEY } = process.env;

fastify.register(fastifyBcrypt, {
    saltWorkFactor: 12
})

fastify.register(fastifyjwt, {
    secret: SECRET_KEY
})

fastify.register(fastifySwagger, {
    swagger: fastifySwaggerConfig
})
fastify.register(fastifySwaggerUi, {
    prefix: "swagger"
})

fastify.register(indexRoutes)
fastify.register(productRoutes, { prefix: "products" })
fastify.register(authRoutes, { prefix: "auth" })

const main = async () => {
    try {
        await fastify.listen({ port: PORT }, err => console.log(err));
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}
main();