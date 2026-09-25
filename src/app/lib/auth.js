import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("medicare");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      accountType: { type: "string", required: true },
      phone: { type: "string", required: true },
      gender: { type: "string", required: true },
      photo: { type: "string", required: false },
      status: { type: "string", required: true },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: (user) => {
          return {
            data: {
              ...user,
              role: user.accountType, // Map accountType to the protected role field
            },
          };
        },
      },
    },
  },
  plugins: [
    admin()
  ],
});