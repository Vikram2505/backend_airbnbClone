
// Swagger Api documentation Option
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Airbnb API",
        version: "1.0.1",
        description: "An Express Library API",
        contact: {
          name: "Vikram Rambhad",
          email: "vikramrambhad25@gmail.com",
          url: "https://aboutvikram.vercel.app/",
        },
        // license: {
        //   name: "Apache 2.0",
        //   url: "http://www.apache.org/licenses/LICENSE-2.0.html",
        // },
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
          },
        },
      },
      security: {
        bearerAuth: [],
      },
      servers: [
        {
          // url: "http://localhost:3000",
          url: 'https://backend-airbnb-clone.vercel.app',
          description: "My API documentation."
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  export default options;