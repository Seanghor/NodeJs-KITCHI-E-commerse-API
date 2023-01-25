import { ProductCategory } from '@prisma/client';
import express, { NextFunction, Request, Response, Router } from 'express';
const router: Router = express.Router();
import { isAuth } from '../middlewares/auth';
import { findAdminByUserId } from '../services/admin';
import {
  createProductcategory,
  deleteCategoryById,
  getAllCategory,
  updateProductCategoryById,
} from '../services/productCategory';



// get All Category
router.get('/productCategories', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['admin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }

    const allProductCategory = await getAllCategory();
    res.json({ allProductCategory });
  } catch (error) {
    next(error);
  }
});

// create Category:
router.post('/productCategory', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (![ 'admin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }

    const { name, description } = req.body;
    if (!name) {
      res.status(400);
      throw new Error('❌ Bad request ...');
    }

    const userId = payload.userId;
    const admin = await findAdminByUserId(+userId);

    const productCategoryData = {
      name,
      description,
      createByAdminId: admin.id,
      modified_at: null,
    } as ProductCategory;

    const productCategory = await createProductcategory(productCategoryData);
    res.json({ productCategory });
  } catch (error) {
    next(error);
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
    const cateDeleted = await deleteCategoryById(+id);
    res.status(200).json({ cateDeleted });
  } catch (error) {
    next(error);
  }
});

// update Category
router.put('/productCategory/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['admin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }
    const id = req.params.id;
    const { name, description } = req.body;
    if (!name) {
      res.status(400);
      throw new Error('Name cant invalid');
    }

    const userId = payload.userId;
    const admin = await findAdminByUserId(+userId);

    const proCateData = {
      name,
      description,
      modifiedByAdminId: admin.id,
    } as ProductCategory;
    const newCategory = await updateProductCategoryById(+id, proCateData);
    res.status(200).json({ newCategory });
  } catch (error) {
    next(error);
  }
});
export default router;
