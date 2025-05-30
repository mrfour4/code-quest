import isEqual from "fast-deep-equal";
import { JUDGE0_LANGUAGE_ID_MAP } from "../constants";

type InputTestCase = {
    id: string;
    label: string;
    value: string;
};

type TestCase = {
    id: string;
    inputs: InputTestCase[];
    expected: string;
};

type TestResult = {
    testCaseId: string;
    output: string;
    expected: string;
    status: "accepted" | "wrong_answer" | "error";
    runtime: number;
    error?: string;
};

const JUDGE0_API_URL = "https://ce.judge0.com";

export async function runAllTestCasesWithJudge0(
    language: string,
    userCode: string,
    testCases: TestCase[],
): Promise<TestResult[]> {
    const languageId = JUDGE0_LANGUAGE_ID_MAP[language];
    if (!languageId) throw new Error(`Unsupported language: ${language}`);

    const results: TestResult[] = [];

    for (const testCase of testCases) {
        const inputs = testCase.inputs.map((i) => {
            try {
                return JSON.parse(i.value);
            } catch {
                return i.value;
            }
        });

        const stdin = inputs.map((i) => JSON.stringify(i)).join("\n");

        const submissionPayload = {
            language_id: languageId,
            source_code: userCode,
            stdin,
            expected_output: undefined, // optional
            redirect_stderr_to_stdout: true,
        };

        const submissionRes = await fetch(
            `${JUDGE0_API_URL}/submissions?base64_encoded=false&wait=true`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submissionPayload),
            },
        );

        const start = Date.now();
        const submissionData = await submissionRes.json();
        const runtime = Date.now() - start;

        const rawOutput = submissionData.stdout?.trim() || "";
        const expected = testCase.expected.trim();

        let parsedOutput, parsedExpected;

        try {
            parsedOutput = JSON.parse(rawOutput);
        } catch {
            parsedOutput = rawOutput;
        }

        try {
            parsedExpected = JSON.parse(expected);
        } catch {
            parsedExpected = expected;
        }

        const status: TestResult["status"] = isEqual(
            parsedOutput,
            parsedExpected,
        )
            ? "accepted"
            : "wrong_answer";

        results.push({
            testCaseId: testCase.id,
            output: rawOutput,
            expected,
            status,
            runtime,
            error:
                submissionData.stderr ||
                submissionData.compile_output ||
                undefined,
        });
    }

    return results;
}

export function generateStdinFromInputs(inputs: InputTestCase[]): string {
    return inputs.map((input) => input.value).join("\n");
}

export async function runJudge0({
    languageId,
    sourceCode,
    stdin,
}: {
    languageId: number;
    sourceCode: string;
    stdin: string;
}) {
    const response = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key":
                    """",
                "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            },
            body: JSON.stringify({
                language_id: languageId,
                source_code: sourceCode,
                stdin,
            }),
        },
    );

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Judge0 error: ${response.status} - ${text}`);
    }

    const result = await response.json();
    return result;
}
