import { Customer } from '@prisma/client';
import { prisma } from '../prisma/db';

const createCustomer = async (cusomer: Customer) => {
  return await prisma.customer.create({
    data: cusomer,
  });
};

const updateCustomerById = async (id, customer: Customer) => {
  return await prisma.customer.update({
    where: {
      id,
    },
    data: customer,
  });
};

const findCustomerById = async (id) => {
  return await prisma.customer.findUnique({
    where: {
      id,
    },
  });
};

const findCustomerByEmail = async (email: string) => {
  return await prisma.customer.findUnique({
    where: {
      email,
    },
  });
};

const findCustomerByPhone = async (phone: string) => {
  return await prisma.customer.findUnique({
    where: {
      phone,
    },
  });
};
export { createCustomer, updateCustomerById, findCustomerById, findCustomerByEmail, findCustomerByPhone};
