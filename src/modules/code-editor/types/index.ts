export type TestCase = {
    id: string;
    inputs: { label: string; value: string }[];
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

export type Code = {
    code: string;
    language: string;
};
