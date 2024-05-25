"use client";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import Nav from "./Nav";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

interface NavMobileProps {
  isBlogPage: boolean;
}

const NavMobile = ({ isBlogPage }: NavMobileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav>
      <h3 onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer">
        {!isOpen ? <FaBars size={24} /> : <IoMdClose size={24} />}
      </h3>
      <Nav isBlogPage={isBlogPage} isOpen={isOpen} isMobile={true} />
    </nav>
  );
};

export default NavMobile;
