import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product API",
      version: "1.0.0",
      description: "This is a simple CRUD API application for products made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "http://localhost:8000/",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          required: ["name", "price"], // Assuming 'name' and 'price' are required fields in your product model
          properties: {
            id: {
              type: "string",
              format: "uuid",
              description: "The auto-generated id of the product"
            },
            code: {
              type: "string",
              description: "The code of the product"
            },
            name: {
              type: "string",
              description: "The name of the product"
            },
            description: {
              type: "string",
              description: "The description of the product"
            },
            price: {
              type: "number",
              description: "The price of the product"
            },
            quantity: {
              type: "number",
              description: "The quantity of the product"
            },
            inventoryStatus: {
              type: "string",
              description: "The inventory status of the product"
            },
            category: {
              type: "string",
              description: "The category of the product"
            },
            image: {
              type: "string",
              description: "The image of the product"
            },
            rating: {
              type: "number",
              description: "The rating of the product"
            },
          }
        },
      },
    },
  },
  apis: ["./routes/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
