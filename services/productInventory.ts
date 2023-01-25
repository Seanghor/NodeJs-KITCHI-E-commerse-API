import { ProductInventory } from '@prisma/client';
import { prisma } from '../prisma/db';

// ------- Create
const createProductInventory = async (productInventory: ProductInventory) => {
  return await prisma.productInventory.create({
    data: productInventory,
  });
};


//  ------ Update
const updateProductInventoryById = async (id, productInventory: ProductInventory) => {
  const existingInventory = await findProductInventoryById(+id)
  if (!existingInventory) {
    throw new Error('Bad request ...')
  }
  return await prisma.productInventory.update({
    where: {
      id,
    },
    data: productInventory,
  });
};

// ------- Delete
const deletProductInventoryById = async (id) => {
  const existingInventory = await findProductInventoryById(+id)
  if (!existingInventory) {
    throw new Error('Bad request ...')
  }
  return await prisma.productInventory.delete({
    where: {
      id,
    },
  });
};

//  ---- Find
const findProductInventoryExisting = async (id) => {
  return await prisma.productInventory.findUnique({
    where: {
      id
    }
  })
}

const findProductInventoryById = async (id) => {
  const existingInventory = await findProductInventoryExisting(+id)
  if (!existingInventory) {
    throw new Error('Bad request ...')
  }
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

export { findAllProductInventories, findProductInventoryExisting,findProductInventoryById, createProductInventory, deletProductInventoryById, updateProductInventoryById };
