import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import ProfileComponent from "./_components/ProfileComponent";
import { auth } from "@clerk/nextjs/server";
import { Preloaded } from "convex/react";
const ProfileInfo = async () => {
  const { userId } = await auth();
    const userInfo: Preloaded<typeof api.users.readUser> = await preloadQuery(api.users.readUser, { userId: userId! });
    return (
        <div>
            <ProfileComponent 
             userInfo={userInfo}
            />
        </div>
    );
}

export default ProfileInfo;
