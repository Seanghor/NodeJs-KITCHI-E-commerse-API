import { RoleEnumType } from '@prisma/client';
import express, { NextFunction, Request, Response, Router } from 'express';
import { CustomerRegister } from '../interfaces';
import { isAuth } from '../middlewares/auth';
const router: Router = express.Router();
import { createCustomer, findCustomerByUserId, getprofile, updateCustomerProfileById } from '../services/customer';

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password, phone, work, street, zipcode, city, province } = req.body;
    if (!username || !email || !password || !phone || !street || !zipcode || !city || !province || !work) {
      res.status(400);
      throw new Error('❌ Bad request ...');
    }
    const customerData = {
      username,
      email,
      password,
      phone,
      Role: RoleEnumType.customer,
      work,
      street,
      zipcode,
      city,
      province,
    } as CustomerRegister;
    const customer = await createCustomer(customerData);
    res.json({ customer });
  } catch (error) {
    next(error);
  }
});

// get own profile
router.get('/profile', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.payload;
    switch (payload.Role) {
      case RoleEnumType.customer:
        const payload = req.payload;
        const profile = await getprofile(payload.userId);
        res.json({ profile });
        break;
      default:
        res.status(401);
        throw new Error('🚫User is Un-Authorized 🚫');
        break;
    }
  } catch (error) {
    next(error);
  }
});

// update own profile:
router.put('/profile', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.payload;
    const userId = payload.userId;
    switch (payload.Role) {
      case RoleEnumType.customer:
        const { username, email, phone, work, street, zipcode, city, province, confirmPassword } = req.body;
        if (!username || !email || !phone || !street || !zipcode || !city || !province || !work) {
          res.status(400);
          throw new Error('username, email, phone, work, street, zipecode, city and province cant invalid ...');
        }

        const customerData = {
          username,
          email,
          phone,
        } as CustomerRegister;

        const customer = await findCustomerByUserId(+userId);
        const customerId = customer.id;
        const newprofile = await updateCustomerProfileById(+customerId, customerData, confirmPassword);
        res.json({ newprofile });
        break;
      default:
        res.status(401);
        throw new Error('🚫User is Un-Authorized 🚫');
        break;
    }
  } catch (error) {
    next(error);
  }
});
export default router;
