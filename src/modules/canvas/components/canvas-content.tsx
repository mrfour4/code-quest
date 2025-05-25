"use client";

import "tldraw/tldraw.css";

import { useSelf } from "@liveblocks/react/suspense";
import { Tldraw } from "tldraw";

import { memo } from "react";
import { useYjsStore } from "../hooks/use-yjs-store";

export const CanvasContent = memo(function CanvasContent() {
    const id = useSelf((me) => me.id);
    const info = useSelf((me) => me.info);

    const canWrite = useSelf((me) => me.canWrite);

    const store = useYjsStore({
        user: { id, color: info.color, name: info.name },
    });

    return (
        <div className="-mt-2 size-full">
            <Tldraw
                store={store}
                autoFocus
                inferDarkMode
                onMount={(editor) => {
                    editor.updateInstanceState({ isReadonly: !canWrite });
                }}
            />
        </div>
    );
});
