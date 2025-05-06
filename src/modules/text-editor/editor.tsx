"use client";

import {
    FloatingToolbar,
    useLiveblocksExtension,
} from "@liveblocks/react-tiptap";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Threads } from "./threads";

export function Editor() {
    const liveblocks = useLiveblocksExtension({
        offlineSupport_experimental: true,
    });

    const editor = useEditor({
        extensions: [
            liveblocks,
            StarterKit.configure({
                // The Liveblocks extension comes with its own history handling
                history: false,
            }),
        ],
        immediatelyRender: false,
        editable: false,
    });

    const canWrite = useSelf((me) => me.canWrite) || false;

    const others = useOthers((others) => others.length);

    if (editor && editor.isEditable !== canWrite) {
        editor.setEditable(canWrite);
    }

    return (
        <div>
            <EditorContent editor={editor} className="editor" />
            <Threads editor={editor} />
            <FloatingToolbar editor={editor} />
        </div>
    );
}
