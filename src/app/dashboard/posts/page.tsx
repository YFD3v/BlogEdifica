import { deletePost } from "@/app/_lib/actions";
import Search from "@/components/Dashboard/search/search";
import { db } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import styles from "@/components/Dashboard/posts/posts.module.css";
import Pagination from "@/components/Dashboard/pagination/pagination";

const PostsPage = async ({
  searchParams,
}: {
  searchParams: { q: string; page: string };
}) => {
  const ITEMS_PER_PAGE = 2;

  const q = searchParams?.q || "";
  const page = searchParams?.page || "1";
  
  const posts = await db.post.findMany({
    include: { category: true },
    where: {
      title: {
        contains: q,
        mode: "insensitive",
      },
    },
    take: 2,
    skip: ITEMS_PER_PAGE * (parseInt(page) - 1),
  });
  const totalPosts = await db.post.count();

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder={"Search for a post..."} />
        <Link href="/dashboard/posts/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Title</td>
            <td>Img</td>
            <td>Slug</td>
            <td>Read Time</td>
            <td>Category</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {posts?.map((post) => (
            <tr key={post.id}>
              <td>
                <div className={styles.post}>
                  <Image
                    src={post.img || "/noavatar.png"}
                    width={80}
                    height={80}
                    alt={post.title}
                    className={styles.postImage}
                  />
                  {post.title}
                </div>
              </td>
              <td className="text-xs text-wrap">{post.img}</td>
              <td>{post.slug}</td>
              <td>{post.readTime}</td>
              <td>{post.category.name}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/posts/${post.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deletePost}>
                    <input type="hidden" name="id" value={post.id} />
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
      <Pagination count={totalPosts} />
    </div>
  );
};

export default PostsPage;
