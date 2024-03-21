import { Router } from "express";
import { createProduct, getProductById, getProducts } from "./handlers/product";
import { body } from "express-validator";
import { handleInputErrors } from "./middlewares";

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post(
  "/",
  // validaciones
  body("name")
    .notEmpty().withMessage("El nombre del producto no puede ir vacío"),
  body("price")
    .isNumeric().withMessage("Valor no válido")
    .notEmpty().withMessage("El precio del producto no puede ir vacío")
    .custom((value) => value > 0).withMessage("El precio no válido"),
  handleInputErrors,
  createProduct
);

router.put("/", (req, res) => {
  res.json("Desde put");
});

router.delete("/", (req, res) => {
  res.json("Desde delete");
});

export default router;
