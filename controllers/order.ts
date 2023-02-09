import { RoleEnumType, Customer, Cart_item } from '@prisma/client';
import express, { NextFunction, Request, Response, Router } from 'express';
import { CustomerOrder, CustomerRegister } from '../interfaces';
import { isAuth } from '../middlewares/auth';
import { findCustomerByUserId } from '../services/customer';
import { customerOrder, deleteAllOrder, deleteOrderProduct, findAllOrder, findOrderById, findOrderByIdAndCustomerId, updateOrderProduct } from '../services/order';
const router: Router = express.Router();

router.post('/order', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['customer'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      res.status(400);
      throw new Error('Please fill in productId, quantity ');
    }
    const userId = payload.userId;
    const customer = await findCustomerByUserId(+userId);
    const customerId = customer.id;
    console.log(customer);

    const orderData = {
      customerId: customerId,
      productId,
      quantity,
    } as Cart_item;
    const order = await customerOrder(orderData);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// Update
router.put('/order/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
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
      throw new Error('Please fill in quantity ');
    }
    const userId = payload.userId;
    const customer = await findCustomerByUserId(+userId);
    const customerId = customer.id;
    const id = req.params.id;

    const orderData = {
      customerId: customerId,
      quantity,
    } as Cart_item;
    const order = await updateOrderProduct(+id, orderData);
    res.json(order);
  } catch (error) {
    next(error);
  }
});

router.get('/orders', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['customer'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }
    const userId = payload.userId;
    const customer = await findCustomerByUserId(+userId);
    const customerId = customer.id;

    const orders = await findAllOrder(+customerId);
    res.json(orders);
  } catch (error) {
    next(error);
  }
});


router.get('/order/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['customer'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }
    const orderId = req.params.id
    const orders = await findOrderById(+orderId);
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get('/order', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['customer'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }
    const { productId } = req.body
    const customer = await findCustomerByUserId(payload.userId)
    const orders = await findOrderByIdAndCustomerId(productId, customer.id);
    res.json(orders);
  } catch (error) {
    next(error);
  }
})


router.delete('/order/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['customer'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }
    const id = req.params.id
    const deleteOrder = await deleteOrderProduct(+id)
    res.json(deleteOrder);
  } catch (error) {
    next(error);
  }
})
export default router;
