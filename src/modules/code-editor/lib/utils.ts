import { StatusResult, TestResult } from "../types";

export function getErrorMessage(results: TestResult[]) {
    for (const result of results) {
        if (result.error.includes(StatusResult.RuntimeError)) {
            return StatusResult.RuntimeError;
        }
        if (result.error.includes(StatusResult.CompilationError)) {
            return StatusResult.CompilationError;
        }
        if (result.error.includes(StatusResult.Error)) {
            return StatusResult.Error;
        }

        if (result.error) {
            return "Error";
        }
    }
    return "";
}

export function getOverallStatus(results: TestResult[]) {
    if (!results.length) {
        return null;
    }

    const errorMsg = getErrorMessage(results);
    if (errorMsg) {
        return errorMsg;
    }

    const hasTimeLimitExceeded = results.some(
        (result) => result.status === StatusResult.TimeLimitExceeded,
    );

    if (hasTimeLimitExceeded) {
        return StatusResult.TimeLimitExceeded;
    }

    const hasWrongAnswer = results.some(
        (result) => result.status !== StatusResult.Accepted,
    );

    return hasWrongAnswer ? StatusResult.WrongAnswer : StatusResult.Accepted;
}

export function highlightDiff(output: string, expected: string) {
    if (output === expected) return { output, expected };

    try {
        const outputParsed = JSON.parse(output);
        const expectedParsed = JSON.parse(expected);

        if (Array.isArray(outputParsed) && Array.isArray(expectedParsed)) {
            const outputHighlighted = outputParsed.map((item, index) => {
                const isDiff = expectedParsed[index] !== item;
                return { value: item, color: isDiff ? "text-red-500" : "" };
            });

            const expectedHighlighted = expectedParsed.map((item, index) => {
                const isDiff = outputParsed[index] !== item;
                return { value: item, color: isDiff ? "text-green-500" : "" };
            });

            return { outputHighlighted, expectedHighlighted };
        }
    } catch {
        console.log("Error parsing JSON for diff highlighting");
        // toast.error("Value invalid");
    }

    return { output, expected };
}

export function formatTime(value: number) {
    const numberFormatter = new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 1,
    });

    if (value < 1) {
        return `${numberFormatter.format(value * 1000)} ms`;
    } else {
        return `${numberFormatter.format(value)} s`;
    }
}
