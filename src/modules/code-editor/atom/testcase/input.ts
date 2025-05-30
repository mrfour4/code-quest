import { atom } from "jotai";
import { nanoid } from "nanoid";
import { testCasesFamilyAtom } from ".";
import { InputTestCase, TestCase } from "../../types";
import { activeTestCaseIdAtom } from "./active";

export const addInputToTestCase = atom(null, (get, set) => {
    const testCaseId = get(activeTestCaseIdAtom);
    const testCaseAtom = testCasesFamilyAtom(testCaseId);
    const testCase = get(testCaseAtom);
    if (!testCase) return;

    const newInput: InputTestCase = {
        id: nanoid(),
        label: `arg${testCase.inputs.length}`,
        value: "",
    };

    set(testCaseAtom, (draft: TestCase) => {
        draft.inputs.push(newInput);
    });
});

export const removeInputFromTestCase = atom(null, (get, set, id: string) => {
    const testCaseId = get(activeTestCaseIdAtom);
    const testCaseAtom = testCasesFamilyAtom(testCaseId);
    const testCase = get(testCaseAtom);
    if (!testCase || testCase.inputs.length === 0) return;

    set(testCaseAtom, (draft: TestCase) => {
        draft.inputs = draft.inputs.filter((input) => input.id !== id);
    });
});

export const updateInputInTestCase = atom(
    null,
    (get, set, id: string, field: "label" | "value", value: string) => {
        const testCaseId = get(activeTestCaseIdAtom);
        const testCaseAtom = testCasesFamilyAtom(testCaseId);
        const testCase = get(testCaseAtom);
        if (!testCase) return;

        set(testCaseAtom, (draft: TestCase) => {
            const input = draft.inputs.find((input) => input.id === id);
            if (input) {
                input[field] = value;
            }
        });
    },
);

export const updateExpectedInTestCase = atom(
    null,
    (get, set, value: string) => {
        const testCaseId = get(activeTestCaseIdAtom);
        const testCaseAtom = testCasesFamilyAtom(testCaseId);
        const testCase = get(testCaseAtom);
        if (!testCase) return;

        set(testCaseAtom, (draft: TestCase) => {
            draft.expected = value;
        });
    },
);
