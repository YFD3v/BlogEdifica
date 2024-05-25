import Title from "../Title";
import SlideCard from "./SlideCard";

const About = () => {
  return (
    <section
      id="about"
      className="p-5 max-w-[1440px] mx-auto my-0 flex items-center flex-wrap justify-between gap-5 py-5 space-y-3"
    >
      <div className="w-[47%] xl:w-full xl:text-center">
        <Title value="A EMPRESA" />
        <p className="text-xl font-light pb-2 text-gray-500 max-w-[580px] xl:mx-auto">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          alias inventore natus nostrum, voluptatum reprehenderit optio, sit,
          aliquid officiis atque consectetur molestias aspernatur perferendis
          dolore nesciunt illo et ad placeat.
        </p>
        <p className="text-xl font-light pb-2 text-gray-500 max-w-[580px] xl:mx-auto">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci,
          porro sit! Odio explicabo ipsam ipsa blanditiis excepturi. Sed tempore
          cumque corporis ex eveniet, illo, deleniti iusto consequuntur dolor,
          temporibus labore.
        </p>
        <div>
          <h3 className="text-primary font-normal text-2xl mt-2">
            Nossas diretrizes:
          </h3>
          <ol className="ml-2 font-light text-xl text-gray-500">
            <li>
              1. Lorem ipsum silor{" "}
              <span className="text-primary font-normal">dolor</span>;
            </li>
            <li>
              2. Lorem <span className="text-primary font-normal">ipsum</span>{" "}
              silor dolor;
            </li>
            <li>
              3. <span className="text-primary font-normal">Lorem</span> ipsum
              silor dolor;
            </li>
            <li>
              4. Lorem ipsum{" "}
              <span className="text-primary font-normal">silor</span> dolor
            </li>
          </ol>
        </div>
      </div>
      <div className="flex items-center justify-center xl:w-full">
        <SlideCard
          altImage={[
            "Banner 1 empresa",
            "Banner 2 empresa",
            "Banner 3 empresa",
          ]}
          perPage={1}
          srcImage={[
            "/images/about-banner.jpg",
            "/images/about-banner.jpg",
            "/images/about-banner.jpg",
          ]}
          width={700}
        />
      </div>
    </section>
  );
};

export default About;
