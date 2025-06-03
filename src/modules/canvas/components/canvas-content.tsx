"use client";

import "tldraw/tldraw.css";

import { useSelf } from "@liveblocks/react/suspense";
import { Tldraw } from "tldraw";

import { memo } from "react";
import { useYjsStore } from "../hooks/use-yjs-store";

type Props = {
    isPublished: boolean;
};

export const CanvasContent = memo(function CanvasContent({
    isPublished,
}: Props) {
    const id = useSelf((me) => me.id);
    const info = useSelf((me) => me.info);

    const canWrite = useSelf((me) => me.canWrite);

    const store = useYjsStore({
        user: { id, color: info.color, name: info.name },
    });

    if (isPublished) {
        return (
            <div className="h-full w-full flex-1 border">
                <Tldraw autoFocus inferDarkMode />
            </div>
        );
    }

    return (
        <div className="h-full w-full flex-1 border">
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
