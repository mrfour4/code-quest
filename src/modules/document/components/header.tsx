"use client";

import { Logo } from "@/modules/dashboard/components/logo";
import { Inbox } from "@/modules/inbox";
import { AvatarStack } from "@/modules/room/components/avatar-stack";
import { useOrganizationList } from "@clerk/nextjs";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { useEffect } from "react";
import { api } from "../../../../convex/_generated/api";
import { Role } from "../../../../convex/documents";
import { DocumentTitle } from "./doc-title";
import { PublishButton } from "./publish-btn";

type Props = {
    preloadedDocument: Preloaded<typeof api.documents.get>;
};

export const Header = ({ preloadedDocument }: Props) => {
    const document = usePreloadedQuery(preloadedDocument);
    const { setActive } = useOrganizationList();

    useEffect(() => {
        setActive?.({ organization: document.orgId });
    }, [document.orgId, setActive]);

    if (!document) {
        return <div className="flex h-16 border-b">Loading...</div>;
    }

    return (
        <header className="fixed inset-x-0 top-0 z-50 h-16 border-b dark:bg-[#121215]">
            <div className="flex size-full items-center justify-between border-b px-4 py-3">
                <Logo />

                <div className="w-1/3 px-4">
                    <DocumentTitle
                        title={document.title}
                        id={document._id}
                        canEdit={document.role === Role.Admin}
                    />
                </div>

                <div className="flex items-center gap-x-3">
                    <AvatarStack />
                    {document.role === Role.Admin && (
                        <PublishButton
                            documentId={document._id}
                            type={document.type}
                        />
                    )}
                    <Inbox />
                </div>
            </div>
        </header>
    );
};
