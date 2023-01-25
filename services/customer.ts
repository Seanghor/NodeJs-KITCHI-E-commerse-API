import { Address, Customer, RoleEnumType, User } from '@prisma/client';
import { CustomerRegister } from '../interfaces';
import { prisma } from '../prisma/db';
import { createAddress, findAddressByCustomerId, updateAddressById } from './address';
import bcrypt from 'bcrypt';
import { createUserDataByEmailAndPassword, findUserByEmail, findUserById, findUserByPhone, updateUserDataById } from './user';

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

  // 1- create user:
  const userData = {
    username: customer.username,
    email: customer.email,
    password: customer.password,
    phone: customer.phone,
    Role: RoleEnumType.customer,
  } as User;
  const user = await createUserDataByEmailAndPassword(userData);

  // 2 -create customer
  const customerData = {
    username: user.username,
    email: user.email,
    phone: user.phone,
    userId: user.id,
  } as Customer;
  const newCustomer = await prisma.customer.create({
    data: customerData,
  });

  // 3 -create address:
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

const updateCustomerProfileById = async (id, customer: CustomerRegister, confirmPassword: string) => {
  const existingCustomer = await findCustomerById(+id);
  const existingEmail = await findUserByEmail(customer.email);

  // check duplicate email
  if (existingEmail && existingCustomer.email !== customer.email) {
    throw new Error('Eamil already exist ...');
  }

  // check duplicate phone
  const existingPhone = await findUserByPhone(customer.phone);
  if (existingPhone && existingCustomer.phone !== customer.phone) {
    throw new Error('Phone already exist ...');
  }

  // veryfy password:
  const userId = existingCustomer.userId;
  const user = await findUserById(+userId);
  const password = user.password;

  const validPassword = await await bcrypt.compare(confirmPassword, password);
  if (!validPassword) {
    throw new Error('Incorrect password ...');
  }

  // 1 -update User:
  const userData = {
    username: customer.username,
    email: customer.email,
    phone: customer.phone,
  } as User;
  const newUser = await updateUserDataById(+userId, userData);

  // 2 - update Customer
  const customerData = {
    username: newUser.username,
    email: newUser.email,
    phone: newUser.phone,
  } as Customer;
  const newCustomer = await prisma.customer.update({
    where: {
      id,
    },
    data: customerData,
  });

  // 3 -update Address:
  const addressData = {
    work: customer.work,
    street: customer.street,
    zipcode: customer.zipcode,
    city: customer.city,
    province: customer.province,
  } as Address;

  const address = await findAddressByCustomerId(+id);
  const addressId = address.id;
  const newAddress = await updateAddressById(+addressId, addressData);

  const profile = {
    username: newCustomer.username,
    email: newCustomer.email,
    password: newUser.password,
    phone: newCustomer.phone,
    Role: newUser.Role,
    work: newAddress.work,
    street: newAddress.street,
    zipcode: newAddress.zipcode,
    city: newAddress.city,
    province: newAddress.province,
  } as CustomerRegister;

  return profile;
};

const findCustomerById = async (id) => {
  const customer = await prisma.customer.findUnique({
    where: {
      id,
    },
  });
  if (!customer) {
    throw new Error('Bad request, customer not found');
  }
  return customer;
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

const findCustomerByUserId = async (userId: number) => {
  return await prisma.customer.findUnique({
    where: {
      userId,
    },
  });
};
export { createCustomer, findCustomerByUserId, updateCustomerProfileById, findCustomerById, findCustomerByEmail, findCustomerByPhone };
