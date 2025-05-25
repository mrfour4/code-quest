"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { CanvasContent } from "./canvas-content";

export function Canvas() {
    return (
        <ClientSideSuspense fallback={<div>Canvas loading....</div>}>
            <CanvasContent />
        </ClientSideSuspense>
    );
}
