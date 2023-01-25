
import express, { NextFunction, Request, Response, Router } from 'express';
import { AdminCredentialInput } from '../interfaces';
const router: Router = express.Router();
import { isAuth } from '../middlewares/auth';
import { createAdminAndUser, deleteAdminAndUserById, findAdminbyData, findAllAdmins, updateAdminAndUserById} from '../services/admin';


/**
 *
 * @summary get an admin (
 * @route {GET} /admin/:id
 * @auth required
 * @role Super Admin
 * @param {number} id the id of the admin
 * @returns {object} 200 - success response
 * @returns {object} 400 - bad request fail respone
 * @returns {object} 401 - Unauthorized response
 * @example response - 200 - success response subject
 *
 * {
 *	"id": 1,
 *	"username": "Seanghor",
 *	"emain": "seanghor@gmail.com",
 *  "phone" : "09999999999"
 *	"userId": "2"
 * }
 */
router.get('/admin/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['superAdmin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }

    const id = req.params.id;
    const admin = await findAdminbyData(+id);
    res.status(200).json({ admin });
  } catch (error) {
    next(error);
  }
});

/**
 *
 * @summary create an admin
 * @route {POST} /admin
 * @auth required
 * @role superAdmin
 * @param {string} username the username of the admin
 * @param {string} email the email of the admin
 * @param {string} password the password of the admin
 * @param {string} phone the phone of the admin
 * @returns {object} 200 - success response
 * @returns {object} 400 - bad request fail respone
 * @returns {object} 401 - Unauthorized response
 * @example response - 200 - success response subject
 *
 * {
 *	"id": 1,
 *	"username": "Seanghor",
 *	"emain": "seanghor@gmail.com",
 *  "phone" : "09999999999"
 *	"userId": "2"
 * }
 *
 */
router.post('/admin', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['superAdmin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }

    const { username, email, password, phone } = req.body;
    if (!username || !email || !password || !phone) {
      res.status(400);
      throw new Error('You must provide a username, email, password, and phone...');
    }

    const adminData = {
      username,
      email,
      password,
      phone,
    } as AdminCredentialInput;

    const admin = await createAdminAndUser(adminData);
    res.json({ admin });
  } catch (error) {
    next(error);
  }
});

/**
 *
 * @summary delete an admin
 * @route {DELETE} /admin/:id
 * @auth required
 * @role Super Admin
 * @param {number} id the id of the admin
 * @returns {object} 200 - success response
 * @returns {object} 400 - bad request fail respone
 * @returns {object} 401 - Unauthorized response
 * @example response - 200 - success response subject
 *
 * {
 *	"id": 1,
 *	"username": "Seanghor",
 *	"emain": "seanghor@gmail.com",
 *  "phone" : "09999999999"
 *	"userId": "2"
 * }
 */
router.delete('/admin/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['superAdmin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }

    const id = req.params.id;
    const deleteAdmin = await deleteAdminAndUserById(+id);
    res.json(deleteAdmin);
  } catch (error) {
    next(error);
  }
});

/**
 *
 * @summary create an admin
 * @route {POST} /admin
 * @auth required
 * @role superAdmin
 * @param {string} username the username of the admin
 * @param {string} email the email of the admin
 * @param {string} password the password of the admin
 * @param {string} phone the phone of the admin
 * @returns {object} 200 - success response
 * @returns {object} 400 - bad request fail respone
 * @returns {object} 401 - Unauthorized response
 * @example response - 200 - success response subject
 *
 * {
 *	"username": "Seanghor",
 *	"emain": "seanghor@gmail.com",
 *  "phone" : "09999999999"
 *
 * }
 *
 */
router.put('/admin/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.payload;
    // check role:
    if (!['superAdmin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }
    const { username, email, phone, password } = req.body;
    if (!username || !email || !phone || !password) {
      res.status(400);
      throw new Error("Username or email or phone or password can't invalid ...");
    }

    const adminData = {
      username,
      email,
      phone,
      password,
    } as AdminCredentialInput;
    const id = req.params.id
    const newAdmin = await updateAdminAndUserById(+id, adminData)
    res.json({newAdmin})
  } catch (error) {
    next(error);
  }
});

/**
 *
 * @summary create an admin
 * @route {POST} /admin
 * @auth required
 * @role superAdmin
 * @param {string} username the username of the admin
 * @param {string} email the email of the admin
 * @param {string} password the password of the admin
 * @param {string} phone the phone of the admin
 * @returns {object} 200 - success response
 * @returns {object} 400 - bad request fail respone
 * @returns {object} 401 - Unauthorized response
 * @example response - 200 - success response subject
 *
 * {
 *	"id": 1,
 *	"username": "Seanghor",
 *	"emain": "seanghor@gmail.com",
 *  "phone" : "09999999999"
 *	"userId": "2"
 * }
 *
 */
router.get('/admins', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.payload;
    if (!['superAdmin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }

    const admins = await findAllAdmins();
    res.status(200).json(admins);
  } catch (error) {
    next(error);
  }
});

export default router;
