import { User } from "../model/user.model.js";
import { fastify } from "../server.js";



export const getUserMiddleware = async (req, reply, next) => {
    const authorization = req?.headers?.authorization;
    if (!authorization) {
        return reply.status(401).send({
            statusCode: 401,
            message: "you need to authorization"
        })
    }
    const [bearer, token] = authorization.toString().split(" ");
    if (bearer && bearer.toLowerCase() === "bearer") {
        const result = fastify.jwt.verify(token);
        if (typeof result === "string") return reply.status(400).send({
            statusCode: 400,
            message: "your token not valid bearer token 1"
        })
        const { userId } = result;
        const user = await User.findOne({ where: { id: userId } });
        if (!user) return reply.status(401).send({
            statusCode: 401,
            message: "please login first"
        });
        req.user = user.dataValues;
        next()
        return;
    }
    return reply.status(401).send({
        statusCode: 401,
        message: "your token not valid bearer token 2"
    });
}