import { Product } from '@prisma/client';
import { prisma } from '../prisma/db';

const createProduct = async (product: Product) => {
  return await prisma.product.create({
    data: product,
  });
};

const findProductByName = async (name: string) => {
  return await prisma.product.findUnique({
    where: {
      name,
    },
  });
};

const findProductById = async (id) => {
  return await prisma.product.findUnique({
    where: {
      id,
    },
  });
};

const updateProductById = async (id, product: Product) => {
  return await prisma.product.update({
    where: {
      id,
    },
    data: product,
  });
};

const deleteProductById = async (id) => {
  return await prisma.product.delete({
    where: {
      id,
    },
  });
};


const findManyProductBy_CategoryId = async (id) => {
  return await prisma.product.findMany({
    where: {
      category_id: id
    }
  })
}
export { createProduct, findProductByName, updateProductById, findProductById, deleteProductById, findManyProductBy_CategoryId };
