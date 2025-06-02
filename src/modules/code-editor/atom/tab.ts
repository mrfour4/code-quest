import { TestCaseTab } from "@/modules/document/components/types";
import { atom } from "jotai";

export const activeTabAtom = atom<TestCaseTab>(TestCaseTab.TestCase);
