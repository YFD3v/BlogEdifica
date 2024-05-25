import Link from "next/link";
import Title from "../Title";
import { Button } from "../ui/button";
import LastNewsCard from "./LastNewsCard";
import { Post, Prisma } from "@prisma/client";

interface LastNewsProps {
  posts: Prisma.PostGetPayload<{
    include: {
      author: true;
      category: true;
    };
  }>[];
}

const LastNews = ({ posts }: LastNewsProps) => {
  return (
    <section className="px-5 mt-5">
      <div className="flex items-center justify-between md:justify-center md:text-center flex-wrap">
        <Title value="ÚLTIMAS NOTÍCIAS" />
        <Button
          className="w-[20%] md:w-auto text-xl py-7 border-primary text-primary"
          variant="outline"
        >
          <Link href={"/blog"}>Ir para o Blog</Link>
        </Button>
      </div>
      <div className="flex mt-5 flex-wrap justify-center items-center gap-5">
        {posts.map((post) => (
          <LastNewsCard
            key={post.id}
            slugCategory={post.category.slug as string}
            slugPost={post.slug}
            author={post.author.name}
            category={`Noticía de ${post.category.name}`}
            createdAt={post.createdAt.toLocaleDateString("pt-br", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
            id={post.id}
            image={post.img as string}
            tag={post.category.name}
            title={post.title}
            views={post.views}
          />
        ))}
      </div>
    </section>
  );
};

export default LastNews;
