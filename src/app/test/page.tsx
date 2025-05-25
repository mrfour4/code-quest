"use client";

import { Button } from "@/components/ui/button";
import { Editor, OnMount } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import { Fira_Code } from "next/font/google";
import { useRef } from "react";

const firaCode = Fira_Code({
    subsets: ["latin"],
    variable: "--font-fira-code",
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

export default function VSCodeEditorDemo() {
    const sampleCode = `function greet(name: string): void {
  console.log(\`Hello, \${name}!\`);
  const sum = (a: number, b: number): number => a + b;
  console.log("1 + 2 =", sum(1, 2));
}
greet("world");
`;
    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    const onMount: OnMount = (editor) => {
        editorRef.current = editor;
    };

    const onFormatCode = () => {
        if (editorRef.current) {
            editorRef.current.getAction("editor.action.formatDocument")?.run();
        }
    };

    return (
        <div className={`h-screen w-full ${firaCode.variable}`}>
            <Button onClick={onFormatCode} className={firaCode.className}>
                Format Code
            </Button>
            <Editor
                onMount={onMount}
                defaultLanguage="typescript"
                defaultValue={sampleCode}
                theme="vs-dark"
                options={{
                    fontSize: 14,
                    fontFamily: "JetBrains Mono",
                    fontLigatures: true,
                    lineHeight: 22,
                    letterSpacing: 0.5,
                    automaticLayout: true,
                    smoothScrolling: true,
                    scrollBeyondLastLine: true,
                    cursorBlinking: "blink",
                    renderLineHighlight: "line",
                    renderWhitespace: "boundary",
                    minimap: { enabled: true },
                    scrollbar: {
                        verticalScrollbarSize: 10,
                        horizontalScrollbarSize: 10,
                    },
                    wordWrap: "off",
                    lineNumbers: "on",
                    tabSize: 2,
                    insertSpaces: true,
                    folding: true,
                    guides: {
                        indentation: true,
                    },
                }}
            />
        </div>
    );
}
