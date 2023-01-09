import { Product, ProductInventory } from '@prisma/client';
import express, { NextFunction, Request, Response, Router } from 'express';
const router: Router = express.Router();
import { isAuth } from '../middlewares/auth';
import { findAdminByUserId } from '../services/admin';
import { findDiscountById } from '../services/discount';
import { createProduct, findProductById, findProductByName, updateProductById } from '../services/product';
import { createProductInventory, deletProductInventoryById, updateProductInventoryById } from '../services/productInventory';

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

    if ( !name || !price ) {
      res.status(400);
      throw new Error('Please fill name and price ...');
    }
    // existing name:
    const existingProduct = await findProductByName(name);
    if (existingProduct) {
      res.status(400);
      throw new Error('This product is already exist ...');
    }

    // handle discount

    let discountPrice;
    if (discount_active === Boolean(false)) {
      discountPrice = price;
    } else {
      if (!discount_id) {
        discountPrice = price;
      } else {
        const discount = await findDiscountById(+discount_id);
        const discountPercent = discount.discount_percent;
        discountPrice = (price / 100) * (100 - discountPercent);
      }
    }

    // adminId:
    const userId = payload.userId;
    const admin = await findAdminByUserId(+userId);

    // validate input productInventory:
    const productInventoryData = {
      quantity,
      createByAdminId: admin.id,
      modified_at: null
    } as ProductInventory;

    // create Inventory for nproduct:
    const inventoryOfProduct = await createProductInventory(productInventoryData);

    // validate input product:
    const productData = {
      name,
      description,
      category_id,
      discount_id,
      discount_active,
      price,
      discount_price: discountPrice,
      inventoryId: inventoryOfProduct.id,
      createByAdminId: admin.id,
      modified_at: null,
    } as Product;

    // create product
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

    const productId = req.params.id;
    const { name, description, price, discount_id, discount_active, quantity } = req.body;
    if (!price || !name) {
      res.status(400);
      throw new Error('❌ Bad request ...');
    }

    // discount
    const discount = await findDiscountById(+discount_id);
    const discountPercent = discount.discount_percent;
    let discountPrice;

    if (discount_active === Boolean(true)) {
      discountPrice = (price / 100) * (100 - discountPercent);
    } else {
      discountPrice = price;
    }

    // adminId:
    const userId = payload.userId;
    const admin = await findAdminByUserId(+userId);

    const product = await findProductById(+productId);
    const inventoryId = product.inventoryId;

    // valide input productInventory:
    const productInventoryData = {
      quantity,
      modifiedByAdminId: admin.id,
    } as ProductInventory;
    await updateProductInventoryById(+inventoryId, productInventoryData)

    // valide input product:
    const productData = {
      name,
      description,
      discount_id,
      discount_active,
      price,
      modifiedByAdminId: admin.id,
      discount_price: discountPrice,
    } as Product;

    // update product
    await updateProductById(+productId, productData);

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
    const productId = req.params.id;
    const product = await findProductById(+productId);
    const inventoryId = product.inventoryId;

    // delete inventory --> product also delete
    await deletProductInventoryById(+inventoryId);

    res.status(200).json({ msg: '1 product deleted...' });
  } catch (error) {
    next(error);
  }
});

export default router;
