import { Router } from "express";
import productRouter from "./product.route";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "../swagger";
const router = Router();

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.use(
  "/products",
  productRouter,
);

export default router;
