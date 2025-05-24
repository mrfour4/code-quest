import { type EditorView } from "@tiptap/pm/view";
import { marked } from "marked";
import { handleImagePaste } from "novel";
import { DOMParser as PMDOMParser } from "prosemirror-model";
import { uploadFn } from "../actions/image-upload";

export const onPast = (view: EditorView, event: ClipboardEvent) => {
    const clipboard = event.clipboardData;

    if (!clipboard) {
        return false;
    }

    const text = clipboard.getData("text/plain");
    if (!text) {
        return false;
    }

    const { state } = view;
    const parentNode = state.selection.$from.parent;

    if (parentNode.type.name === "codeBlock") {
        const tr = state.tr.insertText(
            text,
            state.selection.from,
            state.selection.to,
        );
        view.dispatch(tr);
        return true;
    }

    const hasImage = Array.from(clipboard.items).some((item) =>
        item.type.startsWith("image/"),
    );
    if (hasImage) {
        return handleImagePaste(view, event, uploadFn);
    }

    const isMarkdown =
        text.includes("#") || text.includes("**") || text.includes("```");

    if (isMarkdown) {
        const html = marked.parse(text, {
            async: false,
            breaks: true,
            gfm: true,
        });

        const temp = document.createElement("div");
        temp.innerHTML = html;

        const slice = PMDOMParser.fromSchema(state.schema).parse(temp);
        const tr = state.tr.replaceSelectionWith(slice, false);
        view.dispatch(tr);
        return true;
    }
    return false;
};
