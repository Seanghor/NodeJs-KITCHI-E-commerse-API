import { Admin, User } from '@prisma/client';
import express, { NextFunction, Request, Response, Router } from 'express';
const router: Router = express.Router();
import { isAuth } from '../middlewares/auth';
import { createAdmin, findAdminById, findAllAdmins, updateAdminById } from '../services/admin';
import { createUserByEmailAndPassword, deleteUserById, findUserByEmail, findUserByPhone, updateUserById } from '../services/user';

/**
 *
 * @summary create an admin by ID (
 * @route {POST} /admin
 * @auth required
 * @param {number} id the id of the attendance
 * @returns {object} 200 - success response
 * @returns {object} 400 - bad request fail respone
 * @returns {object} 401 - Unauthorized response
 * @example response - 200 - success response subject
 *
 * {
 *	"id": 2,
 *	"date": "2022-12-28T08:20:13.584Z",
 *	"status": null,
 *	"attendanceType": "present",
 *	"teacherId": 2,
 *	"subjectId": 3,
 *	"schoolId": 1,
 *	"studentId": 2
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
    const admin = await findAdminById(+id);
    res.status(200).json(admin);
  } catch (error) {
    next(error);
  }
});

/**
 *
 * @summary create an admin
 * @route {POST} /admin
 * @auth required
 * @param {number} id the id of the attendance
 * @returns {object} 200 - success response
 * @returns {object} 400 - bad request fail respone
 * @returns {object} 401 - Unauthorized response
 * @example response - 200 - success response subject
 *
 * {
 *	"id": 2,
 *	"date": "2022-12-28T08:20:13.584Z",
 *	"status": null,
 *	"attendanceType": "present",
 *	"teacherId": 2,
 *	"subjectId": 3,
 *	"schoolId": 1,
 *	"studentId": 2
 * }
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

    // checking phone already exist or not:
    const existingEmail = await findUserByEmail(email);
    if (existingEmail) {
      res.status(400);
      throw new Error('Email is alrealy in used ...');
    }
    const existingPhone = await findUserByPhone(phone);
    if (existingPhone) {
      res.status(400);
      throw new Error('Phone is alrealy in used ...');
    }
    const userData = {
      username,
      email,
      password,
      phone,
      Role: 'admin',
    } as User;
    // create user:
    const user = await createUserByEmailAndPassword(userData);

    // Validate input:
    const adminData = {
      username: user.username,
      email: user.email,
      phone: user.phone,
      userId: user.id,
    } as Admin;
    // create admin:
    await createAdmin(adminData);
    res.status(200).json({ msg: '1 admin created ...' });
  } catch (error) {
    next(error);
  }
});

// delete admin by Id:
router.delete('/admin/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['superAdmin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }

    const adminId = req.params.id;
    const admin = await findAdminById(+adminId);

    const userId = admin.userId;
    await deleteUserById(+userId);
    res.status(200).json({ msg: '1 admin deleted successfull ...' });
  } catch (error) {
    next(error);
  }
});

// update admin:
router.put('/admin/:id', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // check role:
    const payload = req.payload;
    if (!['superAdmin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }

    const adminId = req.params.id;
    const { username, phone } = req.body;
    if (!username || !phone) {
      res.status(400);
      throw new Error('username and phone cannot invalid ....');
    }

    // check existing phone
    const existingPhone = await findUserByPhone(phone)
    if (existingPhone) {
      res.status(400);
      throw new Error('This phoneNumber is already in used ...');
    }
    
    const admin = await findAdminById(+adminId);
    const userId = admin.userId;

    // 1-update user:
    const updateUserData = {
      username,
      phone
    } as User;
    await updateUserById(+userId, updateUserData);

    // update admin:
    const updateAdminData = {
      username,
      phone
    } as Admin
    await updateAdminById(+adminId, updateAdminData)
    res.status(200).json({ msg: '1 admin updated successfull ...' });
  } catch (error) {
    next(error);
  }
});

// get all admin:
router.get('/admins', isAuth, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.payload;
    if (!['superAdmin'].includes(payload.Role)) {
      res.status(401);
      throw new Error('🚫User is Un-Authorized 🚫');
    }

    const admins = await findAllAdmins()
    res.status(200).json(admins)

  } catch (error) {
    next(error)
  }
})

export default router;
