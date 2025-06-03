import { useGetDocument } from "@/modules/dashboard/api/documents";
import { useDocumentId } from "@/modules/document/hooks/use-document-id";
import { useAtomValue } from "jotai";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { useSaveTestCases } from "../../api/testcase";
import { testCasesAtoms } from "../../atom/testcase";
import { ActionSelector } from "../action-selector";

export const SaveTestCasesButton = () => {
    const documentId = useDocumentId();
    const { mutate, isPending } = useSaveTestCases();
    const testCases = useAtomValue(testCasesAtoms);

    const { data: document } = useGetDocument(documentId);

    if (document?.type === "published") {
        return null;
    }

    const onClick = () => {
        mutate(
            {
                documentId,
                value: testCases,
            },
            {
                onError(error) {
                    console.log("Error saving test cases:", error);
                    toast.error(`Failed to save test cases: ${error.message}`);
                },
                onSuccess() {
                    toast.success("Test cases saved successfully!");
                },
            },
        );
    };

    return (
        <ActionSelector
            title="Save test cases"
            onClick={onClick}
            disabled={isPending}
        >
            <Save />
        </ActionSelector>
    );
};
