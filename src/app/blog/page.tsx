import CardNew from "@/components/Blog/CardNew";
import { db } from "@/lib/prisma";

const BlogPage = async ({
  searchParams,
}: {
  searchParams: { query: string };
}) => {
  const query = searchParams?.query || "";
  
  const posts = await db.post.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      category: {
        select: {
          name: true,
          slug: true,
        },
      },
    },
    where: {
      title: {
        contains: query,
        mode: "insensitive",
      },
    },
  });

  return (
    <div className="mx-3 mt-7 min-h-[calc(100vh-200px)]">
      <h1 className="text-6xl uppercase font-bold text-primary mb-5">
        Notícias Recentes
      </h1>
      <div className="mx-3 my-7 shadow-md">
        <div className="flex items-center gap-7 flex-wrap">
          {posts.length > 0 ? (
            <>
              {posts.map((post) => (
                <CardNew post={post} key={post.id} />
              ))}
            </>
          ) : (
            <h3 className="p-5 text-xl">Não existe nenhuma nóticia com esse nome!</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
