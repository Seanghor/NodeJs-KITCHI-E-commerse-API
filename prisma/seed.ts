// Seed data to be used in development
import { PrismaClient } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { hash } from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  // create superAdmin
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
      password: await hash('password', 12),
      phone: superAdmin.phone,
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
        password: await hash('password', 12),
        phone: `09678232${i}`,
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

  // Create 7 cate
  const productCategory = await prisma.productCategory.createMany({
    data: [
      {
        name: 'Knife',
        description: 'Hello kon Papa',
        createByAdminId: 1,
        modified_at: null,
      },
      {
        name: 'Teapot',
        description: 'Hello kon Papa',
        createByAdminId: 1,
        modified_at: null,
      },
      {
        name: 'cookware',
        description: 'Hello kon Papa',
        createByAdminId: 1,
        modified_at: null,
      },
      {
        name: 'dishwasher',
        description: 'Hello kon Papa',
        createByAdminId: 1,
        modified_at: null,
      },
      {
        name: 'post',
        description: 'Hello kon Papa',
        createByAdminId: 1,
        modified_at: null,
      },
      {
        name: 'microwave',
        description: 'Hello kon Papa',
        createByAdminId: 1,
        modified_at: null,
      },
      {
        name: 'toaster',
        description: 'Hello kon Papa',
        createByAdminId: 1,
        modified_at: null,
      },
    ],
  });
  console.table({ productCategory });

  // create 20 customers(user + customer + address):
  for (let i = 1; i < 20; i++) {
    // creatre user
    const user = await prisma.user.create({
      data: {
        username: `username ${i}`,
        email: `user${i}@test.com`,
        password: await hash('password', 12),
        phone: `0923242${i}`,
        Role: 'customer',
      },
    });

    // create customer
    const customer = await prisma.customer.create({
      data: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        userId: user.id,
      },
    });

    // create address
    await prisma.address.create({
      data: {
        customerId: customer.id,
        companyName: `company ${i}`,
        street: 270 + i,
        zipecode: 300 + i,
        city: `city${i}`,
        province: `province${i}`,
        country: 'Cambodia',
      },
    });
    console.table({ customer });
  }

  function discountPrice(pr: Number, per: Decimal) {
    const price = Number((Number(pr) * (100 - Number(per))) / 100);
    return price;
  }
  // create discount
  var x = 0;
  for (let i = 1; i < 7; i++) {
    const inventory = await prisma.productInventory.create({
      data: {
        quantity: 30 + i,
        createByAdminId: 1,
        modified_at: null,
      },
    });
    console.table({ inventory });

    const discount = await prisma.discount.create({
      data: {
        name: `event ${i}`,
        description: ' ',
        discount_percent: x,
        createByAdminId: 1,
        modified_at: null,
      },
    });

    var active;
    let price1 = 110;
    let price2;
    let dis;
    if (i % 2 == 0) {
      active = Boolean(true);
    } else {
      active = Boolean(false);
    }

    if (active === Boolean(true)) {
      dis = discount.discount_percent;
      price2 = discountPrice(price1, dis);
    } else {
      dis = 0;
      price2 = discountPrice(price1, dis);
    }
    // create product:
    const product = await prisma.product.createMany({
      data: {
        name: `product ${i}`,
        description: 'kit transforming your better life',
        category_id: 1,
        discount_active: active,
        price: price1,
        discount_price: price2,
        discount_id: discount.id,
        inventoryId: i,
        createByAdminId: 2,
        modified_at: null,
      },
    });

    console.table({ product });

    x = x + 10;
    console.table({ discount });
  }
}

main();
