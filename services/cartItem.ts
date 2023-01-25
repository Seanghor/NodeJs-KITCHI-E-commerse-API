import { Cart_item } from '@prisma/client';
import { prisma } from '../prisma/db';

const findCartItem = async (id) => {
  return await prisma.cart_item.findUnique({
    where: {
      id,
    },
  });
};
const createCartItem = async (cartItem: Cart_item) => {
  return await prisma.cart_item.create({
    data: cartItem,
  });
};

const deleteCartItem = async (id) => {
  const existingCart = await findCartItem(+id);
  if (!existingCart) {
    throw new Error('bad request, ID not found');
  }
  return await prisma.cart_item.delete({
    where: {
      id,
    },
  });
};

const updateCartItem = async (id, cartItem: Cart_item) => {
  const existingCart = await findCartItem(+id);
  if (!existingCart) {
    throw new Error('bad request, ID not found');
  }
  return await prisma.cart_item.update({
    where: {
      id,
    },
    data: cartItem,
  });
};
const getAllCartitem = async () => {
  return await prisma.cart_item.findMany();
};
export { createCartItem, getAllCartitem, deleteCartItem, updateCartItem, findCartItem };
