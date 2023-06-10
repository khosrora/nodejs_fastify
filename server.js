import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import dotEnv from "dotenv"
import Fastify from 'fastify';
import indexRoutes from "./routes/index.routes.js";
import productRoutes from "./routes/product.routes.js";



dotEnv.config();
const fastify = Fastify({
    logger: true
});
const { PORT } = process.env;

fastify.register(fastifySwagger)
fastify.register(fastifySwaggerUi, {
    prefix: "swagger",
    swagger: {
        info: {
            title: "fastify swagger"
        }
    }
})
fastify.register(indexRoutes)
fastify.register(productRoutes, { prefix: "products" })

const main = async () => {
    try {
        await fastify.listen({ port: PORT });
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}
main();