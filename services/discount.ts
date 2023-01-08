import { prisma } from '../prisma/db';

const findDiscountById = async (id) => {
  return await prisma.discount.findUnique({
    where: {
      id,
    },
  });
};

const findDiscountByPer = async (per) => {
    return await prisma.discount.findUnique({
        where: {
         discount_percent: per
     }
 })
}
export { findDiscountById, findDiscountByPer };
