import { Product, ProductInventory } from '@prisma/client';
import express, { NextFunction, Request, Response, Router } from 'express';
const router: Router = express.Router();
import { isAuth } from '../middlewares/auth';
import { findAdminByUserId } from '../services/admin';
import { findDiscountById } from '../services/discount';
import {
  createProduct,
  findManyProductBy_CategoryId,
  findProductById,
  findProductByName,
  updateProductById,
} from '../services/product';
import { createProductInventory, deletProductInventoryById } from '../services/productInventory';

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
            discount_id: true,
            discount_active: true,
            price: true,
            discount_price: true,
          },
        },
      },
    });

    res.status(200).json(categoryProducts);
  } catch (error) {
    next(error);
  }
});

// get products by categoryId:
router.get('/productCategory/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['admin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }

    const id = req.params.id;
    const products = await findManyProductBy_CategoryId(+id);
    res.status(200).json(products);
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

    if (!name || !category_id || !price || !price) {
      res.status(400);
      throw new Error('Please fill full information for adding the product ...');
    }
    // existing name:
    const existingProduct = await findProductByName(name);
    if (existingProduct) {
      res.status(400);
      throw new Error('This product is already exist ...');
    }

    // handle discount
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

    // validate input productInventory:
    const productInventoryData = {
      quantity,
      createByAdminId: admin.id,
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

    const id = req.params.id;
    const { name, description, price, discount_id, discount_active } = req.body;
    if (!price) {
      res.status(400);
      throw new Error('Please input the price of the product');
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

    // valide input:
    const productData = {
      name,
      description,
      discount_id,
      discount_active,
      price,
      modifiedByAdminId: admin.id,
      discount_price: discountPrice,
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
