// Seed data to be used in development
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';
const prisma = new PrismaClient();

async function main() {


 
  // Create 7 cate
  const productCategory = await prisma.productCategory.createMany({
    data: [
      {
        name:'Knife',
        description: "Hello kon Papa"
      },
      {
        name:'Teapot',
        description: "Hello kon Papa"
      },
      {
        name:'cookware',
        description: "Hello kon Papa"
      },
      {
        name:'dishwasher',
        description: "Hello kon Papa"
      },
      {
        name:'post',
        description: "Hello kon Papa"
      },
      {
        name:'microwave',
        description: "Hello kon Papa"
      },
      {
        name:'toaster',
        description: "Hello kon Papa"
      },
      
    ]
  });

  console.table({ productCategory });

  //   Create 25 ProductInventorys
  for (let i = 1; i < 25; i++) {
    const productInventory = await prisma.productInventory.create({
      data: {
        quantity: 15,
      },
    });
    console.table({ productInventory });
  };

  // create discount
  var x = 0.05
  for (let i = 1; i < 5; i++) {
    const discount = await prisma.discount.create({
      data: {
        name: `event ${i}`,
        description: " ",
        discount_percent: x
      }
    });
    x = x + 0.05
    console.table({ discount });
  };

  //   Create 50 products
  for (let i = 1; i < 50; i++) {
    const product = await prisma.product.create({
      data: {
        name: `product ${i}`,
        description: "kit transforming your better life",
        categogry_id: 1,
        inventory_id: 2,
        price: 35,
        discount_id: 3,
      },
    });
    console.table({ product });
  };
  
  // Create 30 users
  for (let i = 1; i < 30; i++) {
    //   Create student User
    const user = await prisma.user.create({
      data: {
        firstName: `user${i}`,
        lastName: `test${i}`,
        email: `user${i}@test.com`,
        password: await hash('password', 12),
        role: 'customer',
        phoneNumber: "0967827922"
      },
    });
    console.table({ user });
   
  //  create message
  const message = await prisma.messages.create({
    data: {
      user_id: user.id,
      email: user.email,
      subject: `subject ${i}`,
      message: `message ${i}`,
    },
  });
  console.table({ message });

  // create address
  const address = await prisma.address.create({
    data: {
      user_id: user.id,
      companyName: `Company ${i}`,
      street: 100+i,
      zipecode: 200+i,
      city: `City ${i}`,
      province: `province ${i}`,
      country: 'Cambodia'
    },
  });
  console.table({ address });

  // create userPayment
  const userPayment = await prisma.userPayment.create({
    data: {
      user_id: user.id,
      paymentType: 'card',
      provider: 'ABA',
      account_no: `0099999000 ${i}`,
      expiry: '3020-01-01T00:00:00.000Z'
    }
  });
  console.table({ userPayment });

  // create shoppingSession
  const shoppingSession = await prisma.shoppingSession.create({
    data: {
      user_id: user.id,
      total: 100 + i,
    }
  });
  console.table({ shoppingSession });

  // create paymentDetails
  const paymentDetails = await prisma.paymentDetails.create({
    data: {
      order_id: user.id,
      amount: 175,
      provider: "ABA",
    }
  });
  console.table({ paymentDetails });

  // create orderDetails
  const orderDetails = await prisma.orderDetails.create({
    data: {
      user_id: user.id,
      total: 100 + i,
      payment_id: paymentDetails.id
    }
  });
  console.table({ orderDetails });

  // create orderItem
  const orderItem= await prisma.orderItem.create({
    data: {
      order_id: user.id,
      product_id: paymentDetails.id,
      quantity: 3
    }
  });
  console.table({ orderItem });
};
}

main();
