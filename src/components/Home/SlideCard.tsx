"use client";

import Image from "next/image";
import {
  Splide,
  SplideSlide,
} from "../../../node_modules/@splidejs/react-splide";
import "@splidejs/react-splide/css";

interface SlideCardProps {
  perPage: number;
  width: number;
  srcImage: string[];
  altImage: string[];
}

const SlideCard = ({ perPage, width, srcImage, altImage }: SlideCardProps) => {
  return (
    <Splide
      options={{
        type: "loop",
        perPage,
        perMove: 1,
        width,
        pagination: false,
        arrows: true,
        drag: true,
        breakpoints: {
          900: {
            width: 500,
            perPage: perPage / perPage,
            arrows: true,
            drag: true,
          },
          540: {
            arrows: false,
            width: 280,
          },
        },
      }}
    >
      {srcImage.map((src, index) => (
        <SplideSlide
          key={index}
          style={{
            padding: "0 15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            width={0}
            sizes="100vw"
            height={0}
            className="w-full h-auto object-fit rounded-lg"
            src={src}
            alt={altImage[index]}
          />
        </SplideSlide>
      ))}
    </Splide>
  );
};

export default SlideCard;
