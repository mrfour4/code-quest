import { highlightDiff } from "../lib/utils";

export type InputTestCase = {
    id: string;
    label: string;
    value: string;
};

export type TestCase = {
    id: string;
    inputs: InputTestCase[];
    expected: string;
};

export type TestResult = {
    testCaseId: string;
    output: string;
    expected: string;
    status: "accepted" | "wrong_answer" | "error";
    runtime: number;
    error?: string;
};

export type Language = {
    label: string;
    value: string;
};

export type Code = {
    code: string;
    language: string;
};

type DiffContent = ReturnType<typeof highlightDiff>;
export type DiffValue =
    | DiffContent["expectedHighlighted"]
    | DiffContent["outputHighlighted"];
