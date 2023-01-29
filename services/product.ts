import { Product, ProductInventory } from '@prisma/client';
import { ProductCreateInput, ProductOutput } from '../interfaces';
import { prisma } from '../prisma/db';
import { findDiscountById } from './discount';
import { findProductCategoryDataById } from './productCategory';
import { createProductInventory, updateProductInventoryById } from './productInventory';

// ----------------- Create
const createProduct = async (product: ProductCreateInput) => {
  // check name
  const existingName = await findProductByName(product.name);
  if (existingName) {
    throw new Error('Bad request, name alreaady exist ...');
  }

  // check profile:
  

  // check Category:
  const existingCategoryId = await findProductCategoryDataById(product.category_id);
  if (!existingCategoryId) {
    throw new Error('Bad request, CategoryId is not avialble ...');
  }

  // check discount:
  const existingDiscount = await findDiscountById(product.discount_id);
  if (!existingDiscount) {
    throw new Error('Bad request, DiscountId is not avialble ...');
  }

  // create Inventory
  const inventoryData = {
    quantity: product.quantity,
    createByAdminId: product.createByAdminId,
    modified_at: null,
  } as ProductInventory;
  const inventoryOfProduct = await createProductInventory(inventoryData);

  // handle discount
  let discountPrice;
  if (product.discount_active === Boolean(false)) {
    discountPrice = product.price;
  } else {
    if (!product.discount_id) {
      discountPrice = product.price;
    } else {
      const discount = await findDiscountById(+product.discount_id);
      const discountPercent = discount.discount_percent;
      discountPrice = (Number(product.price) / 100) * (100 - discountPercent);
    }
  }
  // create product:
  const productData = {
    name: product.name,
    profile: product.profile,
    images: product.images,
    rating:product.rating,
    description: product.description,
    category_id: product.category_id,
    discount_id: product.discount_id,
    discount_active: product.discount_active,
    price: product.price,
    discount_price: discountPrice,
    inventoryId: inventoryOfProduct.id,
    createByAdminId: inventoryOfProduct.createByAdminId,
    modified_at: null,
  } as Product;
  const productD = await prisma.product.create({
    data: productData,
  });

  return productD;
};

// ---- Find
const findProductByName = async (name: string) => {
  return await prisma.product.findUnique({
    where: {
      name,
    },
  });
};

const getProductById = async (id) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      profile: true,
      images: true,
      rating:true,
      description: true,
      ProductCategory: {
        select: {
          name: true,
        },
      },
      Discount: {
        select: {
          discount_percent: true,
        },
      },
      discount_active: true,
      price: true,
      discount_price: true,
      Inventory: {
        select: {
          quantity: true,
        },
      },
    },
  });
  if (!product) {
    throw new Error('Bad request, product not found with the ID ...');
  }

  const productData = {
    id: product.id,
    name: product.name,
    profile: product.profile,
    images: product.images,
    description: product.description,
    rating:product.rating,
    category: product.ProductCategory.name,
    discount_percent: product.Discount.discount_percent,
    discount_active: product.discount_active,
    price: product.price,
    discount_price: product.discount_price,
    quantity: product.Inventory.quantity,
  } as ProductOutput;
  return productData;
};

const findAllProduct = async () => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      rating: true,
      profile: true,
      images: true,
      description: true,
      ProductCategory: {
        select: {
          name: true,
        },
      },
      Discount: {
        select: {
          discount_percent: true,
        },
      },
      discount_active: true,
      price: true,
      discount_price: true,
      Inventory: {
        select: {
          quantity: true,
        },
      },
    },
  });

  const allProducts: ProductOutput[] = [];
  products.forEach((data) => {
    allProducts.push({
      id: data.id,
      name: data.name,
      profile: data.profile,
      images: data.images,
      description: data.description,
      rating: data.rating,
      category: data.ProductCategory.name,
      discount_percent: data.Discount.discount_percent,
      discount_active: data.discount_active,
      price: data.price,
      discount_price: data.discount_price,
      quantity: data.Inventory.quantity,
    });
  });
  return allProducts;
};

const findProductDataById = async (id) => {
  return await prisma.product.findUnique({
    where: {
      id,
    },
  });
};

// ------------------- Update
const updateProductById = async (id, product: ProductCreateInput) => {
  const existingProduct = await findProductDataById(+id);
  if (!existingProduct) {
    throw new Error('Bad request, Id not found ...');
  }
  // check name
  const existingName = await findProductByName(product.name);
  if (existingName && existingProduct.name !== product.name) {
    throw new Error('Bad request, name alreaady exist ...');
  }

  // check Category:
  const existingCategoryId = await findProductCategoryDataById(product.category_id);
  if (!existingCategoryId) {
    throw new Error('Bad request, CategoryId is not avialble ...');
  }

  // check discount:
  const existingDiscount = await findDiscountById(product.discount_id);
  if (!existingDiscount) {
    throw new Error('Bad request, DiscountId is not avialble ...');
  }

  // update Inventory
  const inventoryData = {
    quantity: product.quantity,
    modifiedByAdminId: product.modifiedByIdminId,
  } as ProductInventory;
  const inventoryId = existingProduct.inventoryId;
  const inventoryOfProduct = await updateProductInventoryById(+inventoryId, inventoryData);

  // handle discount
  let discountPrice;
  if (product.discount_active === Boolean(false)) {
    discountPrice = product.price;
  } else {
    if (!product.discount_id) {
      discountPrice = product.price;
    } else {
      const discount = await findDiscountById(+product.discount_id);
      const discountPercent = discount.discount_percent;
      discountPrice = (Number(product.price) / 100) * (100 - discountPercent);
    }
  }
  // create product:
  const productData = {
    name: product.name,
    description: product.description,
    category_id: product.category_id,
    discount_id: product.discount_id,
    discount_active: product.discount_active,
    price: product.price,
    discount_price: discountPrice,
    modifiedByAdminId: inventoryOfProduct.modifiedByAdminId,
  } as Product;
  const productD = await prisma.product.update({
    where: {
      id,
    },
    data: productData,
  });
  return productD;
};

// ----- Delete
const deleteProductById = async (id) => {
  return await prisma.product.delete({
    where: {
      id,
    },
  });
};

export { createProduct, findProductByName, findProductDataById, updateProductById, getProductById, findAllProduct, deleteProductById };
