'use client'
import { updateViewsOfPost } from "@/app/_lib/actions";
import { Prisma } from "@prisma/client";
import Image from "next/image";

interface CardNewProps {
  post: Prisma.PostGetPayload<{
    include: {
      category: {
        select: {
          name: true;
          slug: true;
        };
      };
    };
  }>;
}

const CardNew = ({ post }: CardNewProps) => {
  return (
    <div className="w-[22%] md:w-[95%] md:mb-6 shadow-sm flex flex-col justify-center items-center">
      <div>
        <Image
          className="rounded-lg object-cover"
          src={post.img as string}
          alt={post.title}
          width={260}
          height={260}
        />
      </div>
      <div className="w-full px-6 py-4">
        <span className="text-sm">
          <span className="text-primary uppercase font-semibold">
            {post.category.name}
          </span>{" "}
          - {post.readTime} min
        </span>
        <p className="text-xl">{post.title}</p>
        <button onClick={() => updateViewsOfPost({views: post.views, id: post.id, slugPost: post.slug, slugCategory: post.category.slug as string})} className="text-white text-xl bg-primary px-3 py-1 rounded-md mt-3">Saiba mais</button>
      </div>
    </div>
  );
};

export default CardNew;
