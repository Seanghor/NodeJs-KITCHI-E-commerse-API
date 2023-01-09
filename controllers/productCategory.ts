import { ProductCategory } from '@prisma/client';
import express, { NextFunction, Request, Response, Router } from 'express';
const router: Router = express.Router();
import { isAuth } from '../middlewares/auth';
import { findAdminByUserId } from '../services/admin';
import {
  createProductCategory,
  deleteProductCategoryById,
  findProductCategoryById,
  findProductCategoryByName,
  getAllCategoryIncludeProducts,
  getOneCategoryIncludeProducts_ByCategoryId,
  updateProductCategoryById,
} from '../services/productCategory';

// get 1 Category include products
router.get('/productCategory/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['admin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }

    const id = req.params.id;
    const productCategory = await getOneCategoryIncludeProducts_ByCategoryId(+id);

    if (!productCategory) {
      res.status(400).json({ msg: '❌ Bad request ...' });
      // res.status(400);
      // throw new Error('❌ Bad request ...');
    }
    res.status(200).json(productCategory);
  } catch (error) {
    next(Error);
  }
});

// get All Category in clude Products
router.get('/productCategories', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['admin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }

    const allProductCategory = await getAllCategoryIncludeProducts();
    res.status(200).json(allProductCategory);
  } catch (error) {
    next(error);
  }
});

// create Category:
router.post('/productCategory', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['admin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }

    const { name, description } = req.body;
    if (!name) {
      res.status(400).json('❌ Bad request ...');
    }
    const existingName = await findProductCategoryByName(name);
    if (existingName) {
      res.status(400).json('Name is already exist...');
    }
    const userId = payload.userId;
    const admin = await findAdminByUserId(+userId);

    const productCategoryData = {
      name,
      description,
      createByAdminId: admin.id,
      modifiedByAdminId: null,
      modified_at: null,
    } as ProductCategory;

    await createProductCategory(productCategoryData);
    res.status(200).json({ msg: '1 productCategory created ...' });
  } catch (error) {
    next(next);
  }
});

// Delete Category
router.delete('/productCategory/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['admin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }

    const id = req.params.id;
    const existingProductCategory = await findProductCategoryById(+id);
    if (!existingProductCategory) {
      res.status(400).json({ msg: '❌ Bad request ...' });
    }

    await deleteProductCategoryById(+id);
    res.status(200).json({ msg: '1 productCategory deleted ...' });
  } catch (error) {
    next(next);
  }
});

// delete Category
router.put('/productCategory/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['admin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }
    const id = req.params.id;
    const existingProductCategory = await findProductCategoryById(+id);
    const { name, description } = req.body;
    if (!existingProductCategory || !name) {
      res.status(400).json({ msg: '❌ Bad request ...' });
    }

    const existingName = await findProductCategoryByName(name);
    if (existingName) {
      res.status(400).json({ msg: 'Name already exist ...' });
    }

    const userId = payload.userId;
    const admin = await findAdminByUserId(+userId);

    const proCateData = {
      name,
      description,
      modifiedByAdminId: admin.id,
    } as ProductCategory;
    await updateProductCategoryById(+id, proCateData);
    res.status(200).json({ msg: '1 productCategory updated...' });
  } catch (error) {
    next(error);
  }
});
export default router;
