import { ProductInventory } from '@prisma/client';
import { prisma } from '../prisma/db';

const createProductInventory = async (productInventory: ProductInventory) => {
  return await prisma.productInventory.create({
    data: productInventory,
  });
};

const deletProductInventoryById = async (id) => {
  return await prisma.productInventory.delete({
    where: {
      id,
    },
  });
};

export { createProductInventory, deletProductInventoryById };
