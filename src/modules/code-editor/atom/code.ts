import { atom } from "jotai";

export const codeAtom = atom<string>("");

export const codeDataAtom = atom(null, (_, set, data: string | undefined) => {
    set(codeAtom, data ?? "");
});
