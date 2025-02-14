// import { getAppointmnet } from "@/actions/appointment.action";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const AppointmentSuccessPage = async ({
  params,
  searchParams,
}: SearchParamProps) => {
  const { userId } = await params;
  const appointmentId = ((await searchParams)?.appointmentId as string) || "";
  // const appointment = await getAppointmnet(appointmentId)

  console.log({ appointmentId, userId });
  return (
    <div
      className={
        "flex h-screen max-h-screen px-[5%] items-center justify-center"
      }
    >
      <div className="success-img">
        <Link href={"/"}>
          <div className="flex gap-x-1  items-center mb-12">
            <Image
              src={"/assets/icons/logo-icon.svg"}
              alt="pattient"
              height={1000}
              width={1000}
              className="h-10 w-fit"
            />
            <p className="text-white font-bold text-2xl">beCare</p>
          </div>
        </Link>
        <section className="flex flex-col items-center">
          <Image
            src={"/assets/gifs/success.gif"}
            width={300}
            height={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center text-white">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p className="text-white">We will be in touch shortly to confirm.</p>
        </section>
        <section className="request-details text-white">
          <p>Requested appointment details:</p>
          <div className="flex items-center gap-3">
            <Image
              src={"/assets/images/dr-peter.png"}
              alt="doctor"
              width={100}
              height={100}
              className={"size-6"}
            />
            <p className="whitespace-nowrap">Dr. Peter</p>
            <div className="flex gap-2">
              <Image
                src={"/assets/icons/calendar.svg"}
                alt="calendar"
                width={24}
                height={24}
              />
              <p>disini memberikan waktu schedule</p>
            </div>
          </div>
        </section>
        <Button className="shad-primary-btn" variant={"outline"} asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>

        <p className="justify-items-end text-dark-600 xl:text-left">
          &copy; 2025 beCare
        </p>
      </div>
    </div>
  );
};

export default AppointmentSuccessPage;
