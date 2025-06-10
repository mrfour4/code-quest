"use client";

import { useMounted } from "@/hooks/use-mounted";
import { Editor, OnMount } from "@monaco-editor/react";
import { useAtom } from "jotai";
import { AlignLeft, Loader2 } from "lucide-react";
import { editor } from "monaco-editor";
import { useRef } from "react";
import { toast } from "sonner";
import { codeAtom } from "../atom/code";
import { languagesAtom } from "../atom/language";
import { LANGUAGES } from "../constants";
import { ActionSelector } from "./action-selector";
import { LanguageSelector } from "./language-selector";
import { PublishButton } from "./publish-btn";
import { ResetCodeButton } from "./reset-code";
import { RunCodeButton } from "./run-btn";

export const CodeEditor = () => {
    const mounted = useMounted();

    const [language, setLanguage] = useAtom(languagesAtom);
    const [code, setCode] = useAtom(codeAtom);
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    if (!mounted) {
        return (
            <div className="bg-border flex size-full items-center justify-center rounded-b-md border border-t-0">
                <Loader2 className="text-muted-foreground size-6 animate-spin" />
            </div>
        );
    }

    const onMount: OnMount = (editor) => {
        editorRef.current = editor;
    };

    const onChange = (value?: string) => {
        setCode(value || "");
    };

    const onLanguageChange = (value: string) => {
        const selectedLanguage = LANGUAGES.find((lang) => lang.value === value);

        if (!selectedLanguage) {
            toast.error("Unsupported language selected.");
            return;
        }

        setLanguage(selectedLanguage);
    };

    const onFormatCode = () => {
        if (editorRef.current) {
            editorRef.current.trigger(
                "source",
                "editor.action.formatDocument",
                {},
            );
        }
    };

    return (
        <div className="bg-border flex h-full flex-col overflow-hidden rounded-b-md border">
            <div className="flex items-center justify-between p-1 pr-3">
                <LanguageSelector
                    value={language.value}
                    onChange={onLanguageChange}
                />
                <div className="flex items-center gap-2">
                    <ActionSelector title="Format Code" onClick={onFormatCode}>
                        <AlignLeft />
                    </ActionSelector>
                    <ResetCodeButton />

                    <RunCodeButton />
                    <PublishButton />
                </div>
            </div>
            <div className="h-full overflow-hidden">
                <Editor
                    height="100%"
                    onMount={onMount}
                    language={language.value}
                    value={code}
                    onChange={onChange}
                    theme="vs-dark"
                    options={{
                        fontSize: 15,
                        fontWeight: "400",
                        automaticLayout: true,
                        scrollBeyondLastLine: false,
                        padding: { top: 20, bottom: 16 },
                        fontFamily: "Fira Code",
                        fontLigatures: true,
                        cursorBlinking: "smooth",
                        smoothScrolling: true,
                        lineHeight: 1.4,
                        renderWhitespace: "none",
                        minimap: { enabled: false },
                        contextmenu: false,
                        scrollbar: {
                            verticalScrollbarSize: 8,
                            horizontalScrollbarSize: 8,
                        },
                        stickyScroll: {
                            enabled: false,
                        },
                        wordWrap: "on",
                    }}
                />
            </div>
        </div>
    );
};
