import { betterAuth } from "better-auth";

import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";


const client = new MongoClient(process.env.MONGO_URI);

const db = client.db("crowdfundingDB");



export const auth = betterAuth({

  secret: process.env.BETTER_AUTH_SECRET,


  trustedOrigins: [
    "http://localhost:3000",
    "https://client-beta-ruby-13.vercel.app",
  ],


  emailAndPassword: {
    enabled: true,
  },


  database: mongodbAdapter(db, {
    client,
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