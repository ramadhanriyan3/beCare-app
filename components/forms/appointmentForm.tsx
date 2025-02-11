"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/customFormField";
import SubmitButton from "@/components/submitButton";
import { SelectItem } from "@/components/ui/select";
import { getAppointmentSchema } from "@/lib/validation";
import { FormFieldType } from "@/types/formField.types";
import { Doctors } from "@/lib/constants";
import { createAppointment } from "@/actions/appointment.action";

interface AppointmentFormProps {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
}

const AppointmentForm = ({ userId, patientId, type }: AppointmentFormProps) => {
  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      reason: "",
      note: "",
      schedule: new Date(),
      cancellationReason: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "canceled";
        break;

      default:
        status = "pending";
        break;
    }

    try {
      if (type === "create" && patientId) {
        const appointmentData = {
          userId,
          patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          note: values.note,
          status: status as Status,
        };
        console.log(appointmentData);
        const appointment = await createAppointment(appointmentData);

        if (appointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${appointment.$id}`
          );
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  let buttonLabel;

  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "create":
      buttonLabel = "Create Appointment";
      break;
    case "schedule":
      buttonLabel = "schedule Appointment";
      break;

    default:
      break;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-white
       space-y-6"
      >
        <section className="mb-12 space-y-4">
          <h1 className="text-2xl font-bold">New Appointment</h1>
          <p className="text-dark-700">
            Request a new appointment in 10 second
          </p>
        </section>
        {type !== "cancel" && (
          <>
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.SELECT}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor) => (
                <SelectItem
                  key={doctor.name}
                  value={doctor.name}
                  className="text-green-500"
                >
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

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Expected appointment date"
              showTimeSelect
              dateFormat="dd/MM/yyyy - h:mm aa"
            />

            <div className="flex flex-col gap-6 xl:flex-row">
              <CustomFormField
                control={form.control}
                name="reason"
                placeholder="Enter reason for appointment"
                label="Reason for appointment"
                fieldType={FormFieldType.TEXTAREA}
              />
              <CustomFormField
                control={form.control}
                name="note"
                placeholder="Notes"
                label="enter notes"
                fieldType={FormFieldType.TEXTAREA}
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <CustomFormField
            control={form.control}
            name="cancellationReason"
            placeholder="Enter reason for cancellation"
            label="Enter reason for cancellation"
            fieldType={FormFieldType.TEXTAREA}
          />
        )}

        <SubmitButton
          className={`text-white  w-full ${
            type === "cancel"
              ? "shad-danger-button bg-red-800"
              : "shad-primary-button bg-green-500"
          }`}
          isLoading={isLoading}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
