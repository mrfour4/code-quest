"use client";

import dynamic from "next/dynamic";

const CanvasComponent = dynamic(
    () => import("./canvas-content").then((mod) => mod.CanvasContent),
    {
        ssr: false,
        loading: () => <div>Canvas Loading...</div>,
    },
);

export function Canvas() {
    return <CanvasComponent />;
}
