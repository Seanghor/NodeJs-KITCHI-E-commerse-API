// import { prisma } from '../prisma/db';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const findCustomerById = async (id: number) => {
  return await prisma.customer.findUnique({
    where: {
      id: id,
    },
  });
};

export { findCustomerById };
