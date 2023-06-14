import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import dotEnv from "dotenv"
import Fastify from 'fastify';
import fastifyBcrypt from "fastify-bcrypt"
import fastifyjwt from "@fastify/jwt"
import { fastifySwaggerConfig } from "./config/swagger.config.js";
// import express from "@fastify/express";
import fastifyMiddie from "@fastify/middie"
import cors from "cors";

import indexRoutes from "./routes/index.routes.js";
import productRoutes from "./routes/product.routes.js";
import authRoutes from "./routes/auth.routes.js";
import fastifyStatic from "@fastify/static";
import path from "path"

dotEnv.config();
import "./config/sequlize.connection.js"
import userRoutes from "./routes/user.routes.js";

export const fastify = Fastify({
    logger: true
});

const { PORT, SECRET_KEY } = process.env;
var __dirname = path.resolve();

const main = async () => {
    await fastify.register(fastifyMiddie);

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

    fastify.register( fastifyStatic , {
        root: path.join(__dirname, 'public'),
        prefix: '/public/', // optional: default '/'
      })

    fastify.use(cors());
    
    // fastify.use((req, res, next) => {
    //     console.log("hello middleware");
    //     next()
    // })
    
    fastify.register(indexRoutes)
    fastify.register(productRoutes, { prefix: "products" })
    fastify.register(userRoutes, { prefix: "user" })
    fastify.register(authRoutes, { prefix: "auth" })


    try {
        await fastify.listen({ port: PORT }, err => console.log(err));
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}
main();