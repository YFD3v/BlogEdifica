import { CategoryService, Prisma } from "@prisma/client";
import Title from "../Title";
import ServiceCard from "./ServiceCard";

interface ServicesProps {
  services: Prisma.ServiceGetPayload<{
    include: {
      CategoryService: true;
    };
  }>[];
  categoriesServices: CategoryService[];
}

const Services = ({ services, categoriesServices }: ServicesProps) => {
  const firstCategoryServices = services.filter(
    (service) => service.CategoryService?.name === categoriesServices[0].name
  );

  const secondCategoryServices = services.filter(
    (service) => service.CategoryService?.name === categoriesServices[1].name
  );
  return (
    <section id="services" className="mt-5 py-5 px-5 bg-primary text-white ">
      <Title value="SERVIÇOS" />
      <div className="flex flex-wrap px-7 gap-5">
        <div className="w-[48%] lg:w-[100%]">
          <h3 className="text-2xl pb-3">{categoriesServices[0].name}</h3>
          <div className="flex items-center justify-around flex-wrap gap-3">
            {firstCategoryServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
        <div className="w-[48%] lg:w-[100%]">
          <h3 className="text-2xl pb-3">{categoriesServices[1].name}</h3>
          <div className="flex items-center justify-around flex-wrap gap-3">
            {secondCategoryServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
