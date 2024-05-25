const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
async function main() {

  //Reset Database
  // await prisma.post.deleteMany({});
  // await prisma.user.deleteMany({});
  // await prisma.service.deleteMany({});
  // await prisma.customer.deleteMany({});
  // await prisma.categoryNew.deleteMany({});
  // await prisma.categoryService.deleteMany({});

  // Categories for Services
  const consultoriaImobiliaria = await prisma.categoryService.create({
    data: {
      name: "Consultoria Imobiliaria",
    },
  });

  const gestaoDeAtivos = await prisma.categoryService.create({
    data: {
      name: "Gestão de Ativos",
    },
  });

  // Services
  const servicesConsultoriaImobiliaria = [
    "Locação / Aquisição",
    "Mobiliados sob medida",
    "Renegociação de Aluguéis",
    "Desmobilização de Portfólio",
  ];

  const servicesGestaoDeAtivos = [
    "Sale & Lease Back",
    "Built to Suit",
    "Avaliação de Ativos Imobiliários",
  ];

  for (const serviceName of servicesConsultoriaImobiliaria) {
    await prisma.service.create({
      data: {
        name: serviceName,
        imageUrl:
          "https://media.istockphoto.com/id/978469736/pt/foto/stack-of-money-and-fianacial-paper-on-working-table.jpg?s=612x612&w=0&k=20&c=O_7FJFW9K0nMMM7s7NiYcSApAnO18KCsHOAywsX20Rc=",
        categoryServiceId: consultoriaImobiliaria.id,
      },
    });
  }

  for (const serviceName of servicesGestaoDeAtivos) {
    await prisma.service.create({
      data: {
        name: serviceName,
        imageUrl:
          "https://media.istockphoto.com/id/978469736/pt/foto/stack-of-money-and-fianacial-paper-on-working-table.jpg?s=612x612&w=0&k=20&c=O_7FJFW9K0nMMM7s7NiYcSApAnO18KCsHOAywsX20Rc=",
        categoryServiceId: gestaoDeAtivos.id,
      },
    });
  }

  // Customers
  const customers = ["Google", "Apple", "Samsung", "Amazon"];
  const imagesCustomers = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuqOD_HGhK_aWk1NfMqIQT3WdySG22wrDkLb9-U7THnA&s",
    "https://www.shutterstock.com/image-vector/galati-romania-april-29-2023-600nw-2295394661.jpg",
    "https://images.samsung.com/is/image/samsung/assets/global/about-us/brand/logo/360_197_1.png?$FB_TYPE_B_PNG$",
    "https://logodownload.org/wp-content/uploads/2014/04/amazon-logo-0.png",
  ];

  for (let i = 0; i < customers.length; i++) {
    await prisma.customer.create({
      data: {
        name: customers[i],
        imageUrl: imagesCustomers[i],
      },
    });
  }

  // User (Administrator)
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("123456", salt);

  const yan = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "ADMINISTRATOR",
    },
  });

  // Categories for Blog Posts
  const blogCategories = [
    "Tecnologia",
    "Negócios",
    "Saúde",
    "Educação",
    "Entretenimento",
  ];

  const categoryNews = [];
  for (const categoryName of blogCategories) {
    const category = await prisma.categoryNew.create({
      data: {
        name: categoryName,
        slug: categoryName.toLowerCase().replace(/ /g, "-"),
      },
    });
    categoryNews.push(category);
  }

  // Blog Posts
  const posts = [
    {
      title: "Post 1",
      slug: "post-1",
      img: "https://media.istockphoto.com/id/978469736/pt/foto/stack-of-money-and-fianacial-paper-on-working-table.jpg?s=612x612&w=0&k=20&c=O_7FJFW9K0nMMM7s7NiYcSApAnO18KCsHOAywsX20Rc=",
      content: "Conteúdo do post 1",
      views: 100,
      readTime: 5,
      categoryId: categoryNews[0].id,
      authorId: yan.id,
    },
    {
      title: "Post 2",
      slug: "post-2",
      img: "https://media.istockphoto.com/id/978469736/pt/foto/stack-of-money-and-fianacial-paper-on-working-table.jpg?s=612x612&w=0&k=20&c=O_7FJFW9K0nMMM7s7NiYcSApAnO18KCsHOAywsX20Rc=",
      content: "Conteúdo do post 2",
      views: 150,
      readTime: 8,
      categoryId: categoryNews[1].id,
      authorId: yan.id,
    },
  ];

  for (const post of posts) {
    await prisma.post.create({
      data: post,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
