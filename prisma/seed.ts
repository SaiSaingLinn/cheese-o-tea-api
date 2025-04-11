import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Categories
  const category1 = await prisma.category.create({
    data: {
      name: 'Yogurt',
    },
  });

  const category2 = await prisma.category.create({
    data: {
      name: 'Bubble Tea',
    },
  });

  const category3 = await prisma.category.create({
    data: {
      name: 'Coffee',
    },
  });

  const category4 = await prisma.category.create({
    data: {
      name: 'Smoothie',
    },
  });

  const category5 = await prisma.category.create({
    data: {
      name: 'Soda',
    },
  });

  const category6 = await prisma.category.create({
    data: {
      name: 'Fruit',
    },
  });

  // Seed Menu Items
  const menuItem1 = await prisma.menuItem.create({
    data: {
      name: 'Passion Yogurt',
      description: 'A refreshing blend of creamy yogurt with a tangy passion fruit twist.',
      price: 5000.00,
      imageUrl: 'https://placehold.co/150/FFEE00/000000?text=Passion+Yogurt',
      categoryId: category1.id,
    },
  });

  const menuItem2 = await prisma.menuItem.create({
    data: {
      name: 'Orange Yogurt',
      description: 'A delicious yogurt flavored with the sweetness of fresh oranges.',
      price: 5000.00,
      imageUrl: 'https://placehold.co/150/FFA500/000000?text=Orange+Yogurt',
      categoryId: category1.id,
    },
  });

  const menuItem3 = await prisma.menuItem.create({
    data: {
      name: 'Mango Bubble Tea',
      description: 'A sweet and creamy bubble tea made with mango puree and chewy tapioca pearls.',
      price: 5000.00,
      imageUrl: 'https://placehold.co/150/FFEE00/000000?text=Mango+Bubble',
      categoryId: category2.id,
    },
  });

  const menuItem4 = await prisma.menuItem.create({
    data: {
      name: 'Matcha Latte',
      description: 'A smooth and creamy drink made with high-quality matcha powder and milk.',
      price: 5000.00,
      imageUrl: 'https://placehold.co/150/FFA500/000000?text=Matcha+Latte',
      categoryId: category4.id,
    },
  });

  const menuItem5 = await prisma.menuItem.create({
    data: {
      name: 'Chocolate Smoothie',
      description: 'A rich and velvety chocolate smoothie blended with milk and ice.',
      price: 5000.00,
      imageUrl: 'https://placehold.co/150/FFEE00/000000?text=Chocolate+Smoothie',
      categoryId: category4.id,
    },
  });

  const menuItem6 = await prisma.menuItem.create({
    data: {
      name: 'Berry Soda',
      description: 'A fizzy and fruity soda made with a mix of fresh berries.',
      price: 3500.00,
      imageUrl: 'https://placehold.co/150/FFA500/000000?text=Berry+Soda',
      categoryId: category5.id,
    },
  });

  const menuItem7 = await prisma.menuItem.create({
    data: {
      name: 'Tropical Fruit Juice',
      description: ' A refreshing fruit juice made from a mix of tropical fruits like pineapple, mango, and papaya.',
      price: 4000.00,
      imageUrl: 'https://placehold.co/150/FFEE00/000000?text=Tropical+Fruit',
      categoryId: category6.id,
    },
  });

  const menuItem8 = await prisma.menuItem.create({
    data: {
      name: 'Caramel Coffee',
      description: 'A delicious coffee drink topped with caramel syrup for a sweet finish.',
      price: 3500.00,
      imageUrl: 'https://placehold.co/150/FFA500/000000?text=Caramel+Coffee',
      categoryId: category3.id,
    },
  });

  const menuItem9 = await prisma.menuItem.create({
    data: {
      name: 'Mango Fruit Juice',
      description: ' A refreshing fruit juice made from a mix of tropical fruits like pineapple, mango, and papaya.',
      price: 4000.00,
      imageUrl: 'https://placehold.co/150/FFEE00/000000?text=Mango+Fruit',
      categoryId: category6.id,
    },
  });

  const menuItem10 = await prisma.menuItem.create({
    data: {
      name: 'Strawberry Fruit Juice',
      description: 'A refreshing fruit juice made with fresh strawberries and a hint of sweetness.',
      price: 5000.00,
      imageUrl: 'https://placehold.co/150/FFA500/000000?text=Strawberry+Fruit',
      categoryId: category6.id,
    },
  });

  const menuItem11 = await prisma.menuItem.create({
    data: {
      name: 'Banana Fruit Juice',
      description: ' A refreshing fruit juice made from a mix of tropical fruits like pineapple, mango, and papaya.',
      price: 4000.00,
      imageUrl: 'https://placehold.co/150/FFEE00/000000?text=Banana+Fruit',
      categoryId: category6.id,
    },
  });

  const menuItem12 = await prisma.menuItem.create({
    data: {
      name: 'Apple Fruit Juice',
      description: 'A refreshing fruit juice made with fresh strawberries and a hint of sweetness.',
      price: 5000.00,
      imageUrl: 'https://placehold.co/150/FFA500/000000?text=Apple+Fruit',
      categoryId: category6.id,
    },
  });

  // Seed Orders
  // await prisma.order.create({
  //   data: {
  //     phone: '0991234567',
  //     otp: '007007',  // For testing purposes
  //     categoryId: category1.id,
  //     status: 'pending',
  //   },
  // });

  console.log('Seed data has been successfully inserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
