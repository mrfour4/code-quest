import { getAuthToken } from "@/modules/auth/lib/auth";
import { DocumentContent } from "@/modules/document/components/document-content";
import { Header } from "@/modules/document/components/header";
import { Room } from "@/modules/room/components/room";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

type Props = {
    params: Promise<{ documentId: Id<"documents"> }>;
};

export default async function DocumentPage({ params }: Props) {
    const { documentId } = await params;

    const token = await getAuthToken();

    if (!token) {
        throw new Error("No auth token found");
    }

    const [preloadedDocument, preloadedTestCases] = await Promise.all([
        preloadQuery(api.documents.get, { id: documentId }, { token }),
        preloadQuery(api.testCases.get, { documentId }),
    ]);

    const preloadedSolution = await preloadQuery(api.solutions.get, {
        documentId,
    });

    return (
        <Room documentId={documentId}>
            <div className="flex h-screen flex-col overflow-hidden">
                <Header preloadedDocument={preloadedDocument} />
                <main className="mt-16 flex size-full">
                    <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden p-2.5">
                        <DocumentContent
                            preloadedSolution={preloadedSolution}
                            preLoadedTestCases={preloadedTestCases}
                        />
                    </div>
                </main>
            </div>
        </Room>
    );
}
