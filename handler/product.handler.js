import { products } from "../db/products.js";

export const getOneProduct = function (req, reply) {
    const { id } = req.params;
    const product = products.find(p => p.id == id);
    if (!product) reply.code(404).send("not found any product");
    reply.send(product)
}

export const getAllProducts = function (req, reply) {
    reply.send(products)
}