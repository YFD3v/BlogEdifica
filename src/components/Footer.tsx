'use client'
import { usePathname } from "next/navigation";

const Footer = () => {
  const path = usePathname()

  const isAdminPage = path.includes("/dashboard");
  const isLoginPage = path.includes("/login");
  if(isAdminPage || isLoginPage) return;
  return (
    <footer className="bg-[#121212] text-center py-5 mt-7 text-white">
      <h2 className="text-2xl">Todos os direitos reservados</h2>
      <span>Feito por YF_Developer</span>
    </footer>
  );
};

export default Footer;
