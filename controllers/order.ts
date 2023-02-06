import { RoleEnumType, Customer, Cart_item } from '@prisma/client';
import express, { NextFunction, Request, Response, Router } from 'express';
import { CustomerOrder, CustomerRegister } from '../interfaces';
import { isAuth } from '../middlewares/auth';
import { findCustomerByUserId } from '../services/customer';
import { customerOrder } from '../services/order';
const router: Router = express.Router();

router.post('/order', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['customer'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }
    const {  productId, quantity, work, street, zipcode, city, province } = req.body;
    if (!work || !street || !zipcode || !city || !province) {
      res.status(400);
      throw new Error('Please fill in ur address');
    }


    const userId = payload.userId;
    const customer = await findCustomerByUserId(+userId);
    const customerId = customer.id
    console.log(customer);
    
    const orderData = {
      customerId: customerId,
      productId,
      quantity,
      work,
      street,
      zipcode,
      city,
      province,
    } as CustomerOrder;

  
    const order = await customerOrder(orderData)
    res.json({order})
  } catch (error) {
    next(error);
  }
});
export default router;
