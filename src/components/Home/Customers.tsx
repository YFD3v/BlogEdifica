import { Customer } from "@prisma/client";
import Title from "../Title";
import SlideCard from "./SlideCard";

interface CustomersProps {
  customers: Customer[];
}

const Customers = ({ customers }: CustomersProps) => {
  const altImages = customers.map((customer) => customer.name);
  const srcImages = customers.map((customer) => customer.imageUrl);
  return (
    <section id="customers" className="max-w-[1440px] mx-auto my-5 p-5">
      <Title value="CLIENTES" />
      <p className="font-light text-xl pb-12 text-gray-500">
        Neste espaço você encontrará alguns dos grandes negócios realizados pela
        LOGOMARCA
      </p>
      <div className="flex align-center justify-center flex-wrap gap-5">
        <SlideCard
          altImage={altImages}
          perPage={3}
          srcImage={srcImages}
          width={1000}
        />
      </div>
    </section>
  );
};

export default Customers;
