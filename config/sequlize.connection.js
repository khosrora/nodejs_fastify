import { Sequelize } from 'sequelize';



// const sequelize = new Sequelize("postgres://khosrora:kh153333@localhost:5432/fastify");

export const sequelize = new Sequelize("fastify", 'khosrora', 'kh153333', { host: "localhost", port: "5432", dialect: "postgres" });

const DBconnection = async () => {
    await sequelize.authenticate();
    console.log(`connection to pg is OK !!`);
}
DBconnection();