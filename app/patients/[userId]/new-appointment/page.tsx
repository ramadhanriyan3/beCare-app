import Image from "next/image";

import AppointmentForm from "@/components/forms/appointmentForm";
import { getPatient } from "@/actions/patient.actions";

const NewAppointmentPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const userId = (await params).userId;
  const patient = await getPatient(userId);

  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px] flex-1 ">
          <div className="flex gap-x-1 items-center mb-12">
            <Image
              src={"/assets/icons/logo-icon.svg"}
              alt="pattient"
              height={1000}
              width={1000}
              className="h-10 w-fit"
            />
            <p className="text-white font-bold text-2xl">beCare</p>
          </div>
          <AppointmentForm
            type="create"
            userId={userId}
            patientId={patient.$id}
          />
          <p className="copyright mt-16">&copy; 2025 beCare</p>
        </div>
      </section>
      <Image
        src={"/assets/images/appointment-img.png"}
        height={1000}
        width={1000}
        priority
        alt="appointment"
        className="side-img max-w-[390px] bg-buttom"
      />
    </div>
  );
};

export default NewAppointmentPage;
