import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";


const client = new MongoClient(process.env.MONGO_URI);
const db = client.db("crowdfundingDB");


export const auth = betterAuth({

  emailAndPassword: {
    enabled: true,
  },

  database: mongodbAdapter(db, {
    client
  }),

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "supporter",
      },
    },
  },

 
});