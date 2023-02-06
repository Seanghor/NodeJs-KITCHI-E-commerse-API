import { Router } from 'express';
import testController from '../controllers/test';
import authController from '../controllers/auth';
import adminController from '../controllers/admin';
import productInventoryController from '../controllers/productInventory';
import productCategoryController from '../controllers/productCategory';
import customerController from '../controllers/customer';
import cartItemController from '../controllers/cartItem';
import orderController from '../controllers/order';
import productController from '../controllers/product';

const api = Router()
    .use(authController)
    .use(adminController)
    .use(productController)
    .use(productInventoryController)
    .use(productCategoryController)
    .use(customerController)
    .use(cartItemController)
    .use(orderController)
    .use(testController);

export default Router().use('/api', api);
