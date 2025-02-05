"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "@/components/customFormField";
import SubmitButton from "@/components/submitButton";
import { PatientFormValidation } from "@/lib/validation";
import { FormFieldType } from "@/types/formField.types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/lib/constants";
import { Label } from "@/components/ui/label";
import { SelectItem } from "@/components/ui/select";
import FileUploader from "@/components/fileUploader";
import { registerPatient } from "@/actions/patient.actions";

const RegisterForm = ({ user }: { user: User }) => {
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  console.log(user.$id);

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    setIsLoading(true);

    let formData;

    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };

      const patient = await registerPatient(patientData);

      if (patient) router.push(`/patients/${user.$id}/new-appointment`);
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
        className="text-white space-y-12"
      >
        <section className="mb-12 space-y-6">
          <h1 className="text-2xl font-bold">Welcome &#128075;</h1>
          <p className="text-dark-700">Let us know more about yourself</p>
        </section>

        <section className="space-y-6">
          <div className="mb-8 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>
        <CustomFormField
          control={form.control}
          name="name"
          placeholder="Full name"
          label="Full name"
          fieldType={FormFieldType.INPUT}
          iconSrc="/assets/icons/user.svg"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            name="birthDate"
            label="Date of Birth"
            fieldType={FormFieldType.DATE_PICKER}
          />
          <CustomFormField
            control={form.control}
            name="gender"
            label="Gender"
            fieldType={FormFieldType.SKELETON}
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem
                        value={option}
                        id={option}
                        className="text-green-500"
                      />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            name="address"
            placeholder="jl.Teuku umar no 11, Kedaton"
            label="Address"
            fieldType={FormFieldType.INPUT}
          />
          <CustomFormField
            control={form.control}
            name="occupation"
            placeholder="Product Manager"
            label="Occupation"
            fieldType={FormFieldType.INPUT}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            name="emergencyContactName"
            placeholder="Guardian's name"
            label="Emergency contact name"
            fieldType={FormFieldType.INPUT}
          />
          <CustomFormField
            control={form.control}
            name="emergencyContactNumber"
            label="Emergency contact number"
            placeholder="+62 852 1113 9783"
            fieldType={FormFieldType.PHONE_INPUT}
          />
        </div>
        <section className="space-y-6">
          <div className="mb-8 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="primaryPhysician"
          label="Primary Physician"
          placeholder="Select a physician"
        >
          {Doctors.map((doctor) => (
            <SelectItem key={doctor.name} value={doctor.name}>
              <div className="flex cursor-pointer item-center gap-x-2">
                <Image
                  alt={doctor.name}
                  src={doctor.image}
                  width={24}
                  height={24}
                  className="rounded-full border border-dark-500"
                />
                <p className="text-white">{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            name="insuranceProvider"
            placeholder="AIA"
            label="Insurance provider"
            fieldType={FormFieldType.INPUT}
          />
          <CustomFormField
            control={form.control}
            name="insurancePolicyNumber"
            placeholder="ACC00124353"
            label="Insurance Policy Number"
            fieldType={FormFieldType.INPUT}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            name="allergies"
            placeholder="Peanuts and Penicillin"
            label="Allergies (if any)"
            fieldType={FormFieldType.TEXTAREA}
          />
          <CustomFormField
            control={form.control}
            name="currentMedication"
            placeholder="Ibuprofen 200mg"
            label="Current meditation (if any)"
            fieldType={FormFieldType.TEXTAREA}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            control={form.control}
            name="familyMedicalHistory"
            placeholder="Family medical history, Mother had brain cancer "
            label="Family medical history"
            fieldType={FormFieldType.TEXTAREA}
          />
          <CustomFormField
            control={form.control}
            name="pastMedicalHistory"
            placeholder="Appendectomy, Tonsillectomy"
            label="Past medical history"
            fieldType={FormFieldType.TEXTAREA}
          />
        </div>

        <section className="space-y-6">
          <div className="mb-8 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>
        </section>

        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.SELECT}
          name="identificationType"
          label="Identification type"
          placeholder="Select an identification type"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem key={type} value={type} className="text-white">
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          control={form.control}
          name="identificationNumber"
          placeholder="1622043783425"
          label="Identification number"
          fieldType={FormFieldType.INPUT}
        />

        <CustomFormField
          control={form.control}
          name="identificationDocument"
          label="Scanned copu of identification document"
          fieldType={FormFieldType.SKELETON}
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <section className="space-y-6">
          <div className="mb-8 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I consent to treatment"
        />
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to disclosure of information"
        />
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I consent to privacy policy"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
