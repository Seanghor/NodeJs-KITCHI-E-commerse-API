import { Product } from '@prisma/client';
import express, { NextFunction, Request, Response, Router } from 'express';
const router: Router = express.Router();
import { isAuth } from '../middlewares/auth';
import { findAdminByUserId } from '../services/admin';
import { createProduct, deleteProductById, findProductById, findProductByName, updateProductById } from '../services/product';

// get product by ID:
router.get('/product/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['admin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }
    const id = req.params.id;
    const singleProduct = await findProductById(+id);
    res.status(200).json({ product: singleProduct });
  } catch (error) {
    next(error);
  }
});

// get all product:
router.get('/products', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['admin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }
    const categoryProducts = await prisma.productCategory.findMany({
      select: {
        id: true,
        name: true,
        Product: {
          select: {
            id: true,
            name: true,
            inventory_id: true,
            price: true,
            discount_id: true
            
          }
        }
      }

    });

    res.status(200).json(categoryProducts);
  } catch (error) {
    next(error);
  }
});
// create product
router.post('/product', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['admin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }
    const { name, description, category_id, inventory_id, price, discount_id } = req.body;

    if (!name || !category_id || !inventory_id || !price) {
      res.status(400);
      throw new Error('Please fill full information for adding the product ...');
    }
    // existing name:
    const existingProduct = await findProductByName(name);
    if (existingProduct) {
      res.status(400);
      throw new Error('This product is already exist ...');
    }

    // adminId:
    const userId = payload.userId;
    const admin = await findAdminByUserId(+userId);
    // validate input:
    const productData = {
      name,
      description,
      category_id,
      inventory_id,
      price,
      discount_id,
      createByAdminId: admin.id,
      modified_at: null,
    } as Product;

    await createProduct(productData);
    res.status(200).json({ msg: '1 product created ...' });
  } catch (error) {
    next(error);
  }
});

// update product by ID:
router.put('/product/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['admin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }

    const id = req.params.id;
    const { description, category_id, inventory_id, price, discount_id } = req.body;
    if (!price) {
      res.status(400);
      throw new Error('Please input the price of the product');
    }
    // admin
    const userId = payload.userId;
    const admin = await findAdminByUserId(+userId);
    // valide input:
    const productData = {
      description,
      category_id,
      inventory_id,
      price,
      discount_id,
      modifiedByAdminId: admin.id,
    } as Product;

    // update
    await updateProductById(+id, productData);
    res.status(200).json({ msg: '1 product updated ...' });
  } catch (error) {
    next(error);
  }
});

// delete product:
router.delete('/product/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['admin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }
    const id = req.params.id;
    await deleteProductById(+id);
    res.status(200).json({ msg: '1 product deleted...' });
  } catch (error) {
    next(error);
  }
});

export default router;
