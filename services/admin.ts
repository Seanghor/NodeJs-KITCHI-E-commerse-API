import { Admin, RoleEnumType, User } from '@prisma/client';
import { AdminCredentialInput } from '../interfaces';
import { prisma } from '../prisma/db';
import {
  createUserDataByEmailAndPassword,
  deleteUserDataById,
  findUserByEmail,
  findUserByPhone,
  updateUserDataById,
} from './user';

// -------- Create
const createAdminData = async (admin: Admin) => {
  return await prisma.admin.create({
    data: admin,
  });
};

const createAdminAndUser = async (admin: AdminCredentialInput) => {
  const email = admin.email;
  const existingEmail = await findUserByEmail(email);
  if (existingEmail) {
    throw new Error('Email is alrealy exist ...');
  }

  const phone = admin.phone;
  const existingPhone = await findUserByPhone(phone);
  if (existingPhone) {
    throw new Error('Phone is alrealy exist ...');
  }

  // create user:
  const userData = {
    username: admin.username,
    email: admin.username,
    password: admin.password,
    phone: admin.phone,
    Role: RoleEnumType.admin,
  } as User;
  const user = await createUserDataByEmailAndPassword(userData);

  // create Admin:
  const adminData = {
    username: user.username,
    email: user.email,
    phone: user.phone,
    userId: user.id,
  } as Admin;
  const newAdmin = await createAdminData(adminData);
  return newAdmin;
};

// -------- Find
const findAdminDataById = async (id) => {
  return await prisma.admin.findUnique({
    where: {
      id,
    },
  });
};

const findAdminbyData = async (id) => {
  const existingAdmin = await findAdminDataById(+id);
  if (!existingAdmin) {
    throw new Error('Bad request ...');
  }
  return existingAdmin;
};

const findAdminByUserId = async (userId) => {
  return await prisma.admin.findUnique({
    where: {
      userId,
    },
  });
};

const findAllAdmins = async () => {
  return await prisma.admin.findMany();
};

// -------- Upadate
const updateAdminDataById = async (id, admin: Admin) => {
  return await prisma.admin.update({
    where: {
      id,
    },
    data: admin,
  });
};

const updateAdminAndUserById = async (id, admin: AdminCredentialInput) => {
  const existingAdmin = await findAdminDataById(+id);
  if (!existingAdmin) {
    throw new Error('Bad request ...');
  }
  const existingEmail = await findUserByEmail(admin.email);
  const existingPhone = await findUserByPhone(admin.phone);
  if (existingEmail || existingPhone) {
    throw new Error('Email or Phone alrealdy exist ...');
  } 
  
  // update User
  const usernData = {
    username: admin.username,
    email: admin.email,
    password: admin.password,
    phone: admin.phone,
  } as User;

  const userId = existingAdmin.userId
  const newUser = await updateUserDataById(+userId, usernData);

  const adminData = {
    username: newUser.username,
    email: newUser.email,
    phone: newUser.phone
  } as Admin

  const newAdmin = await updateAdminDataById(+id, adminData)
  return newAdmin
};

// ------ Delete
const deleteAdminData = async (id) => {
  return await prisma.admin.delete({
    where: {
      id,
    },
  });
};

const deleteAdminAndUserById = async (id) => {
  const existingAdmin = await findAdminDataById(+id);
  if (!existingAdmin) {
    throw new Error('Bad request ...');
  }
  const userId = existingAdmin.userId;
  // delete User --> Delete admin
  await deleteUserDataById(+userId);
  return existingAdmin;
};

export {
  findAllAdmins,
  findAdminByUserId,
  findAdminbyData,
  createAdminData,
  createAdminAndUser,
  findAdminDataById,
  updateAdminDataById,
  updateAdminAndUserById,
  deleteAdminData,
  deleteAdminAndUserById,
};
