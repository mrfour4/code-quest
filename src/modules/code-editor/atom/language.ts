import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { LANGUAGES } from "../constants";

export const languagesAtom = atomWithStorage<string>(
    "languages",
    LANGUAGES[0].value,
);

export const languageDataAtom = atom(null, (_, set, data?: string) => {
    set(languagesAtom, data ?? LANGUAGES[0].value);
});
