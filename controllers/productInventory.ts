import { ProductInventory } from '@prisma/client';
import express, { NextFunction, Request, Response, Router } from 'express';
const router: Router = express.Router();
import { isAuth } from '../middlewares/auth';
import { findAdminByUserId } from '../services/admin';
import {
  deletProductInventoryById,
  findAllProductInventories,
  findProductInventoryById,
  updateProductInventoryById,
} from '../services/productInventory';

// delete inventory by id
router.delete('/productInventory/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['admin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }
    const id = req.params.id;
    const deleteInventory = await deletProductInventoryById(+id);
    res.json({ deleteInventory });
  } catch (error) {
    next(error);
  }
});

// Get inventory by Id
router.get('/productInventory/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['admin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }

    const id = req.params.id;
    const singleInventory = await findProductInventoryById(+id);
    res.status(200).json(singleInventory);
  } catch (error) {
    next(error);
  }
});

// get all inventory:
router.get('/productInventories', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['admin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }

    const productInventories = await findAllProductInventories();
    res.status(200).json(productInventories);
  } catch (error) {
    next(error);
  }
});

// Create inventory
// router.post('/productInventory', isAuth, async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // check role:
//     const payload = req.payload;
//     if (!['admin'].includes(payload.Role)) {
//       res.status(401);
//       throw new Error('🚫User is Un-Authorized 🚫');
//     }
//     const { quantity } = req.body;
//     const userId = payload.userId;
//     const admin = await findAdminByUserId(+userId);
//     const productInventoryData = {
//       quantity,
//       createByAdminId: admin.id,
//       modified_at: null,
//     } as ProductInventory;

//     const productInventory = await createProductInventory(productInventoryData);
//     res.json(productInventory);
//   } catch (error) {
//     next(error);
//   }
// });

// Update productInventory:
router.put('/productInventory/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['admin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }
    const { quantity } = req.body;
    const userId = payload.userId;
    const admin = await findAdminByUserId(+userId);
    const productInventoryData = {
      quantity,
      modifiedByAdminId: admin.id,
    } as ProductInventory;

    const id = req.params.id;
    const productInventory = await updateProductInventoryById(+id, productInventoryData);
    res.json({ productInventory });
  } catch (error) {
    next(error);
  }
});

export default router;
