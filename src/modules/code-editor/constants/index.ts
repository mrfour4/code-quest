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
