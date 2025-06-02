import { atom } from "jotai";
import { LANGUAGES } from "../constants";
import { Language } from "../types";

export const languagesAtom = atom<Language>(LANGUAGES[0]);

export const languageDataAtom = atom(null, (_, set, data?: string) => {
    // set(languagesAtom, data ?? LANGUAGES[0].value);
});
