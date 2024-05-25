import styles from "@/components/Dashboard/posts/singlePost/singlePost.module.css";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import { fetchCategories, updatePost } from "@/app/_lib/actions";
import Image from "next/image";

const SinglePostPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const post = await db.post.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
    },
  });
  const categories = await fetchCategories();
  if (!post) return redirect("/dashboard/posts");

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={post.img ?? "/noavatar.png"}
            alt={post.title}
           fill
          />
        </div>
        {post.title}
      </div>
      <div className={styles.formContainer}>
        <form action={updatePost} className={styles.form}>
          <input type="hidden" value={post.id} name="id" />
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" placeholder={post.title} />
          <label htmlFor="img">Image Url</label>
          <input
            type="text"
            name="img"
            id="img"
            placeholder={post.img as string}
          />
          <label htmlFor="slug">Slug</label>
          <input type="text" name="slug" id="slug" placeholder={post.slug} />
          <label htmlFor="readTime">Read Time</label>
          <input
            type="text"
            name="readTime"
            id="readTime"
            placeholder={`${String(post.readTime)} min`}
          />

    
          <label htmlFor="category">Category</label>
          <select name="category" id="category">
            {categories.map((category) => (
              <option key={category.id} selected={post.category.name === category.name} value={category.name}>{category.name}</option>
            ))}
          </select>

  
          <label htmlFor="content">Content</label>
          <textarea
            name="content"
            id="content"
            placeholder={post.content}
          ></textarea>

          <button type="submit">Atualizar</button>
        </form>
      </div>
    </div>
  );
};

export default SinglePostPage;
