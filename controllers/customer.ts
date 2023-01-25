import {RoleEnumType} from '@prisma/client';
import express, { NextFunction, Request, Response, Router } from 'express';
import { CustomerRegister } from '../interfaces';
import { isAuth } from '../middlewares/auth';
const router: Router = express.Router();
import { createCustomer} from '../services/customer';


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
    const payload = req.payload
    switch (payload.Role) {
      
    }
  } catch (error) {
    next(error)
  }
})

// update own profile:
router.put('/profile', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.payload
    switch (payload.Role) {
      
    }
  } catch (error) {
    next(error)
  }
})
export default router;
