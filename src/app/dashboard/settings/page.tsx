import { db } from "@/lib/prisma";
import styles from "@/components/Dashboard/settings/settings.module.css";
import Image from "next/image";
import { redirect } from "next/navigation";
import { updateUser } from "@/app/_lib/actions";

const SettingsPage = async () => {
  const user = await db.user.findFirst({});

  if (!user) redirect("/login");
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={
              "https://img.redbull.com/images/c_crop,x_1489,y_0,h_1998,w_1998/c_fill,w_350,h_350/q_auto:low,f_auto/redbullcom/2022/11/23/bmjrydcmhq9ruadewjcf/futebol-neymar-jrs-five-final-mundial-2022"
            }
            alt={user.name}
            fill
          />
        </div>
        {user.name}
      </div>
      <div className={styles.formContainer}>
        <form action={updateUser} className={styles.form}>
          <input type="hidden" value={user.id} name="id" />
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" placeholder={user.name} />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder={user.email}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="*******"
          />
          <button type="submit">Atualizar</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
