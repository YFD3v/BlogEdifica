import { addPost, fetchCategories } from "@/app/_lib/actions";
import styles from "@/components/Dashboard/posts/addPost/addPost.module.css";

const AddPostPage = async () => {
  const categories = await fetchCategories();

  return (
    <div className={styles.container}>
      <form action={addPost} className={styles.form}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          required
        />

        <input type="text" name="img" id="img" placeholder="Image Url" />

        <input
          type="text"
          name="slug"
          id="slug"
          placeholder="Slug: post-slug"
        />

        <input
          type="text"
          name="readTime"
          id="readTime"
          placeholder="Read Time"
        />

        <select name="category" id="category">
          <option disabled selected>
            Which?
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>{category.name}</option>
          ))}
        </select>


        <textarea name="content" id="content" placeholder="Content"></textarea>
        <button type="submit">Criar</button>
      </form>
    </div>
  );
};

export default AddPostPage;
