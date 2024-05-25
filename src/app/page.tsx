import About from "@/components/Home/About";
import Contact from "@/components/Home/Contact/Contact";
import Customers from "@/components/Home/Customers";
import LastNews from "@/components/Home/LastNews";
import Services from "@/components/Home/Services";
import { db } from "@/lib/prisma";

export default async function Home() {
  const categoriesServices = await db.categoryService.findMany({});
  const services = await db.service.findMany({
    include: {
      CategoryService: true,
    },
  });
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      category: true,
    },
    take: 3,
  });

  const customers = await db.customer.findMany();
  return (
    <>
      <About />
      <Services services={services} categoriesServices={categoriesServices} />
      <Customers customers={customers} />
      <Contact />
      <LastNews posts={posts} />
    </>
  );
}
