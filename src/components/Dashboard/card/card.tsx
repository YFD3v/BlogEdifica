import { MdAnalytics } from "react-icons/md";
import styles from "./card.module.css";

interface CardAdminProps {
  name: string;
  totalViews?: number;
  totalPosts?: number;
  totalServices?: number;
  totalServicesCategories?: {
      category: string;
      count: number;
    }[],

}

const Card = ({
  name,
  totalPosts,
  totalServices,
  totalServicesCategories,
  totalViews,
}: CardAdminProps) => {

  return (
    <div className={styles.container}>
      <MdAnalytics size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>Total {name}</span>
        <span className={styles.number}>
          {name === "Posts" ? totalPosts : totalServices}
        </span>
        <span className={styles.detail}>
          {name === "Posts"
            ? `Total ${totalViews} views`
            : `
          
          ${totalServicesCategories?.[0].count} em ${totalServicesCategories?.[0].category}
          -
          ${totalServicesCategories?.[1].count} em ${totalServicesCategories?.[1].category}
          `}
        </span>
      </div>
    </div>
  );
};

export default Card;
