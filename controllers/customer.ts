import { Address, Customer, User } from '@prisma/client';
import express, { NextFunction, Request, Response, Router } from 'express';
const router: Router = express.Router();
import { isAuth } from '../middlewares/auth';
import { createAddress } from '../services/address';
import { createCustomer, findCustomerByEmail, findCustomerByPhone } from '../services/customer';
import { createUserByEmailAndPassword } from '../services/user';

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, email, password, phone, work, street, zipcode, city, province} = req.body;
    if (!username || !email || !password || !phone || !street || !zipcode || !city || !province || !work) {
      res.status(400);
      throw new Error('❌ Bad request ...');
    }

    // check existing email:
    const existingEmail = await findCustomerByEmail(email);
    const existingPhone = await findCustomerByPhone(phone);
    if (existingEmail || existingPhone) {
      res.status(400);
      throw new Error('Eamil or Phone is already exist ...');
    }

    // 1 --create User
    const userData = {
      username,
      email,
      password,
      phone,
    } as User;
    const user = await createUserByEmailAndPassword(userData);

    // 2 --create customer
    const customerData = {
      username,
      email,
      phone,
      userId: user.id
    } as Customer
    const customer = await createCustomer(customerData)
 
    // 3 --create address
    const addressData = {
      customerId: customer.id,
      work,
      street,
      zipcode,
      city,
      province
    } as Address

    await createAddress(addressData)
    res.status(200).json({msg: "1 registered ..."})
  } catch (error) {
    next(error);
  }
});
export default router;
