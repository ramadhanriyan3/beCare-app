"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";
import CustomFormField from "../customFormField";
import SubmitButton from "../submitButton";
import { UserFormValidation } from "@/lib/validation";
import { createUser } from "@/actions/patient.actions";
import { FormFieldType } from "@/types/formField.types";

const PatientForm = () => {
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async ({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);
    try {
      const userData = {
        name,
        email,
        phone,
      };

      console.log(userData);
      const user = await createUser(userData);

      console.log("DIINIsini", user.id, user.$id);

      if (user) router.push(`/patients/${user.$id}/register`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-white
       space-y-6"
      >
        <section className="mb-12 space-y-4">
          <h1 className="text-2xl font-bold">Hi there &#128075;</h1>
          <p className="text-dark-700">Schedule lyour firs appointment</p>
        </section>
        <CustomFormField
          control={form.control}
          name="name"
          label="Full name"
          placeholder="Full Name"
          fieldType={FormFieldType.INPUT}
          iconSrc="/assets/icons/user.svg"
        />
        <CustomFormField
          control={form.control}
          name="email"
          label="Email"
          placeholder="example@gmail.com"
          fieldType={FormFieldType.INPUT}
          iconSrc="/assets/icons/email.svg"
        />

        <CustomFormField
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="+62 852 1113 9783"
          fieldType={FormFieldType.PHONE_INPUT}
          iconSrc="/assets/icons/appointments.svg"
        />
        <SubmitButton className="text-white bg-green-500" isLoading={isLoading}>
          Get Started
        </SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
