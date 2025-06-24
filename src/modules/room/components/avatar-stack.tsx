"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
    ClientSideSuspense,
    useOthers,
    useSelf,
} from "@liveblocks/react/suspense";
import { useMemo } from "react";
import { Avatar } from "./avatar";

export const MAX_AVATARS = 5;

export const Avatars = () => {
    const self = useSelf();
    const others = useOthers();
    const users = useMemo(
        () => (self ? [self, ...others] : others),
        [self, others],
    );

    return (
        <>
            <div className="flex items-center">
                {users.length > MAX_AVATARS ? (
                    <div className="bg-accent flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium text-white">
                        +{users.length - MAX_AVATARS}
                    </div>
                ) : null}

                {users
                    .slice(0, MAX_AVATARS)
                    .map(({ connectionId, info, id }) => (
                        <Avatar
                            key={connectionId}
                            src={info.avatar}
                            name={self.id === id ? "You" : info.name}
                            color={info.color}
                        />
                    ))}
            </div>
        </>
    );
};

export const AvatarSkeleton = () => {
    return <Skeleton className="size-8 rounded-full" />;
};

export const AvatarStack = () => {
    return (
        <ClientSideSuspense fallback={<AvatarSkeleton />}>
            <Avatars />
        </ClientSideSuspense>
    );
};
