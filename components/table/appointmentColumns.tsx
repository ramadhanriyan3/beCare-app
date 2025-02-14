"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Appointment } from "@/types/appwrite.types";

import StatusBadge from "../statusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "@/lib/constants";
import Image from "next/image";
import AppointmentModal from "../appointmentModal";
// import Image from "next/image";

export const appointmentColumns: ColumnDef<Appointment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-x-2">
          {/* <Image
            alt="patient-image"
            src={"/"}
            width={20}
            height={20}
            className={"rounded-full"}
          /> */}
          <p className="text-white">{row.original.patient.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => {
      const schedule = row.getValue("schedule") as string;
      return (
        <p className="text-14-regular min-w-[100px]">
          {formatDateTime(schedule).dateTime}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as Status;
      return (
        <div className={"min-w-[115px]"}>
          <StatusBadge status={status} />
        </div>
      );
    },
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doc) => doc.name === row.original.primaryPhysician
      );
      return (
        <div className="flex items-center gap-2">
          <Image
            src={doctor?.image as string}
            alt={doctor?.name as string}
            width={100}
            height={100}
            className="size-8"
          />
          <p className="whitespace-nowrap">{doctor?.name}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex gap-x-2">
          <AppointmentModal
            type="schedule"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            title="Schedule Appointment"
            description="Please confirm the following details to scheduled an appointment"
          />
          <AppointmentModal
            type="cancel"
            patientId={data.patient.$id}
            userId={data.userId}
            appointment={data}
            title="Cancel Appointment"
            description="Are you sure you want to cancel this appointment?"
          />
        </div>
      );
    },
  },
];
