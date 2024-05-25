"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export const sendForm = async (formData: FormData) => {
  const { name, email, subject, message } = Object.fromEntries(formData);

  const content = {
    Nome: name,
    Assunto: subject,
    Email: email,
    Mensagem: message,
    _autoresponse: "Mensagem enviada à YF Developer, aguarde a resposta!",
    _subject: "Nova mensagem do blog edifica!",
  };

  if (!name || !email || !subject || !message)
    throw new Error("Preencha todos os campos");
  try {
    await fetch("https://formsubmit.co/ajax/fabioyan2@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(content),
    });
  } catch (error) {
    console.log(error);
  }
};

const FormContact = () => {
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      toast.info("Enviando...");
      setIsLoading(true)
      event.currentTarget.reset();
      await sendForm(formData);
      toast.success("Enviado com sucesso!");
      setIsLoading(false)

    } catch (error) {
      console.error(error);
      toast.error("Houve um erro, tente novamente!");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 flex-wrap items-center justify-center"
    >
      <Input className="w-full" type="text" placeholder="Nome" name="name" />

      <Input type="email" placeholder="E-mail" name="email" />

      <Input type="text" name="subject" placeholder="Assunto" />

      <Textarea
        placeholder="Mensagem"
        name="message"
        className="resize-none w-full"
      />
      <Button
        variant="secondary"
        disabled={isLoading}
        className="text-white py-6 px-8 text-xl"
        type="submit"
      >
        {!isLoading ? 'Enviar' : 'Aguarde'}
      </Button>
    </form>
  );
};

export default FormContact;
