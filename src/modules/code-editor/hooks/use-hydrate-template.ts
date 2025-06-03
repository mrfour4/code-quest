import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { useGetTemplate } from "../api/template";
import { codeDataAtom } from "../atom/code";

export const useHydrateTemplate = () => {
    const { data } = useGetTemplate();
    const setCodeData = useSetAtom(codeDataAtom);

    useEffect(() => {
        setCodeData(data?.code ?? "");
    }, [data, setCodeData]);
};
