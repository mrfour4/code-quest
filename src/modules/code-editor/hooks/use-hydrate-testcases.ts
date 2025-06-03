import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { useGetTestCases } from "../api/testcase";
import { testCaseDataAtom } from "../atom/testcase";

export const useHydrateTestCases = () => {
    const { data } = useGetTestCases();
    const setTestCases = useSetAtom(testCaseDataAtom);

    useEffect(() => {
        if (!data) return;

        setTestCases(data);
    }, [data, setTestCases]);
};
