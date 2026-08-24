import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("medicare_db");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: { type: "string", required: true },
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user, ctx) => {
          const body = ctx?.body ?? {};

          try {
            if (user.role === "doctor") {
              await db.collection("doctors").insertOne({
                userId: user.id,
                name: user.name,
                role: body.role,
                specialization: body.specialization,
                qualifications: body.qualifications,
                experience: body.experience,
                consultationFee: body.consultationFee,
                hospitalName: body.hospitalName,
                profileImage: body.profileImage,
                availableDays: body.availableDays,
                availableSlots: body.availableSlots,
                verificationStatus: "Pending",
                createdAt: new Date(),
              });
            } else {
              await db.collection("patients").insertOne({
                userId: user.id,
                role: body.role,
                name: user.name,
                phone: body.phone,
                gender: body.gender,
                photo: body.photo,
                plan: 'N/A',
                createdAt: new Date(),
              });
            }
            
          } catch (err) {
            // Log but don't throw — the user was already created;
            // an error here shouldn't fail sign-up itself.
            console.error("Failed to create profile document:", err);
          }
        },
      },
    },
  },
});
