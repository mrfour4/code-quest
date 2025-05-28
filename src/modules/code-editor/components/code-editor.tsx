"use client";

import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";
import { Editor, OnMount } from "@monaco-editor/react";
import { AlignLeft, Loader2, Play, RotateCcw } from "lucide-react";
import { editor } from "monaco-editor";
import { useRef, useState } from "react";
import { ActionSelector } from "./action-selector";
import { LanguageSelector } from "./language-selector";

const sampleCode = `function twoSum(nums, target) {
  const pairIdx = {};
  
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (target - num in pairIdx) {
      return [i, pairIdx[target - num]];
    }
    pairIdx[num] = i;
  }
};`;

export const CodeEditor = () => {
    const clerk = useClerk();

    const [language, setLanguage] = useState("javascript");
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    if (!clerk.loaded) {
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
        console.log("Editor content changed:", value);
    };

    const onLanguageChange = (value: string) => {
        setLanguage(value);
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
            <div className="flex items-center justify-between p-1">
                <LanguageSelector
                    value={language}
                    onChange={onLanguageChange}
                />
                <div className="flex items-center gap-2">
                    <ActionSelector title="Format Code" onClick={onFormatCode}>
                        <AlignLeft />
                    </ActionSelector>
                    <ActionSelector
                        title="Reset Editor"
                        onClick={() => {
                            console.log("Reset editor action triggered");
                            // Implement reset editor logic here
                        }}
                    >
                        <RotateCcw />
                    </ActionSelector>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="mr-4 cursor-pointer bg-green-600 text-white dark:hover:bg-green-700"
                    >
                        <Play />
                        Run Code
                    </Button>
                </div>
            </div>
            <div className="h-full overflow-hidden">
                <Editor
                    height="100%"
                    onMount={onMount}
                    language={language}
                    defaultValue={sampleCode}
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
                    }}
                />
            </div>
        </div>
    );
};
