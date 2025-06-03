"use server";

import { JUDGE0_LANGUAGE_ID_MAP } from "../constants";
import { ApiResponse } from "../types";

type Props = {
    languageId: number;
    sourceCode: string;
    stdin?: string;
    expectedOutput?: string;
};

export const runCode = async ({
    languageId,
    sourceCode,
    stdin,
    expectedOutput,
}: Props) => {
    const response = await fetch(
        `${process.env.SERVER_EXECUTION_URL}/submissions?base64_encoded=false&wait=true`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                language_id: languageId,
                source_code: sourceCode,
                stdin,
                expected_output: expectedOutput,
                cpu_time_limit: 1.0,
                cpu_extra_time: 0.5,
                wall_time_limit: 2.0,
            }),
        },
    );

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Execution error: ${response.status} - ${text}`);
    }

    const result = await response.json();
    return result as ApiResponse;
};

export const runCodeWithJudge0 = async ({
    languageId,
    sourceCode,
    stdin,
    expectedOutput,
}: Props) => {
    const languageIdJudge0 = JUDGE0_LANGUAGE_ID_MAP[languageId.toString()];

    const response = await fetch(
        `https://${process.env.RAPIDAPI_HOST}/submissions?base64_encoded=false&wait=true`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-RapidAPI-Key": process.env.RAPIDAPI_KEY || "",
                "X-RapidAPI-Host": process.env.RAPIDAPI_HOST || "",
            },
            body: JSON.stringify({
                language_id: languageIdJudge0,
                source_code: sourceCode,
                stdin,
                expected_output: expectedOutput,
            }),
        },
    );

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Execution error: ${response.status} - ${text}`);
    }

    const result = await response.json();

    return result as ApiResponse;
};
