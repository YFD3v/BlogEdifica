import Pagination from "@/components/Dashboard/pagination/pagination";
import Search from "@/components/Dashboard/search/search";
import { db } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/Dashboard/services/services.module.css";
import { deleteService } from "@/app/_lib/actions";

const ServicesPage = async ({
  searchParams,
}: {
  searchParams: { q: string; page: string };
}) => {
  const ITEMS_PER_PAGE = 2;
  const q = searchParams?.q || "";
  const page = searchParams?.page || "1";

  const services = await db.service.findMany({
    include: { CategoryService: true },
    where: {
      name: {
        contains: q,
        mode: "insensitive",
      },
    },
    take: 2,
    skip: ITEMS_PER_PAGE * (parseInt(page) - 1),
  });
  const totalServices = await db.service.count();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder={"Search for a service..."} />
        <Link href="/dashboard/services/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Image Url</td>
              <td>Category Service</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>
                  <div className={styles.service}>
                    <Image
                      src={service.imageUrl}
                      width={40}
                      height={40}
                      alt={service.name}
                      className={styles.serviceImage}
                    />
                    {service.name}
                  </div>
                </td>
                <td>{service.imageUrl}</td>
                <td>{service?.CategoryService?.name}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/services/${service.id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                    <form action={deleteService}>
                      <input type="hidden" name="id" value={service.id} />
                      <button className={`${styles.button} ${styles.delete}`}>
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination count={totalServices} />
      </div>
    </div>
  );
};

export default ServicesPage;
