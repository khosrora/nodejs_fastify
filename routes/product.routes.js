import { getAllProducts, getOneProduct } from "../handler/product.handler.js"

const product = {
    type: 'object',
    properties: {
        id: { type: "integer" },
        name: { type: "string" }
    }
}

const getOneProductItem = {
    schema: {
        tags: ['products'],
        params: {
            type: "object",
            properties: {
                id: {
                    type: "string",
                    description: "the id of product"
                }
            }
        },
        response: {
            200: product
        }
    },
    handler: getOneProduct
}

const getProductItem = {
    schema: {
        tags: ['products'],
        response: {
            200: {
                type: 'array',
                items: product
            }
        }
    },
    handler: getAllProducts
}

export default function productRoutes(fastify, options, done) {
    // ! get all products
    fastify.get("/", getProductItem);
    // ! get one products
    fastify.get("/:id", getOneProductItem);
    done();
}