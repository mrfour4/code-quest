"use server";

import { getUserInfo } from "@/lib/utils";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { User } from "../types";

export async function getUsers() {
    const { orgId } = await auth();

    const clerk = await clerkClient();

    const memberships = await clerk.users.getUserList({
        organizationId: orgId ? [orgId] : undefined,
    });

    const user = await currentUser();
    const currentUserInfo = getUserInfo(user!);

    const users: Map<string, User> = memberships.data.reduce(
        (acc, user) => {
            const info = getUserInfo(user);
            acc.set(user.id, info);
            return acc;
        },
        new Map().set(currentUserInfo.id, currentUserInfo),
    );

    return users;
}
