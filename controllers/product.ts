import express, { NextFunction, Request, Response, Router } from 'express';
import { ProductCreateInput } from '../interfaces';
import { isAuth } from '../middlewares/auth';
import { findAdminByUserId } from '../services/admin';
import { createProduct, findAllProduct,  findProductDataById, getProductById, updateProductById } from '../services/product';
import { deletProductInventoryById } from '../services/productInventory';
const router: Router = express.Router();

// get product by ID:
router.get('/product/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['admin', 'customer'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }
    const id = req.params.id
    const product = await getProductById(+id);
    res.json({ product });
  } catch (error) {
    next(error);
  }
});

// get all products
router.get('/products', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['admin', 'customer'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }
    const products = await findAllProduct()
    res.json({products})

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
    const { name, description, category_id, price, discount_id, discount_active, quantity } = req.body;

    if (!name || !price) {
      res.status(400);
      throw new Error('Please fill name and price ...');
    }


    // handle discount

    // adminId:
    const userId = payload.userId;
    const admin = await findAdminByUserId(+userId);

    // validate input product:
    const productData = {
      name,
      description,
      category_id,
      discount_id,
      discount_active,
      price,
      createByAdminId: admin.id,
      quantity,
    } as ProductCreateInput;

    // create product
    const product = await createProduct(productData);
    res.json(product)
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
    const { name, description,category_id,  price, discount_id, discount_active, quantity } = req.body;
    if (!price || !name) {
      res.status(400);
      throw new Error('❌ Bad request ...');
    }

    // adminId:
    const userId = payload.userId;
    const admin = await findAdminByUserId(+userId);

    // valide input product:
    const productData = {
      name,
      description,
      category_id,
      quantity,
      modifiedByIdminId: admin.id,
      discount_id,
      discount_active,
      price,
    } as ProductCreateInput
    const newProduct = await updateProductById(+id, productData)
    res.json(newProduct)

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
    const productId = req.params.id;
    const product = await findProductDataById(+productId);
    const inventoryId = product.inventoryId;

    // delete inventory --> product also delete
    await deletProductInventoryById(+inventoryId);

    res.status(200).json({ msg: '1 product deleted...' });
  } catch (error) {
    next(error);
  }
});

export default router;
