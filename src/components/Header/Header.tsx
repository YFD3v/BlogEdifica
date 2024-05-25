"use client";
import { useEffect, useState } from "react";
import NavDesktop from "./Nav/NavDesktop";
import NavMobile from "./Nav/NavMobile";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const [width, setWidth] = useState(0);
  const path = usePathname();
  const isBlogPage = path.includes("/blog");
  const isAdminPage = path.includes("/dashboard");
  const isLoginPage = path.includes("/login");

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (isAdminPage || isLoginPage) return;
  return (
    <header
      className={`w-full p-8 flex flex-wrap items-center justify-between ${
        isBlogPage ? "shadow-xl text-black" : "bg-secondary text-white"
      }  max-h-[104px]`}
    >
      <div>
        <Link href={isBlogPage ? "/blog" : "/"} className="text-4xl">
          {isBlogPage ? "Nosso Blog" : "LOGOMARCA"}
        </Link>
      </div>
      {width > 968 ? (
        <NavDesktop isBlogPage={isBlogPage} />
      ) : (
        <NavMobile isBlogPage={isBlogPage} />
      )}
    </header>
  );
};

export default Header;
