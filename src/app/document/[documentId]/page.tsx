import { getAuthToken } from "@/modules/auth/lib/auth";
import { DocumentContent } from "@/modules/document/components/doc-content";
import { Header } from "@/modules/document/components/header";
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

    const preloadedDocument = await preloadQuery(
        api.documents.get,
        { id: documentId },
        { token },
    );

    return (
        <div className="flex h-screen flex-col overflow-hidden">
            <Header preloadedDocument={preloadedDocument} />
            <main className="mt-16 flex size-full">
                <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden p-2.5">
                    <DocumentContent />
                </div>
            </main>
        </div>
    );
}
