import React, { ReactNode } from "react";
import styles from "@/components/dashboard/dashboard.module.css";
import Sidebar from "@/components/Dashboard/sidebar/sidebar";
import Navbar from "@/components/Dashboard/navbar/navbar";
import Footer from "@/components/Dashboard/footer/footer";
import { auth } from "../_lib/auth";
import { redirect } from "next/navigation";

interface LayoutProps {
  children: ReactNode;
}
const Layout = async ({ children }: LayoutProps) => {
  const session = await auth();
  if (!session) redirect("/login");
  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
