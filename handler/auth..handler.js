import { User } from "../model/user.model.js";
import { fastify } from "../server.js";




export const registerUserHandler = async (req, reply) => {
    try {
        const { first_name, last_name, username, password, } = req.body;
        const newUser = new User({
            first_name, last_name, username,
            password: await fastify.bcrypt.hash(password)
        })
        await newUser.save();
        reply.send(newUser)
    } catch (error) {
        reply.send(error)
    }
}


export const loginRouteHandler = async (req, reply) => {
    const { username, password } = req.body;
    const user = await User.findOne({
        where: {
            username
        }
    })    
    if (!user) return reply.status(400).send({ message: "username or passowrd in incorect !!" });
    const compareUser = await fastify.bcrypt.compare(password, user.password);
    if (compareUser) {
        const token = fastify.jwt.sign({ userId: user.id });
        return reply.status(200).send({
            message: "log in successfully !!",
            token
        })
    }
    return reply.status(401).send({
        message: "username or passowrd in incorect !!"
    })
}

export const refreshTokenRouteHandler = async (req, reply) => {
    try {
        const { token } = req.body;
        let response;
        fastify.jwt.verify(token, async (err, decoded) => {
            if (err) console.log(err);
            const id = decoded.userId;
            const user = await User.findByPk(id);
            response = user.dataValues;
            // if (!user) return reply.status(500).send({ message: "Internal error" })
            console.log(response);
        });
        console.log(response);
        return reply.send({
            user: response
        })
    } catch (error) {
        console.log(error);
    }
}