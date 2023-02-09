// Seed data to be used in development
import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { hash } from 'bcrypt';
import { ProductInventory } from '@prisma/client';
import { Product } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // create superAdmin
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }
  const superAdmin = await prisma.superAdmin.create({
    data: {
      username: 'super admin',
      email: `superadmin@test.com`,
      phone: '0967827020',
      description: 'first superAdmin',
    },
  });
  await prisma.user.create({
    data: {
      username: superAdmin.username,
      email: superAdmin.email,
      phone: `096782320`,
      password: await hash('password', 12),
      Role: 'superAdmin',
    },
  });
  console.table({ superAdmin });

  // create 2 admin:
  for (let i = 1; i < 3; i++) {
    const userAdmin = await prisma.user.create({
      data: {
        username: `admin ${i}`,
        email: `admin${i}@test.com`,
        phone: `09678232${i}`,
        password: await hash('password', 12),
        Role: 'admin',
      },
    });
    const admin = await prisma.admin.create({
      data: {
        username: userAdmin.username,
        email: userAdmin.email,
        phone: userAdmin.phone,
        userId: userAdmin.id,
      },
    });
    console.table({ admin });
  }

  // Create 6 cate
  for (let i = 0; i < 6; i++) {
    const cateArr = ['Board', 'Garlic -presser', 'Gas', 'Plate', 'Rubishben', 'Spoon'];
    const productCategory = await prisma.productCategory.create({
      data: {
        name: cateArr[i],
        description: 'Hello kon Papa',
        createByAdminId: 1,
        create_at: new Date(),
        modified_at: null,
      },
    });
    console.table({ productCategory });
  }

  // create 20 customers(user + customer + address):
  for (let i = 1; i < 4; i++) {
    // creatre user
    const user = await prisma.user.create({
      data: {
        username: `username ${i}`,
        email: `user${i}@test.com`,
        phone: `09678231${i}`,
        password: await hash('password', 12),
        Role: 'customer',
      },
    });
    console.table({ user });
    // create customer
    const customer = await prisma.customer.create({
      data: {
        username: user.username,
        email: user.email,
        phone: `09678232${i}`,
        userId: user.id,
      },
    });
    console.table({ customer });
  }

  function discountPrice(pr: Number, per: Decimal) {
    const price = Number((Number(pr) * (100 - Number(per))) / 100);
    return price;
  }

  // create discount
  const disArr = [5, 10, 15, 20, 25, 30, 45, 50, 60, 70, 75, 80];
  for (let i = 0; i < disArr.length; i++) {
    const discount = await prisma.discount.create({
      data: {
        name: `event ${i}`,
        description: ' ',
        discount_percent: disArr[i],
        createByAdminId: 1,
        modified_at: null,
      },
    });
    console.table({ discount });
  }

  const ratingArr = [
    2.2, 2.4, 2.6, 2.5, 2.7, 2.8, 2.9, 3.1, 3.2, 3.3, 3.5, 3.6, 3.7, 3.8, 3.9, 4.0, 4.1, 4.2, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.7, 4.9, 5.0,
  ];
  const priceArr = [
    2.3, 2.5, 3.0, 3.2, 3.5, 3.7, 4.0, 4.2, 4.5, 4.7, 12.0, 20.0, 40.0, 8.0, 19.0, 13.0, 2.0, 44.0, 41.0, 50.0, 49.0, 6.0, 12.0, 35.0, 46.0,
    18.0, 7.0, 34.0, 20.0, 14.0, 28.0, 36.0, 15.0, 43.0, 17.0, 28.0, 16.0, 26.0, 2.0, 9.0, 33.0, 26.0, 2.0, 18.0, 26.0, 25.0, 41.0, 35.0,
    46.0, 37.0, 32.0, 26.0, 30.0, 45.0, 19.0, 39.0, 35.0, 2.0, 42.0, 47.0, 5.0, 6.0, 46.0, 23.0, 8.0, 12.0, 34.0, 21.0, 8.0, 7.0, 3.0, 44.0,
  ];
  // Create 4 product of Cate1 ----------------------------------------
  for (let i = 0; i < 4; i++) {
    const arrImg1 = [
      'https://i.ibb.co/98SKwnL/1.png',
      'https://i.ibb.co/TK8MVSb/2.png',
      'https://i.ibb.co/2Ngcc9v/3.png',
      'https://i.ibb.co/CzQ5cJ4/4.png',
    ];
    const inventoryData = {
      quantity: 20,
      createByAdminId: 1,
    } as ProductInventory;
    // create iventory
    const inventory = await prisma.productInventory.create({
      data: inventoryData,
    });
    // create product
    const product = await prisma.product.create({
      data: {
        name: `productA-${i}`,
        description: '',
        rating: getRandomElement(ratingArr),
        profile: arrImg1[i],
        images: ['iamgge1', 'image2', 'image3'],
        category_id: 1,
        discount_active: false,
        price: getRandomElement(priceArr),
        discount_price: 135,
        discount_id: await getRndInteger(1, 12),
        inventoryId: inventory.id,
        createByAdminId: 1,
        modified_at: null,
      },
    });
  }

  // Create 6 product of Cate2 ----------------------------------------
  for (let i = 0; i < 6; i++) {
    const arrImg2 = [
      'https://i.ibb.co/rmxn0mf/1.png',
      'https://i.ibb.co/XFnZNhq/2.png',
      'https://i.ibb.co/JpMpCJs/3.png',
      'https://i.ibb.co/1qpFs8Q/4.png',
      'https://i.ibb.co/2gQNN3x/5.png',
      'https://i.ibb.co/zX3KqQf/6.png',
    ];
    const inventoryData = {
      quantity: 20,
      createByAdminId: 1,
    } as ProductInventory;
    // create iventory
    const inventory = await prisma.productInventory.create({
      data: inventoryData,
    });
    // create product
    const product = await prisma.product.create({
      data: {
        name: `productB-${i}`,
        description: '',
        rating: getRandomElement(ratingArr),
        profile: arrImg2[i],
        images: ['iamgge1', 'image2', 'image3'],
        category_id: 2,
        discount_active: false,
        price: getRandomElement(priceArr),
        discount_price: 135,
        discount_id: await getRndInteger(1, 12),
        inventoryId: inventory.id,
        createByAdminId: 1,
        modified_at: null,
      },
    });
  }

  // Create 6 product of Cate3 ----------------------------------------
  for (let i = 0; i < 6; i++) {
    const arrImg3 = [
      'https://i.ibb.co/9w59YFc/1.png',
      'https://i.ibb.co/59NJmkQ/2.png',
      'https://i.ibb.co/3BTdRPZ/3.png',
      'https://i.ibb.co/LxgCxvY/4.png',
      'https://i.ibb.co/SRDfhGM/5.png',
      'https://i.ibb.co/Yj7KLBB/6.png',
    ];
    const inventoryData = {
      quantity: 20,
      createByAdminId: 1,
    } as ProductInventory;
    // create iventory
    const inventory = await prisma.productInventory.create({
      data: inventoryData,
    });
    // create product
    const product = await prisma.product.create({
      data: {
        name: `productC-${i}`,
        description: '',
        rating: getRandomElement(ratingArr),
        profile: arrImg3[i],
        images: ['iamgge1', 'image2', 'image3'],
        category_id: 3,
        discount_active: false,
        price: getRandomElement(priceArr),
        discount_price: 135,
        discount_id: await getRndInteger(1, 12),
        inventoryId: inventory.id,
        createByAdminId: 1,
        modified_at: null,
      },
    });
  }

  // Create 5 product of Cate4 ----------------------------------------
  for (let i = 0; i < 5; i++) {
    const arrImg4 = [
      'https://i.ibb.co/dfpY8bB/1.png',
      'https://i.ibb.co/fqDbpQ5/2.png',
      'https://i.ibb.co/pRhMK8Y/3.png',
      'https://i.ibb.co/Zc9NXbr/4.png',
      'https://i.ibb.co/Bczzm8f/5.png',
    ];

    const inventoryData = {
      quantity: 20,
      createByAdminId: 1,
    } as ProductInventory;
    // create iventory
    const inventory = await prisma.productInventory.create({
      data: inventoryData,
    });
    // create product
    const product = await prisma.product.create({
      data: {
        name: `productD-${i}`,
        description: '',
        rating: getRandomElement(ratingArr),
        profile: arrImg4[i],
        images: ['iamgge1', 'image2', 'image3'],
        category_id: 4,
        discount_active: false,
        price: getRandomElement(priceArr),
        discount_price: 135,
        discount_id: await getRndInteger(1, 12),
        inventoryId: inventory.id,
        createByAdminId: 1,
        modified_at: null,
      },
    });
  }

  // Create 4 product of Cate 5 ----------------------------------------
  for (let i = 0; i < 4; i++) {
    const arrImg5 = [
      'https://i.ibb.co/93NTGNm/1.png',
      'https://i.ibb.co/zbRsMqq/2.png',
      'https://i.ibb.co/MPW3rcx/3.png',
      'https://i.ibb.co/bFv1WVk/4.png',
    ];
    const inventoryData = {
      quantity: 20,
      createByAdminId: 1,
    } as ProductInventory;
    // create iventory
    const inventory = await prisma.productInventory.create({
      data: inventoryData,
    });
    // create product
    const product = await prisma.product.create({
      data: {
        name: `productE-${i}`,
        description: '',
        rating: getRandomElement(ratingArr),
        profile: arrImg5[i],
        images: ['iamgge1', 'image2', 'image3'],
        category_id: 5,
        discount_active: false,
        price: getRandomElement(priceArr),
        discount_price: 135,
        discount_id: await getRndInteger(1, 12),
        inventoryId: inventory.id,
        createByAdminId: 1,
        modified_at: null,
      },
    });
  }

  // Create 4 product of Cate 6 ----------------------------------------
  for (let i = 0; i < 4; i++) {
    const arrImg6 = [
      'https://i.ibb.co/RP7KRVM/1.png',
      'https://i.ibb.co/mTSj92Q/2.png',
      'https://i.ibb.co/wCRJhFQ/3.png',
      'https://i.ibb.co/bHRQhvx/4.png',
    ];
    const inventoryData = {
      quantity: 20,
      createByAdminId: 1,
    } as ProductInventory;
    // create iventory
    const inventory = await prisma.productInventory.create({
      data: inventoryData,
    });
    // create product
    const product = await prisma.product.create({
      data: {
        name: `productF-${i}`,
        description: '',
        rating: getRandomElement(ratingArr),
        profile: arrImg6[i],
        images: ['iamgge1', 'image2', 'image3'],
        category_id: 6,
        discount_active: false,
        price: getRandomElement(priceArr),
        discount_price: 135,
        discount_id: await getRndInteger(1, 12),
        inventoryId: inventory.id,
        createByAdminId: 1,
        modified_at: null,
      },
    });
  }
}

main();
