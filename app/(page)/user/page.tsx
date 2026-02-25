"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
const UserInfo = () => {
  const { userId } = useAuth();
    const userInfo = useQuery(api.users.readUser, { userId: userId! });
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            {JSON.stringify(userInfo)}
        </main>
    );
}

export default UserInfo;
