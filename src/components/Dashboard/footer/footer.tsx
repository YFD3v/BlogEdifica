import Image from "next/image";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logomarca}>
      <Image
        src="/logo.png"
        alt="YF D3v"
        width={45}
        height={45}
        className={styles.logo}
      />
      YF Dev
      </div>
      <div className={styles.text}>© All rights reserved.</div>
    </div>
  );
};

export default Footer;
