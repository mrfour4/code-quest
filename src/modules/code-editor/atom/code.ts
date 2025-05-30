import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const codeAtom = atomWithStorage<string>("code", "");

export const codeDataAtom = atom(null, (_, set, data: string | undefined) => {
    set(codeAtom, data ?? "");
});
