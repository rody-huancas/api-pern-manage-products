import { Router } from "express";
import { createProduct } from "./handlers/product";
import { body } from "express-validator";

const router = Router();

router.get("/", (req, res) => {
  res.json("Desde get");
});

router.post(
  "/",
  // validaciones
  body("name")
    .notEmpty().withMessage("El nombre del producto no puede ir vacío"),
  body("price")
    .isNumeric().withMessage("Valor no válido")
    .notEmpty().withMessage("El precio del producto no puede ir vacío")
    .custom((value) => value > 0).withMessage("El precio no válido"),
    
  createProduct
);

router.put("/", (req, res) => {
  res.json("Desde put");
});

router.delete("/", (req, res) => {
  res.json("Desde delete");
});

export default router;
