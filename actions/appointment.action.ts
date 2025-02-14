"use server";

import { Appointment } from "@/types/appwrite.types";
import {
  ID,
  databases,
  DATABASE_ID,
  APPOINTMENT_COLLECTION_ID,
  Query,
  users,
} from "../lib/appwrite.config";
import { getMessege, parseStringify } from "../lib/utils";
import { revalidatePath } from "next/cache";
import { sendMail } from "@/lib/nodemailer.config";

export const createAppointment = async (
  appointmentData: CreateAppointmentParams
) => {
  try {
    console.log({ appointmentData });
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointmentData
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.log("Create-Patient", error);
  }
};

export const getAppointmnet = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.log("GET_APPOINTMENT-ACTION", error);
  }
};

export const getAppointmnetList = async () => {
  try {
    const appointmentList = await databases.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initialCounts = {
      scheduleCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (
      appointmentList.documents as unknown as Appointment[]
    ).reduce((acc, appointment) => {
      if (appointment.status === "scheduled") {
        acc.scheduleCount += 1;
      } else if (appointment.status === "pending") {
        acc.pendingCount += 1;
      } else if (appointment.status === "cancelled") {
        acc.cancelledCount += 1;
      }

      return acc;
    }, initialCounts);

    const data = {
      totalCount: appointmentList.total,
      ...counts,
      documents: appointmentList.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.log("GET_APPOINTMENT_LIST", error);
  }
};

export const updateAppointment = async ({
  appointmentId,
  appointment,
  userId,
  type,
}: UpdateAppointmentParams) => {
  try {
    const updatedAppointment = await databases.updateDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId,
      appointment
    );

    if (!updatedAppointment) {
      throw new Error("Appointment not found");
    }

    const user = await users.get(userId);
    const messege = {
      to: user.email,
      subject: `${
        type !== "cancel"
          ? "Appointmetn Schedule Notification"
          : "Appointment Cancellation Notice"
      }`,
      text: getMessege(
        appointment.schedule,
        appointment.primaryPhysician,
        user.name,
        type,
        appointment.cancellationReason
      ),
    };

    const email = await sendMail(messege);
    console.log(email);
    revalidatePath("/admin");

    return parseStringify(updatedAppointment);
  } catch (error) {
    console.log("UPDATE_APPOINTMETN_ACTION", error);
  }
};
