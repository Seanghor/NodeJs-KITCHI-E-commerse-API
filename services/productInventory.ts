import { ProductInventory } from '@prisma/client';
import { NextFunction } from 'express';
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

const updateProductInventoryById = async (id, productInventory: ProductInventory) => {
  return await prisma.productInventory.update({
    where: {
      id,
    },
    data: productInventory,
  });
};

const findProductInventoryById = async (id) => {
  return await prisma.productInventory.findUnique({
    where: {
      id,
    },
  });
};

const findAllProductInventories = async () => {
  return await prisma.productInventory.findMany({
    include: {
      Product: {
        select: {
          id: true,
          name: true,
          description: true,
          discount_active: true
        }
      }
    }
  })
}

export { findAllProductInventories, findProductInventoryById, createProductInventory, deletProductInventoryById, updateProductInventoryById };
