"use client";

import { Logo } from "@/modules/dashboard/components/logo";
import { Inbox } from "@/modules/inbox";
import { AvatarStack } from "@/modules/room/components/avatar-stack";
import { useOrganizationList } from "@clerk/nextjs";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { useEffect } from "react";
import { api } from "../../../../convex/_generated/api";
import { Role } from "../../../../convex/documents";
import { DocumentTitle } from "./document-title";
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
        <header className="bg-primary-foreground fixed inset-x-0 top-0 z-50 h-16 border-b shadow-md">
            <div className="flex size-full items-center justify-between px-4 py-3">
                <Logo className="hidden lg:block" />

                <div className="w-1/3 px-4">
                    <DocumentTitle
                        title={document.title}
                        id={document._id}
                        canEdit={document.role === Role.Admin}
                    />
                </div>

                <div className="flex items-center gap-x-3">
                    <div className="hidden md:block">
                        <AvatarStack />
                    </div>

                    {document.role === Role.Admin && (
                        <PublishButton
                            documentId={document._id}
                            type={document.type}
                        />
                    )}
                    <div className="hidden md:block">
                        <Inbox />
                    </div>
                </div>
            </div>
        </header>
    );
};
