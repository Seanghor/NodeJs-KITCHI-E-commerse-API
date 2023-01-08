import { Decimal } from "@prisma/client/runtime"

const findPriceDiscount= async (price, per) => {
    const discountPrice = (price/100) * (100 - per)
    return discountPrice
}

export { findPriceDiscount }