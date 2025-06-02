import { atom } from "jotai";
import { TestResult } from "../../types";

export const resultsAtom = atom<TestResult[]>([]);

export const isRunningAtom = atom(false);
