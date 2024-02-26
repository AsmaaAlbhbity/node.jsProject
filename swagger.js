

const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nursery System API",
      version: "1.0.0",
      description: "API documentation for Nursery System",
    },
  },
  apis: ["./Route/*.js"], 
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
