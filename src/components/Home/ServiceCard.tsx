import { Service } from "@prisma/client";
import Image from "next/image";

interface ServiceCardProps {
  service: Service;
}
const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className={`w-[45%] sm:w-[90%] h-[250px] relative`}>
      <Image
        src={service.imageUrl}
        alt={service.name}
        fill
        className="absolute top-0 left-0 rounded-lg"
      />
      <div className="text-secondary bg-white px-8 py-3 absolute left-4 bottom-[-2%] rounded-lg">
        <h4>{service.name}</h4>
      </div>
    </div>
  );
};

export default ServiceCard;
