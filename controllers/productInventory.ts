import express, { NextFunction, Request, Response, Router } from 'express';
const router: Router = express.Router();
import { isAuth } from '../middlewares/auth';
import { deletProductInventoryById, findAllProductInventories, findProductInventoryById } from '../services/productInventory';

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
    await deletProductInventoryById(+id);
    res.status(200).json({ msg: '1 productInventory deleted ...' });
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
    if (!singleInventory) {
      res.status(400);
      throw new Error('❌ Bad request...');
    }
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

    const productInventories = await findAllProductInventories()
    res.status(200).json(productInventories)
  } catch (error) {
    next(error);
  }
});

export default router;
