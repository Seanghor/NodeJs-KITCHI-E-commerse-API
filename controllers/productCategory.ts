import express, { NextFunction, Request, Response, Router } from 'express';
const router: Router = express.Router();
import { isAuth } from '../middlewares/auth';

// update inventory by ProductId
// *** id of product: not id of inventory
router.put('/productinventory/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (error) {
        next(Error)
    }
})

export default router;