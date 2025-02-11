"use server";

import {
  ID,
  databases,
  DATABASE_ID,
  APPOINTMENT_COLLECTION_ID,
} from "../lib/appwrite.config";
import { parseStringify } from "../lib/utils";

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
