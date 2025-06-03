import { atom } from "jotai";

export const codeAtom = atom<string>("");
export const codeFromDB = atom<string>("");

export const codeDataAtom = atom(null, (_, set, data: string) => {
    set(codeAtom, data);
    set(codeFromDB, data);
});
