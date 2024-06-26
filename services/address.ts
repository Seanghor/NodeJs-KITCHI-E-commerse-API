import { Address } from '@prisma/client';
import { prisma } from '../prisma/db';

const findAddressById = async (id) => {
  return await prisma.address.findUnique({
    where: {
      id,
    },
  });
};

const findAddressByCustomerId = async (customerId: number) => {
  return await prisma.address.findFirst({
    where: {
      customerId,
    },
  });
};

const createAddress = async (address: Address) => {
  return await prisma.address.create({
    data: address,
  });
};

const updateAddressById = async (id, address: Address) => {
  return await prisma.address.update({
    where: {
      id,
    },
    data: address,
  });
};

export { findAddressById, findAddressByCustomerId, createAddress, updateAddressById };
