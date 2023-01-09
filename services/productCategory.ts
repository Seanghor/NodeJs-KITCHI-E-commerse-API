import { ProductCategory } from '@prisma/client';
import { prisma } from '../prisma/db';

const findProductCategoryById = async (id) => {
  return await prisma.productCategory.findUnique({
    where: {
      id,
    },
  });
};

const getOneCategoryIncludeProducts_ByCategoryId = async (id) => {
  return await prisma.productCategory.findUnique({
    where: {
      id,
    },
    include: {
      Product: true,
    },
  });
};

const getAllCategoryIncludeProducts = async () => {
  return await prisma.productCategory.findMany({
    include: {
      Product: true,
    },
  });
};
const findAllProductCategory = async () => {
  return await prisma.productCategory.findMany();
};

const updateProductCategoryById = async (id, productCategory: ProductCategory) => {
  return await prisma.productCategory.update({
    where: {
      id,
    },
    data: productCategory,
  });
};

const deleteProductCategoryById = async (id) => {
  return await prisma.productCategory.delete({
    where: {
      id,
    },
  });
};

const createProductCategory = async (productCategory: ProductCategory) => {
  return await prisma.productCategory.create({
    data: productCategory,
  });
};

const findProductCategoryByName = async (name: string) => {
  return await prisma.productCategory.findUnique({
    where: {
      name 
    },
  });
};


export {
  getOneCategoryIncludeProducts_ByCategoryId,
  findProductCategoryById,
  findAllProductCategory,
  updateProductCategoryById,
  deleteProductCategoryById,
  getAllCategoryIncludeProducts,
  createProductCategory,
  findProductCategoryByName,
};
