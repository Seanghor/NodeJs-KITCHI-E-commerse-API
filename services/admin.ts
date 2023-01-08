import { Admin } from '@prisma/client';
import { prisma } from '../prisma/db';

const createAdmin = async (admin: Admin) => {
  return await prisma.admin.create({
    data: admin,
  });
};

const findAdminById = async (id) => {
  return await prisma.admin.findUnique({
    where: {
      id,
    },
  });
};

const updateAdminById = async (id, admin: Admin) => {
  return await prisma.admin.update({
    where: {
      id,
    },
    data: admin,
  });
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
export { findAllAdmins, createAdmin, findAdminById, updateAdminById, findAdminByUserId };
