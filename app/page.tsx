import PatientForm from "@/components/forms/patientForm";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP */}
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[496px] flex-1 ">
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
          <PatientForm />
          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              &copy; 2025 beCare
            </p>
            <Link href={"/?admin=true"} className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src={"/assets/images/onboarding-img.png"}
        height={1000}
        width={1000}
        priority
        alt="patient"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
