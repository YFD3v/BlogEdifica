"use server";
import { signIn } from "@/app/_lib/auth";
import { db } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface updateViewsOfPostProps{
  id: string;
  views: number;
  slugCategory: string, 
  slugPost: string, 
}

export const updateViewsOfPost = async ({views,id, slugCategory, slugPost}: updateViewsOfPostProps) => {
  await db.post.update({
    where: { id },
    data: {
      views: views + 1,
    },
  });
  revalidatePath("/");
  revalidatePath("/blog");
  redirect(`/blog/${slugCategory}/${slugPost}`);
};

export const fetchCategories = async () => {
  const categories = await db.categoryNew.findMany({});
  return categories;
};

export const addPost = async (formData: FormData) => {
  const { slug, img, title, content, categoryService, readTime } =
    Object.fromEntries(formData) as {
      slug: string;
      img: string;
      title: string;
      content: string;
      categoryService: string;
      readTime: string;
    };

  try {
    const category = await db.categoryNew.findFirst({
      where: {
        name: categoryService,
      },
    });
    if (!category) {
      throw new Error("Category not found!");
    }

    const author = await db.user.findMany({});

    await db.post.create({
      data: {
        slug,
        content,
        readTime: Number(readTime),
        title,
        img,
        views: 0,
        category: {
          connect: { id: category.id },
        },
        author: {
          connect: { id: author[0].id },
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create post!");
  }
  revalidatePath("/dashboard/posts");
  revalidatePath("/blog");
  redirect("/dashboard/posts");
};

export const addService = async (formData: FormData) => {
  const { name, imageUrl, categoryService } = Object.fromEntries(formData) as {
    name: string;
    imageUrl: string;
    categoryService: string;
  };

  try {
    const category = await db.categoryService.findFirst({
      where: {
        name: categoryService,
      },
    });
    if (!category) {
      throw new Error("Category not found!");
    }
    await db.service.create({
      data: {
        name,
        imageUrl,
        CategoryService: {
          connect: {
            id: category.id,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create service!");
  }
  revalidatePath("/dashboard/services");
  revalidatePath("/");
  redirect("/dashboard/services");
};

export const deletePost = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await db.post.delete({ where: { id: id as string } });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete post!");
  }
  revalidatePath("/dashboard/posts");
  revalidatePath("/blog");
};

export const deleteService = async (formData: FormData) => {
  const { id } = Object.fromEntries(formData);

  try {
    await db.service.delete({ where: { id: id as string } });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to delete service!");
  }
  revalidatePath("/dashboard/services");
  revalidatePath("/");
};

export const updatePost = async (formData: FormData) => {
  const { slug, img, title, content, category, readTime, id } =
    Object.fromEntries(formData) as {
      slug: string;
      img: string;
      title: string;
      content: string;
      category: string;
      readTime: string;
      id: string;
    };

  try {
    const updateFields: any = {
      slug,
      img,
      title,
      content,
      category,
      readTime: Number(readTime),
    };

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || updateFields[key] === undefined) &&
        delete updateFields[key]
    );

    const categoryNew = await db.categoryNew.findFirst({
      where: { name: category },
    });
    await db.post.update({
      where: { id },
      data: {
        ...updateFields,
        category: {
          connect: {
            name: categoryNew?.name,
            id: categoryNew?.id,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update user!");
  }
  revalidatePath("/dashboard/posts");
  revalidatePath("/");
  redirect("/dashboard/posts");
};

export const updateService = async (formData: FormData) => {
  const { name, imageUrl, CategoryService, id } = Object.fromEntries(
    formData
  ) as {
    name: string;
    imageUrl: string;
    CategoryService: string;
    id: string;
  };

  try {
    const updateFields: any = {
      name,
      imageUrl,
      CategoryService,
    };

    const category = await db.categoryService.findFirst({
      where: { name: CategoryService },
    });

    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || updateFields[key] === undefined) &&
        delete updateFields[key]
    );

    await db.service.update({
      where: { id },
      data: {
        ...updateFields,
        CategoryService: {
          connect: {
            name: category?.name,
            id: category?.id,
          },
        },
      },
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update service!");
  }

  revalidatePath("/dashboard/services");
  revalidatePath("/");
  redirect("/dashboard/services");
};

export const updateUser = async (formData: FormData) => {
  const { name, email, password, id } = Object.fromEntries(formData) as {
    name: string;
    email: string;
    password: string;
    id: string;
  };

  try {
    const updateFields: any = {
      name,
      email,
      password,
    };
    Object.keys(updateFields).forEach(
      (key) =>
        (updateFields[key] === "" || updateFields[key] === undefined) &&
        delete updateFields[key]
    );

    const salt = await bcrypt.genSalt(10);
    if (updateFields.password) {
      updateFields.password = await bcrypt.hash(updateFields.password, salt);
    }
    await db.user.update({
      where: { id },
      data: updateFields,
    });
  } catch (err) {
    console.log(err);
    throw new Error("Failed to update user!");
  }

  revalidatePath("/dashboard/settings");
  revalidatePath("/");
  redirect("/dashboard");
};

export const authenticate = async (prevState: any, formData: FormData) => {
  const { email, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { email, password });
  } catch (error: any) {
    throw error;
  }
};
