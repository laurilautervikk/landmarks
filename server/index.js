// Express v4.16.0 and higher
// --------------------------
const express = require("express");
const app = express();
const router = express.Router();
//const bodyParser = require("body-parser"); //Not needed when using below 4 lines
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
//swagger imports
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
// swaggerDocument = require("./swagger1.json");

//https://swagger.io/specification/
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Landmarks API",
      description: "Landmarks API documentation",
      contact: {
        name: "MEELT",
      },
      servers: ["http://localhost:8080"],
    },
  },
  apis: ["router.js" /*,  "./authRoutes.js" */],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//app.use("/api", router);

//swagger
/**
 * @swagger
 * /get-landmarks:
 * get:
 *   description: Get first page of Landmarks
 *   responses:
 *     '200':
 *        description: A sucessful response
 *
 *
 *
 *
 *
 */

//swagger end

const routes = require("./router");
const db = require("./dbConnection");

const expressJwt = require("express-jwt");
const { SECRET } = require("./config");

app.use(
  expressJwt({ secret: SECRET, algorithms: ["HS256"] }).unless({
    path: [
      "/api/auth/register",
      "/api/auth/login",
      "/api/get-landmarks",
      { url: /^\/api\/get-landmark\/.*/, methods: ["GET"] }, // removed PUT
    ],
  })
);

//BASIC SOLUTION
//for API routes
app.use("/api", routes);

//Respond if GET request is made to root URL
app.get("/", (req, res) => {
  res.send("Hello from Landmarks API v.1.0.0");
});

//swagger code
//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// enable env port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Landmarks backend listening on port: ${PORT}`)
);
