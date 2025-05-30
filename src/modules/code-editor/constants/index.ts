import { nanoid } from "nanoid";
import { InputTestCase, TestCase } from "../types";

export const DEFAULT_TEST_CASE_ID = nanoid();
export const DEFAULT_INPUT_ID = nanoid();

export const INITIAL_INPUT_TEST_CASE: InputTestCase = {
    id: DEFAULT_INPUT_ID,
    label: "arg0",
    value: "",
};

export const INITIAL_TEST_CASE: TestCase = {
    id: DEFAULT_TEST_CASE_ID,
    inputs: [INITIAL_INPUT_TEST_CASE],
    expected: "",
};

export const LANGUAGES = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "csharp", label: "C#" },
];

export const JUDGE0_LANGUAGE_ID_MAP: Record<string, number> = {
    javascript: 102, // JavaScript (Node.js 22.08.0)
    typescript: 101, // TypeScript (5.6.2)
    python: 109, // Python (3.13.2)
    java: 91, // Java (JDK 17.0.6)
    cpp: 105, // C++ (GCC 14.1.0)
    csharp: 51, // C# (Mono 6.6.0.161)
};
