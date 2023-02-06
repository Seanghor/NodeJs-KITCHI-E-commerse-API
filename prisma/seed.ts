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
  for (let i = 1; i < 100; i++) {
    const inventory = await prisma.productInventory.createMany({
      data: [
        {
          quantity: 30 + i,
          createByAdminId: 1,
          modified_at: null,
        },
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
    const arrImg = [
      'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png',
      'https://i.ibb.co/0JKpmgd/blue.png',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3o9ClEwLfHig7HShlxVLxpfAAumPrXcr-qWJ1zKLf3C7xGc8HcI-X472d-snK5pNyye0&usqp=CAU',
      'https://img2.gratispng.com/20180401/spq/kisspng-converse-drawing-sneakers-chuck-taylor-all-stars-s-closet-5ac1820a366154.5811904015226311782228.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBexsms98LHPv6OsXFjGU7xcJl1KDDF3zvqzhmMhn6W1-KnkKYCG6bJOjoe-9zL1ppm3o&usqp=CAU',
      'https://thumbs.dreamstime.com/b/cartoon-sneakers-vector-hand-drawn-illustration-isolated-transparent-background-217088038.jpg',
      'https://ih1.redbubble.net/image.1811731060.4088/st,small,845x845-pad,1000x1000,f8f8f8.jpg',
      'https://static.wikia.nocookie.net/gensin-impact/images/8/85/Tartaglia_Icon.png/revision/latest?cb=20210213163935',
      'https://static.vecteezy.com/system/resources/thumbnails/000/182/406/small/thank_you_1-01.png',
      'https://i.pinimg.com/originals/62/3a/a8/623aa8f9933ee9a286871bf6e0782538.jpg',
      'https://i.pinimg.com/originals/73/af/0c/73af0c0389795511117949da29f3079c.jpg',
      'https://i.pinimg.com/736x/09/31/95/0931955543d67e222855ed47c041f48f.jpg',
    ];
    function getRandomElement(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    const product = await prisma.product.create({
      data: {
        name: `productA-${i}`,
        description: 'kit transforming your better life',
        rating: 3.5,
        profile: getRandomElement(arrImg),
        images: ['iamgge1', 'image2', 'image3'],
        category_id: Math.floor(Math.random() * (7 - 1 + 1)) + 1,
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
