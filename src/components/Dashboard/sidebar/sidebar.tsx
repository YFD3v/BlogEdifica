import styles from "./sidebar.module.css";
import MenuLink from "./menuLink/menuLink";
import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdOutlineSettings,
  MdLogout,
  MdNewspaper,
} from "react-icons/md";
import Image from "next/image";
import { auth, signOut } from "@/app/_lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Services",
        path: "/dashboard/services",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Posts",
        path: "/dashboard/posts",
        icon: <MdNewspaper />,
      },
  
    ],
  },
  {
    title: "User",
    list: [
      {
        title: "Settings",
        path: "/dashboard/settings",
        icon: <MdOutlineSettings />,
      },
    ],
  },
];

const Sidebar = async () => {
  const session = await auth();
  const user = await db.user.findFirst({});
  if(!session || !user) redirect('/login');
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src={'https://img.redbull.com/images/c_crop,x_1489,y_0,h_1998,w_1998/c_fill,w_350,h_350/q_auto:low,f_auto/redbullcom/2022/11/23/bmjrydcmhq9ruadewjcf/futebol-neymar-jrs-five-final-mundial-2022'}
          alt={user.name}
          width={50}
          height={50}
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>{user.name}</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((category, index) => (
          <li key={index}>
            <span className={styles.category}>{category.title}</span>
            {category.list.map((item) => (
              <MenuLink key={index} item={item} />
            ))}
          </li>
        ))}
      </ul>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
