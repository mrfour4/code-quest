import { TestCaseTab } from "@/modules/document/types";
import { atom } from "jotai";

export const activeTabAtom = atom<TestCaseTab>(TestCaseTab.TestCase);
