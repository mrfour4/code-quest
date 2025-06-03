"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { LiveMap } from "@liveblocks/client";
import { LiveblocksProvider, RoomProvider } from "@liveblocks/react/suspense";
import { ReactNode } from "react";
import { getDocuments } from "../actions/get-documents";
import { getUsers } from "../actions/get-users";

type Props = {
    children: ReactNode;
    documentId: string;
};

export function Room({ children, documentId }: Props) {
    return (
        <LiveblocksProvider
            throttle={16}
            authEndpoint={async () => {
                const response = await fetch("/api/liveblocks-auth", {
                    method: "POST",
                    body: JSON.stringify({ room: documentId }),
                });

                return await response.json();
            }}
            resolveUsers={async ({ userIds }) => {
                const users = await getUsers();
                return userIds.map((id) => users.get(id));
            }}
            resolveMentionSuggestions={async ({ text }) => {
                const mapUsers = await getUsers();
                let users = Array.from(mapUsers.values());

                if (text) {
                    users = users.filter((user) =>
                        user.name.toLowerCase().includes(text.toLowerCase()),
                    );
                }
                return users.map((user) => user.id);
            }}
            resolveRoomsInfo={async ({ roomIds }) => {
                return await getDocuments(roomIds);
            }}
        >
            <RoomProvider
                id={documentId}
                initialPresence={{ cursor: null, presence: null }}
                initialStorage={{ records: new LiveMap() }}
            >
                <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
            </RoomProvider>
        </LiveblocksProvider>
    );
}
