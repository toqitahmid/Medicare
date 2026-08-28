"use server";
import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

export const getUserSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user || null;
};

export const requiredRole = async (role) => {
  const user = await getUserSession();
  console.log("=== requiredRole DEBUG ===");
  console.log("Required role passed in:", role);
  console.log("Actual user object:", user);
  console.log("user?.role:", user?.role);
  console.log("Match?", user?.role === role);

  if (user?.role !== role) {
    return redirect("/unauthorized");
  }
};
