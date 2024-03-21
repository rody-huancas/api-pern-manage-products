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

export const updateProduct = async (req: Request, res: Response) => {
  console.log("entra")
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if(!product){
      return res.status(404).json({ message: "No se encontró el producto" });
    }

    // Actualizar
    await product.update(req.body);
    await product.save();

    res.json({ data: product });
  } catch (error) {
    throw error;
  }
}

export const updateAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if(!product){
      return res.status(404).json({ message: "No se encontró el producto" });
    }

    // Actualizar
    product.availability = !product.dataValues.availability;
    await product.save();

    res.json({ data: product });
  } catch (error) {
    throw error;
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if(!product){
      return res.status(404).json({ message: "No se encontró el producto" });
    }

    await product.destroy();
    res.json({ data: 'Producto eliminado!' });
  } catch (error) {
    throw error;
  }
}

