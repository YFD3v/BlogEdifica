import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

const SinglePostPage = async ({
  params,
}: {
  params: { slug: string; slugPost: string };
}) => {
  const decodedSlugCategory = decodeURIComponent(params.slug);
  const decodedSlugPost = decodeURIComponent(params.slugPost);
  const post = await db.post.findFirst({
    where: {
      slug: decodedSlugPost,
      category: {
        slug: decodedSlugCategory,
      },
    },
    include: {
      category: true,
      author: true,
    },
  });

  if (!post) return redirect("/blog");

  const paragraphs = post.content.split("FIM");
  return (
    <div className="mt-5 min-h-[calc(100vh-200px)]">
      <div className="py-4 px-6 absolute left-0 top-[15%] text-white bg-slate-400 rounded-r-xl flex flex-col gap-5 md:hidden">
        <Link
          className="cursor-pointer hover:text-slate-200 transition"
          href="https://www.twitter.com"
          target="_blank"
        >
          <FaTwitter size={34} />
        </Link>
        <Link
          href="https://www.linkedin.com"
          target="_blank"
          className="cursor-pointer hover:text-slate-200 transition"
        >
          <FaLinkedin size={34} />
        </Link>
        <Link
          href="https://www.facebook.com"
          target="_blank"
          className="cursor-pointer hover:text-slate-200 transition"
        >
          <FaFacebook size={34} />
        </Link>
      </div>

      <div className="pt-6 flex-col flex w-full items-center justify-center">
        <div>
          <h3 className="text-2xl">
            <Link
              className="text-gray-400"
              href={`/blog/${post.category.slug}`}
            >
              {post.category.name} {">"}
            </Link>{" "}
            {post.title}
          </h3>
        </div>
        <div className="flex flex-col mt-6 w-[75%]">
          <h1 className="text-7xl">{post.title}</h1>
          <Badge variant="outline" className="text-xl mt-7 w-fit h-[30px]">
            Notícia de {post.category.name}
          </Badge>
          <div className="flex gap-3 mt-8 items-center">
            <Image
              src="https://img.redbull.com/images/c_crop,x_1489,y_0,h_1998,w_1998/c_fill,w_350,h_350/q_auto:low,f_auto/redbullcom/2022/11/23/bmjrydcmhq9ruadewjcf/futebol-neymar-jrs-five-final-mundial-2022"
              alt={post.author.name}
              className="rounded-full"
              width={80}
              height={80}
            />
            <div>
              <h2 className="text-3xl sm:text-xl">{post.author.name}</h2>
              <span className="text-gray-400 sm:text-xs">
                <span>
                  {post.createdAt.toLocaleDateString("pt-br", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span className="px-2">-</span>
                <span>{post.readTime} minutos de leitura</span>
              </span>
            </div>
          </div>

          <div className="my-12">
            <Separator />
          </div>

          <div className="flex flex-col gap-3 mb-6 text-justify text-lg sm:text-sm">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
