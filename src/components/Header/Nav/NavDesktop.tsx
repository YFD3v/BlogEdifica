import Link from "next/link";
import { Button } from "../../ui/button";
import Nav from "./Nav";

interface NavDesktopProps{
  isBlogPage: boolean
}

const NavDesktop = ({isBlogPage}: NavDesktopProps) => {
  return (
    <nav>
      <Nav isOpen={false} isBlogPage={isBlogPage} isMobile={false} />
    </nav>
  );
};

export default NavDesktop;
