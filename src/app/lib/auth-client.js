import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields, adminClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: process.env.BETTER_AUTH_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        role: { type: "string", required: true },
        phone: { type: "string", required: true },
        gender: { type: "string", required: true },
        photo: { type: "string", required: false },
        status: { type: "string", required: true },
      },
    }),
    adminClient()
  ],
})