import { toast } from "sonner";
import { TestResult } from "../types";

export function getOverallStatus(results: TestResult[]) {
    if (!results.length) {
        return null;
    }

    const hasAccepted = results.some((result) => result.status === "accepted");
    if (hasAccepted) {
        return "accepted";
    }

    const hasError = results.some((result) => result.status === "error");
    if (hasError) {
        return "error";
    }

    return "wrong_answer";
}

export function getStatusColor(status: string) {
    switch (status) {
        case "accepted":
            return "text-green-400";
        case "wrong_answer":
            return "text-red-400";
        case "error":
            return "text-red-400";
        default:
            return "text-gray-400";
    }
}

export function getStatusText(status: string) {
    switch (status) {
        case "accepted":
            return "Accepted";
        case "wrong_answer":
            return "Wrong Answer";
        case "error":
            return "Error";
        default:
            return "Unknown";
    }
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
        // If not valid JSON, return as is
        toast.error("Value invalid");
    }

    return { output, expected };
}
