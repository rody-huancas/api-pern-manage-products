import { Router } from "express";
import { createProduct } from "./handlers/product";

const router = Router();

router.get('/', (req, res) => {
    res.json('Desde get');
});

router.post('/', createProduct);

router.put('/', (req, res) => {
    res.json('Desde put');
});

router.delete('/', (req, res) => {
    res.json('Desde delete');
});

export default router;