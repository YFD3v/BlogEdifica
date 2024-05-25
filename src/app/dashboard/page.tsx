import Card from "@/components/Dashboard/card/card";
import { db } from "@/lib/prisma";
import styles from "@/components/dashboard/dashboard.module.css";
const Dashboard = async () => {
  const services = await db.service.findMany({});
  const categoriesServices = await db.categoryService.findMany({});

  const totalServicesCategories = [
    {
      category: categoriesServices[0].name,
      count: services.filter(
        (service) => service.categoryServiceId === categoriesServices[0].id
      ).length,
    },
    {
      category: categoriesServices[1].name,
      count: services.filter(
        (service) => service.categoryServiceId === categoriesServices[1].id
      ).length,
    },
  ];

  const posts = await db.post.findMany({});

  const totalViews = posts.reduce((accm, post) => (accm += post.views), 0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.cards}>
          <Card
            name="Services"
            totalServices={services.length}
            totalServicesCategories={totalServicesCategories}
          />
          <Card
            name="Posts"
            totalPosts={posts.length}
            totalViews={totalViews}
          />
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
