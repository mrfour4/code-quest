import { nanoid } from "nanoid";
import { InputTestCase, Language, TestCase } from "../types";

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

export const LANGUAGES: Language[] = [
    { id: 63, label: "JavaScript", value: "javascript" },
    { id: 71, label: "Python", value: "python" },
    { id: 60, label: "Go", value: "go" },
    { id: 62, label: "Java", value: "java" },
    { id: 54, label: "C++", value: "cpp" },
    { id: 51, label: "C#", value: "csharp" },
];

export const JUDGE0_LANGUAGE_ID_MAP: Record<string, number> = {
    63: 102, // JavaScript (Node.js 22.08.0)
    71: 109, // Python (3.13.2)
    60: 107, // Go (1.23.5)
    62: 91, // Java (JDK 17.0.6)
    54: 54, // C++ (GCC 14.1.0)
    51: 51, // C# (Mono
};
