"use client";
import { fetchCategories } from "@/app/_lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";

interface NavProps {
  isMobile: boolean;
  isOpen: boolean;
  isBlogPage: boolean;
}

interface CategoriesNav {
  id: string;
  name: string;
  slug: string | null;
}

const Nav = ({ isMobile, isOpen, isBlogPage }: NavProps) => {
  const [categories, setCategories] = useState<CategoriesNav[]>([]);

  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    fetchCategories().then((res) => setCategories(res));
  }, []);

  const isPostPage = pathname.split("/").length >= 4;
  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    if (isPostPage) return;
    const params = new URLSearchParams(searchParams);

    if (e.target.value) {
      e.target.value.length > 2 && params.set("query", e.target.value);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params}`);
  };

  return (
    <ul
      className={`flex gap-7  items-center  ${
        isMobile
          ? `absolute flex-col top-[104px] gap-4 ${
              isBlogPage ? "shadow-md bg-white " : "bg-secondary"
            } left-0  w-full pb-5 transition  ${
              isOpen ? "animate-menu-dropdown" : "animate-menu-dropdown-exit "
            }`
          : ""
      }`}
    >
      {!isBlogPage ? (
        <>
          <li className="cursor-pointer transition-colors hover:text-primary">
            <Link href={"#home"}>A EMPRESA</Link>
          </li>
          <li className="cursor-pointer transition-colors hover:text-primary">
            <Link href={"#services"}>SERVIÇOS</Link>
          </li>
          <li className="cursor-pointer transition-colors hover:text-primary">
            <Link href={"#customers"}>CLIENTES</Link>
          </li>
          <li className="cursor-pointer transition-colors hover:text-primary">
            <Link href={"#contact"}>FALE CONOSCO</Link>
          </li>
          <li className="cursor-pointer">
            {isMobile ? (
              <Link href={"/blog"}>BLOG</Link>
            ) : (
              <Button className="w-20">
                <Link href={"/blog"}>BLOG</Link>
              </Button>
            )}
          </li>
        </>
      ) : (
        <>
          <li
            className={`text-secondary w-full text-center py-2 ${
              isMobile ? "hover:bg-primary hover:text-white" : "text-primary"
            } transition `}
          >
            <Link href={"/"}>Home</Link>
          </li>
          {categories.map((category) => (
            <li
              className={`text-secondary w-full text-center py-2 ${
                isMobile ? "hover:bg-primary hover:text-white" : "text-primary"
              } transition `}
              key={category.id}
            >
              <Link href={`/blog/${category.slug}`}>{category.name}</Link>
            </li>
          ))}
          <li className="flex item-center justify-center gap-3 border-secondary rounded-lg border-2 text-secondary px-2">
            <Input
              className="min-w-[180px] border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-none focus-visible:ring-offset-0 "
              placeholder="Pesquise uma notícia..."
              disabled={isPostPage}
              onChange={(e) => handleSearch(e)}
            />
            <button disabled={isPostPage}>
              <MdSearch className="cursor-pointer" size={24} />
            </button>
          </li>
        </>
      )}
    </ul>
  );
};

export default Nav;
