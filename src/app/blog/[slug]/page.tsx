import CardNew from "@/components/Blog/CardNew";
import { db } from "@/lib/prisma";
import { redirect } from "next/navigation";

const CategoryPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { query: string };
}) => {
  const { slug } = params;
  const query = searchParams?.query || "";
  const decodedSlug = decodeURIComponent(slug);
  const category = await db.categoryNew.findFirst({
    where: { slug: decodedSlug },
  });
  const posts = await db.post.findMany({
    include: {
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
    where: {
      category: {
        slug: decodedSlug,
      },
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
    orderBy:{
      createdAt: 'desc'
    }
  });

  if (!category) return redirect("/blog");

  return (
    <div className="mx-3 mt-7 min-h-[calc(100vh-200px)]">
      <h1 className="text-6xl sm:text-4xl  uppercase font-bold text-primary mb-5">
        {category.name}
      </h1>
      <div className="mx-3 my-7 shadow-md">
        <div className="flex items-center flex-wrap">
          {posts.length > 0 ? (
            <>
              {posts.map((post) => (
                <CardNew post={post} key={post.id} />
              ))}
            </>
          ) : (
            <h3 className="p-5 text-xl">Não existem notícias!</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
