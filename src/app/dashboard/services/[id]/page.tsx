import { db } from "@/lib/prisma";
import Image from "next/image";
import styles from "@/components/Dashboard/services/singleService/singleService.module.css";
import { updateService } from "@/app/_lib/actions";
import { redirect } from "next/navigation";

const SingleServicePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const Service = await db.service.findUnique({
    where: {
      id,
    },
    include: {
      CategoryService: true,
    },
  });
  if (!Service) return redirect("/dashboard/services");
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={Service.imageUrl} alt={Service.name} fill />
        </div>
      </div>
      <div className={styles.formContainer}>
        <form action={updateService} className={styles.form}>
          <input type="hidden" name="id" value={Service.id} />
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" placeholder={Service.name} />
          <label htmlFor="imageUrl">Image Url</label>
          <input
            type="text"
            name="imageUrl"
            id="imageUrl"
            placeholder={`${Service.imageUrl}`}
          />

          <label htmlFor="CategoryService">Category Service</label>
          <select name="CategoryService" id="CategoryService">
            <option
              value="Consultoria Imobiliaria"
              selected={
                Service?.CategoryService?.name === "Consultoria Imobiliaria"
              }
            >
              Consultoria Imobiliaria
            </option>
            <option
              value="Gestão de Ativos"
              selected={Service?.CategoryService?.name === "Gestão de Ativos"}
            >
              Gestão de Ativos
            </option>
          </select>

          <button type="submit">Atualizar</button>
        </form>
      </div>
    </div>
  );
};

export default SingleServicePage;
