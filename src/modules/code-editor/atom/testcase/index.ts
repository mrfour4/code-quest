import { atom } from "jotai";
import { withImmer } from "jotai-immer";
import { atomFamily, atomWithStorage } from "jotai/utils";
import { nanoid } from "nanoid";
import { INITIAL_TEST_CASE } from "../../constants";
import { TestCase } from "../../types";
import { activeTestCaseIdAtom } from "./active";

export const testCasesAtoms = withImmer(
    atomWithStorage<TestCase[]>("testCases", [INITIAL_TEST_CASE]),
);

export const testCaseDataAtom = atom(null, (_, set, data?: TestCase[]) => {
    set(testCasesAtoms, () => data ?? [INITIAL_TEST_CASE]);
});

export const testCasesFamilyAtom = atomFamily((id: string) =>
    atom(
        (get) => get(testCasesAtoms).find((tc) => tc.id === id),
        (_, set, update: (draft: TestCase) => void) => {
            set(testCasesAtoms, (draft) => {
                const testCase = draft.find((tc) => tc.id === id);
                if (!testCase) return;
                update(testCase);
            });
        },
    ),
);

export const testCaseIdsAtom = atom((get) =>
    get(testCasesAtoms).map((tc) => tc.id),
);

export const cloneTestCaseAtom = atom(null, (get, set) => {
    const id = get(activeTestCaseIdAtom);
    const testCases = get(testCasesFamilyAtom(id));
    if (!testCases) return;

    const newTestCase: TestCase = {
        ...structuredClone(testCases),
        id: nanoid(),
    };

    set(testCasesAtoms, (draft) => {
        draft.push(newTestCase);
    });

    set(activeTestCaseIdAtom, newTestCase.id);
});

export const removeTestCaseAtom = atom(null, (get, set, id: string) => {
    const testCases = get(testCasesAtoms);
    if (testCases.length <= 1) return;

    set(testCasesAtoms, (draft) => {
        return draft.filter((tc) => tc.id !== id);
    });

    set(activeTestCaseIdAtom, get(testCaseIdsAtom)[0]);
});
