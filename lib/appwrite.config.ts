import * as sdk from "node-appwrite";

const PROJECT_ID = process.env.PROJECT_ID;
const API_KEY = process.env.API_KEY;
const DATABASE_ID = process.env.DATABASE_ID;
const PATIENT_COLLECTION_ID = process.env.PATIENT_COLLECTION_ID;
const DOCTOR_COLLECTION_ID = process.env.DOCTOR_COLLECTION_ID;
const APPOINTMENT_COLLECTION_ID = process.env.APPOINTMENT_COLLECTION_ID;
const BUCKET_ID = process.env.NEXT_PUBLIC_BUCKET_ID;
const ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT;

const client = new sdk.Client()
  .setEndpoint(ENDPOINT!)
  .setKey(API_KEY!)
  .setProject(PROJECT_ID!);

const databases = new sdk.Databases(client);
const storage = new sdk.Storage(client);
const messaging = new sdk.Messaging(client);
const account = new sdk.Account(client);
const users = new sdk.Users(client);

export { databases, storage, messaging, account, users };
export {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  BUCKET_ID,
  ENDPOINT,
};
export { ID, Query } from "node-appwrite";
