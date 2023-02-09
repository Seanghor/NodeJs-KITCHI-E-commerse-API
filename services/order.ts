import { prisma } from '../prisma/db';
import { Cart_item, Address } from '@prisma/client';
import { CustomerOrder, GetCustomerOrder } from '../interfaces';
import { findProductDataById } from './product';
import { Decimal } from '@prisma/client/runtime';

const customerOrder = async (order: Cart_item) => {
  const product = await findProductDataById(+order.productId);
  const proPrice = product.discount_price;
  const totalPrice = order.quantity * Number(proPrice);
  const orderData = {
    customerId: order.customerId,
    productId: order.productId,
    quantity: order.quantity,
    total_price: new Decimal(totalPrice),
    deal: order.deal,
  } as Cart_item;

  return await prisma.cart_item.create({
    data: orderData,
  });
};

const findAllOrder = async (customerId: number) => {
  return await prisma.cart_item.findMany({
    where: {
      customerId,
    },
  });
};

const deleteOrderProduct = async (id) => {
  return await prisma.cart_item.delete({
    where: {
      id,
    },
  });
};

const updateOrderProduct = async (id, cartItem: Cart_item) => {
  const quantity = cartItem.quantity;
  const product = await findProductDataById(cartItem.productId);
  const totalPrice = quantity * Number(product.price);
  const orderData = {
    quantity: cartItem.quantity,
    total_price: new Decimal(totalPrice),
  } as Cart_item;

  return await prisma.cart_item.update({
    where: {
      id,
    },
    data: orderData,
  });
};

const findOrderById = async (id) => {
  return await prisma.cart_item.findUnique({
    where: {
      id,
    },
  });
};

const findOrderByIdAndCustomerId = async (productId: number, customerId: number) => {
  return await prisma.cart_item.findUnique({
    where: {
      customerId_productId: { productId, customerId },
    },
  });
};
const deleteAllOrder = async (id) => {
  return await prisma.cart_item.deleteMany({
    where: {
      id,
    },
  });
};
export { findOrderByIdAndCustomerId, deleteAllOrder, findOrderById, customerOrder, findAllOrder, deleteOrderProduct, updateOrderProduct };
