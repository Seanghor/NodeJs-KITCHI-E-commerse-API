import { User } from '@prisma/client';
import { prisma } from '../prisma/db';
import bcrypt from 'bcrypt';

const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

const findUserByPhone = async (phone: string) => {
  return await prisma.user.findUnique({
    where: {
      phone,
    },
  });
};

const createUserDataByEmailAndPassword = async (user: User) => {
  user.password = bcrypt.hashSync(user.password, 12);
  return await prisma.user.create({
    data: user,
  });
};

const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

const deleteUserDataById = async (id) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};

const updateUserDataById = async (id, user: User) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: user,
  });
};

export { findUserByEmail, findUserByPhone, createUserDataByEmailAndPassword, findUserById, deleteUserDataById, updateUserDataById };
