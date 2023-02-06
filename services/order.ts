import { prisma } from '../prisma/db';
import { Cart_item, Address } from '@prisma/client';
import { CustomerOrder, GetCustomerOrder } from '../interfaces';

const customerOrder = async (order: CustomerOrder) => {
  const arressData = {
    customerId: order.customerId,
    work: order.work,
    street: order.street,
    zipcode: order.zipcode,
    city: order.city,
    province: order.province,
  } as Address;
  const address = await prisma.address.create({
    data: arressData,
  });
  console.log('=========== 1 ===============');

  const cartItemData = {
    customerId: order.customerId,
    address_id: address.id,
    productId: Number(order.productId),
    quantity: order.quantity,
  } as Cart_item;

  const cartItem = await prisma.cart_item.create({
    data: cartItemData,
  });
  console.log('============== 2 ===============');

  const orderInfo = {
    id: cartItem.id,
    customerId: cartItem.customerId,
    productId: cartItem.productId,
    quantity: cartItem.quantity,
    work: address.work,
    street: address.street,
    zipcode: address.zipcode,
    city: address.city,
    province: address.province,
  } as GetCustomerOrder;

  return orderInfo;
};

const findAllOrder = async (customerId: number) => {
  return await prisma.cart_item.findMany({
    where: {
      customerId,
    },
  });
};

const deleteOrderProduct = async (productId: number) => {
  return await prisma.cart_item.delete({
    where: {
      productId,
    },
  });
};

const updateOrderProduct = async (productId: number, cartItem: Cart_item) => {
  return await prisma.cart_item.update({
    where: {
      productId,
    },
    data: cartItem,
  });
};

const deleteAll = async (customerId: number) => {
  return await prisma.cart_item.deleteMany({
    where: {
      customerId,
    },
  });
};
export { deleteAll, customerOrder, findAllOrder, deleteOrderProduct, updateOrderProduct };
