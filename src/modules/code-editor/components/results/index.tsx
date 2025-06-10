import { ScrollArea } from "@/components/ui/scroll-area";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { resultsAtom } from "../../atom/result";
import { testCasesFamilyAtom } from "../../atom/testcase";
import { getErrorMessage, highlightDiff } from "../../lib/utils";
import { StatusResult } from "../../types";
import { EmptyResultDisplay } from "./empty-result";
import { ErrorDisplay } from "./error-display";
import { HeaderResult } from "./header-results";
import { InputResultsSection } from "./input-section";
import { OutputResultSection } from "./output-section";
import { ResultsTestcaseTabs } from "./testcase-tabs";

export const Results = () => {
    const results = useAtomValue(resultsAtom);

    const [activeResultCase, setActiveResultCase] = useState(
        results[0]?.testCaseId,
    );
    const currentResultTestCase = useAtomValue(
        testCasesFamilyAtom(activeResultCase),
    );

    const hasError = getErrorMessage(results) !== "";

    const currentResult = results.find(
        (r) => r.testCaseId === activeResultCase,
    );

    if (results.length === 0 || !currentResult) {
        return <EmptyResultDisplay />;
    }

    if (hasError) {
        return <ErrorDisplay />;
    }

    const diff = highlightDiff(currentResult.output, currentResult.expected);
    const isShow = currentResult.status !== StatusResult.TimeLimitExceeded;

    return (
        <div className="flex h-full flex-col gap-y-4">
            <HeaderResult />

            <ResultsTestcaseTabs
                active={activeResultCase}
                onChange={setActiveResultCase}
            />

            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full px-3">
                    {currentResult && currentResultTestCase && (
                        <div className="space-y-4">
                            <InputResultsSection
                                values={currentResultTestCase.inputs}
                            />

                            {isShow && (
                                <>
                                    <OutputResultSection
                                        label="Output"
                                        value={currentResult.output}
                                        diff={diff.outputHighlighted}
                                    />

                                    <OutputResultSection
                                        label="Expected"
                                        value={currentResult.expected}
                                        diff={diff.expectedHighlighted}
                                    />
                                </>
                            )}
                        </div>
                    )}
                </ScrollArea>
            </div>
        </div>
    );
};
