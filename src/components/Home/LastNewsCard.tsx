'use client'
import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { updateViewsOfPost } from "@/app/_lib/actions";

interface LastNewsCardProps {
  tag: string;
  id: string;
  slugCategory: string,
  slugPost: string,
  image: string;
  title: string;
  category: string;
  author: string;
  createdAt: string;
  views: number;
}

const LastNewsCard = ({
  tag,
  image,
  title,
  category,
  author,
  id,
  createdAt,
  slugCategory,
  slugPost,
  views,
}: LastNewsCardProps) => {
  const goToSingleNew = () => updateViewsOfPost({views,id, slugCategory: slugCategory, slugPost: slugPost});

  return (
    <Card>
      <CardHeader className="p-0">
        <div className="w-full relative">
          <h3 className="absolute top-3 bg-primary text-white px-3 py-1 rounded-sm">
            {tag}
          </h3>
          <Image
            alt={title}
            width={0}
            sizes="100vw"
            height={0}
            className="w-full h-auto object-contain rounded-lg"
            src={image}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="py-3">
          <h2 className="text-xl py-3">{title}</h2>
          <Button onClick={() => goToSingleNew()} className="text-white">
            Leia mais
          </Button>
          <p className="py-2 text-primary font-normal">{category}</p>
        </div>
        <hr />
        <div>
          {author} | {createdAt} | {`visto ${views} vezes`}
        </div>
      </CardContent>
    </Card>
  );
};

export default LastNewsCard;
