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
  for (let i = 1; i < 8; i++) {
    const productCategory = await prisma.productCategory.create({
      data: {
        name: `Category ${i}`,
        description: 'Hello kon Papa',
        createByAdminId: 1,
        modified_at: null,
      },
    });
    console.table({ productCategory });
  }

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
    console.table({ user });
    // create customer
    const customer = await prisma.customer.create({
      data: {
        username: user.username,
        email: user.email,
        phone: user.phone,
        userId: user.id,
      },
    });
    console.table({ customer });
    // create address
    const address = await prisma.address.create({
      data: {
        customerId: customer.id,
        work: `work ${i}`,
        street: 270 + i,
        zipcode: 300 + i,
        city: `city${i}`,
        province: `province${i}`,
      },
    });

    console.table({ address });
  }

  function discountPrice(pr: Number, per: Decimal) {
    const price = Number((Number(pr) * (100 - Number(per))) / 100);
    return price;
  }
  // create discount
  var x = 0;
  for (let i = 1; i < 500; i++) {
    const inventory = await prisma.productInventory.createMany({
      data: [
        {
          quantity: 30 + i,
          createByAdminId: 1,
          modified_at: null,
        }
      ],
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
    const product = await prisma.product.create({
      data: {
        name: `productA-${i}`,
        description: 'kit transforming your better life',
        rating: 3.5,
        profile: 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
        images: ['iamgge1', 'image2', 'image3'],
        category_id:  Math.floor(Math.random() * (7 - 1 + 1) ) + 1,
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
