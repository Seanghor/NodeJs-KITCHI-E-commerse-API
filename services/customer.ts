import { Address, Customer, RoleEnumType, User } from '@prisma/client';
import { CustomerRegister } from '../interfaces';
import { prisma } from '../prisma/db';
import { createAddress } from './address';
import { createUserDataByEmailAndPassword, findUserByEmail, findUserByPhone } from './user';

// ----- Create
const createCustomer = async (customer: CustomerRegister) => {
  const existingEmail = await findUserByEmail(customer.email);
  if (existingEmail) {
    throw new Error('Email is already exist ...');
  }

  const existingPhone = await findUserByPhone(customer.phone);
  if (existingPhone) {
    throw new Error('Phone is already exist ...');
  }

  // create user:
  const userData = {
    username: customer.username,
    email: customer.email,
    password: customer.password,
    phone: customer.phone,
    Role: RoleEnumType.customer,
  } as User;
  const user = await createUserDataByEmailAndPassword(userData);

  // create customer
  const customerData = {
    username: user.username,
    email: user.email,
    phone: user.phone,
    userId: user.id,
  } as Customer;
  const newCustomer = await prisma.customer.create({
    data: customerData,
  });

  // create address:
  const addressData = {
    customerId: newCustomer.id,
    work: customer.work,
    street: customer.street,
    zipcode: customer.zipcode,
    city: customer.city,
    province: customer.province,
  } as Address;
  await createAddress(addressData);
  return newCustomer;
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
export { createCustomer, updateCustomerById, findCustomerById, findCustomerByEmail, findCustomerByPhone };
