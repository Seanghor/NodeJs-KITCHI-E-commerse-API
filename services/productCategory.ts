import { ProductCategory } from '@prisma/client';
import { prisma } from '../prisma/db';

//  ---------- update
const updateProductCategoryById = async (id, productCategory: ProductCategory) => {
  const cate = await findProductCategoryDataById(+id)
  if (!cate) {
    throw new Error('Bad request ...')
  }

  const name = productCategory.name
  const existingName = await findProductCategoryDataByName(name)
  if (existingName) {
    throw new Error('Name already exist ...')
  }

  const newCategory = await prisma.productCategory.update({
    where: {
      id,
    },
    data: productCategory,
  });
  return newCategory
}


// ------ Delete
const deleteProductCategoryDataById = async (id) => {
  return await prisma.productCategory.delete({
    where: {
      id,
    },
  });
};

const deleteCategoryById = async (id) => {
  const cate = await findProductCategoryDataById(+id)
  if (!cate) {
    throw new Error('Bad request ...')
  }
  const deleteCate = await deleteProductCategoryDataById(+id)
  return deleteCate
}




// ----- Create
const createProductcategory = async (productCategory: ProductCategory) => {
  const existingName = await findProductCategoryDataByName(productCategory.name);
  if (existingName) {
    throw new Error('Name is already exist ...');
  }

  const productCate = await prisma.productCategory.create({
    data: productCategory,
  });
  return productCate
};


// ------ find
const findProductCategoryDataById = async (id) => {
  return await prisma.productCategory.findUnique({
    where: {
      id,
    },
  });
};

const findProductCategoryDataByName = async (name: string) => {
  return await prisma.productCategory.findUnique({
    where: {
      name,
    },
  });
};

const getOneCategoryIncludeProducts_ByCategoryId = async (id) => {
  // const productsOfCate =  await prisma.productCategory.findUnique({
  //   where: {
  //     id,
  //   },
  //   include: {
  //     Product: true,
  //   },
  // });
  // return productsOfCate
};

const getAllCategory = async () => {
  return await prisma.productCategory.findMany({
  });
};
const findAllProductCategory = async () => {
  return await prisma.productCategory.findMany();
};

export {
  findProductCategoryDataById,
  findAllProductCategory,
  findProductCategoryDataByName,
  getOneCategoryIncludeProducts_ByCategoryId,
  getAllCategory,
  updateProductCategoryById,
  deleteProductCategoryDataById,
  deleteCategoryById,
  createProductcategory
};
