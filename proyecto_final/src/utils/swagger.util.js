import { __dirname } from "../../dirname.util.js";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentación coder backend ecommerce",
      description: "API para ecommerce",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

export const specs = swaggerJSDoc(swaggerOptions);
