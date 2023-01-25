import { Cart_item } from '@prisma/client';
import express, { NextFunction, Request, Response, Router } from 'express';
const router: Router = express.Router();
import { isAuth } from '../middlewares/auth';
import { createCartItem, deleteCartItem, findCartItem, getAllCartitem, updateCartItem } from '../services/cartItem';
import { findCustomerByUserId } from '../services/customer';

router.post('/cartItem', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['customer'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }

    const { product_id, quantity } = req.body;
    if (!product_id || !quantity) {
      res.status(400);
      throw new Error('Bad request ...');
    }
    const userId = payload.userId;
    const customer = await findCustomerByUserId(+userId);
    const cartItemData = {
      customerId: customer.id,
      product_id,
      quantity,
    } as Cart_item;
    const cartItem = await createCartItem(cartItemData);
    res.json({ cartItem });
  } catch (error) {
    next(error);
  }
});

// delete cartItem:
router.delete('/cartItem/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['customer'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }

    const id = req.params.id;
    const cartitem = await deleteCartItem(+id);
    res.json({ cartitem });
  } catch (error) {
    next(error);
  }
});

// update Cart Item:
router.put('/cartItem/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['customer'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }

    const { quantity } = req.body;
    if (!quantity) {
      res.status(400);
      throw new Error('Bad request ...');
    }
    const id = req.params.id;
    const cartItemData = {
      quantity,
    } as Cart_item;

    const newCartItem = await updateCartItem(+id, cartItemData);
    res.json({ newCartItem });
  } catch (error) {
    next(error);
  }
});

// find CartItem by Id
router.get('/cartItem/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['customer'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }

    const id = req.params.id;
    const cartItem = await findCartItem(+id);
    res.json({ cartItem });
  } catch (error) {
    next(error);
  }
});

// get All CartItem:
router.get('/cartItems', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['customer'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }
    const allCartItems = await getAllCartitem();
    res.json({ allCartItems });
  } catch (error) {
    next(error);
  }
});
export default router;
