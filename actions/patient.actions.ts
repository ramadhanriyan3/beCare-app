"use server";

import { InputFile } from "node-appwrite/file";

import {
  Query,
  users,
  ID,
  ENDPOINT,
  storage,
  BUCKET_ID,
  databases,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
} from "../lib/appwrite.config";
import { parseStringify } from "../lib/utils";

export const createUser = async (userData: CreateUserParams) => {
  console.log({ ENDPOINT, NAMA: process.env.NEXT_PUBLIC_ENDPOINT });
  try {
    const newUser = await users.create(
      ID.unique(),
      userData.email,
      userData.phone,
      undefined,
      userData.name
    );

    console.log({ newUser });

    return parseStringify(newUser);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([
        Query.equal("email", [userData.email]),
      ]);

      return documents?.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log({ getUsr: error });
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patient = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", userId)]
    );
    return parseStringify(patient.documents[0]);
  } catch (error) {
    console.log({ getUsr: error });
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    let file;

    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("name") as string
      );
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.log({
      PATIENT_REGISTER: error,
    });
  }
};
