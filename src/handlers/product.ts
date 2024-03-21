import { Request, Response } from "express";
import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [
        ['id', 'ASC']
      ],
      attributes: { exclude: [ 'createdAt', 'updatedAt' ] }
    });
    res.json({ data: products });
  } catch (error) {
    throw error;
  }
}

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if(!product){
      return res.status(404).json({ message: "No se encontró el producto" });
    }
    res.json({ data: product });
  } catch (error) {
    throw error;
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.json({ data: product });
  } catch (error) {
    throw error;
  }
};
