import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect } from "react";


export const useHandleUser = () => {
    const { user } = useUser();
    const saveUser = useMutation(api.users.saveUser);

    useEffect(() => {
        if (user) {
        saveUser({
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress || "",
            firstName: user.firstName || undefined,
            lastName: user.lastName || undefined,
            createdAt: Date.now(),
        });
        }
    }, [user, saveUser]);

    return null; // No UI needed
}
  