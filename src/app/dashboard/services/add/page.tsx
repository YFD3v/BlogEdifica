import { addService } from "@/app/_lib/actions";
import styles from "@/components/Dashboard/services/addService/addService.module.css";

const AddServicesPage = () => {
  return (
    <div className={styles.container}>
      <form action={addService} className={styles.form}>
        <input type="text" placeholder="Name" name="name" required />

        <select name="CategoryService" id="CategoryService">
          <option disabled selected>
            Choose a Category
          </option>
          <option value="Consultoria Imobiliaria">
            Consultoria Imobiliaria
          </option>
          <option value="Gestão de Ativos">Gestão de Ativos</option>
        </select>
        <input type="text" placeholder="Image Url" name="imageUrl" />

        <button type="submit">Criar</button>
      </form>
    </div>
  );
};

export default AddServicesPage;
