import { getAuthToken } from "@/modules/auth/lib/auth";
import { ProblemContent } from "@/modules/problems/components/problem-content";
import { Room } from "@/modules/room/components/room";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

type Props = {
    params: Promise<{ documentId: Id<"documents"> }>;
};

export default async function ProblemPage({ params }: Props) {
    const { documentId } = await params;

    const token = await getAuthToken();

    if (!token) {
        throw new Error("No auth token found");
    }

    const preloadedDocument = await preloadQuery(api.documents.getPublished, {
        id: documentId,
    });

    return (
        <Room documentId={documentId}>
            <div className="bg-background flex h-screen flex-col overflow-hidden">
                <main className="flex size-full">
                    <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden p-2.5">
                        <ProblemContent preLoadedProblem={preloadedDocument} />
                    </div>
                </main>
            </div>
        </Room>
    );
}
