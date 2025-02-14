import Link from "next/link";
import Image from "next/image";
import StatCard from "@/components/statCard";
import { getAppointmnetList } from "@/actions/appointment.action";
import DataTable from "@/components/table/dataTable";
import { appointmentColumns } from "@/components/table/appointmentColumns";

const AdminPage = async () => {
  const appointments = await getAppointmnetList();

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href={"/admin"} className="cursor-pointer">
          <div className="flex gap-x-1  items-center">
            <Image
              src={"/assets/icons/logo-icon.svg"}
              alt="pattient"
              height={32}
              width={162}
              className="h-8 w-fit"
            />
            <p className="text-white font-bold text-2xl">beCare</p>
          </div>
          <p className="text-16-semibold text-white">Admin Dashboard</p>
        </Link>
      </header>
      <main className="admin-main ">
        <section className="w-full space-y-4 text-white">
          <h1 className="header">Welcome &#128075;</h1>
          <p className="text-dark-700">
            Start the day managing new appointments
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="appointments"
            count={appointments.scheduleCount}
            label="Schedule appointment"
            icon="/assets/icons/appointments.svg"
          />
          <StatCard
            type="pending"
            count={appointments.pendingCount}
            label="Pending appointment"
            icon="/assets/icons/pending.svg"
          />
          <StatCard
            type="cancelled"
            count={appointments.cancelledCount}
            label="Cancelled appointment"
            icon="/assets/icons/cancelled.svg"
          />
        </section>
        <DataTable columns={appointmentColumns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default AdminPage;
