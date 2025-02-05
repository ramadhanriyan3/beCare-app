import RegisterForm from "@/components/forms/registerForm";
import { getUser } from "@/actions/patient.actions";
import Image from "next/image";

const RegisterPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const userId = (await params).userId;
  const user = await getUser(userId);

  return (
    <div className="flex h-screen max-h-screen">
      {/* TODO: OTP */}
      <section className="remove-scrollbar container ">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
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
          <RegisterForm user={user} />
          <p className="copyright mt-16">&copy; 2025 beCare</p>
        </div>
      </section>
      <Image
        src={"/assets/images/register-img.png"}
        height={1000}
        width={1000}
        priority
        alt="patient"
        className="side-img max-w-[390px] min-h-full"
      />
    </div>
  );
};

export default RegisterPage;
