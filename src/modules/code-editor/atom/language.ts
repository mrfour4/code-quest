import { atom } from "jotai";
import { LANGUAGES } from "../constants";
import { Language } from "../types";

export const languagesAtom = atom<Language>(LANGUAGES[0]);

export const languageDataAtom = atom(null, (_, set, data?: string) => {
    if (data) {
        const language = LANGUAGES.find((lang) => lang.value === data);
        if (language) {
            set(languagesAtom, language);
            return;
        }
    } else {
        set(languagesAtom, LANGUAGES[0]);
    }
});
