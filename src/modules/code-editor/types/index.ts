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
    status: string;
    runtime: number;
    error: string;
};

export enum StatusResult {
    Accepted = "Accepted",
    WrongAnswer = "Wrong Answer",
    Error = "Error",
    CompilationError = "Compilation Error",
    RuntimeError = "Runtime Error",
    TimeLimitExceeded = "Time Limit Exceeded",
}

export type Language = {
    id: number;
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

export type ApiResponse = {
    stdout: string;
    time: string;
    memory: number;
    stderr: string | null;
    token: string;
    compile_output: string | null;
    message: string | null;
    status: {
        id: number;
        description: string;
    };
    error?: string | null;
};
