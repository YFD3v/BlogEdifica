import Title from "../../Title";
import FormContact from "./FormContact";

const Contact = () => {
  return (
    <section id="contact" className="bg-primary mt-12 p-6 text-white text-center">
      <Title value="FALE CONOSCO" />
      <p className="pb-3 text-gray-300 font-normal">
        Deixe sua mensagem e entraremos em contato em breve!
      </p>
      <div className="max-w-[600px] mx-auto text-black">
        <FormContact />
      </div>
    </section>
  );
};

export default Contact;
