"use client";

import { Button } from "@/components/ui/button";
import { Logo } from "@/modules/dashboard/components/logo";
import { UserButton } from "@clerk/nextjs";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { Package2, Upload } from "lucide-react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { DocumentTitle } from "./doc-title";

type Props = {
    preloadedDocument: Preloaded<typeof api.documents.get>;
};

export const Header = ({ preloadedDocument }: Props) => {
    const document = usePreloadedQuery(preloadedDocument);
    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState("");

    if (!document) {
        return <div className="flex h-16 border-b">Loading...</div>;
    }

    return (
        <header className="fixed inset-x-0 top-0 z-50 h-16 border-b dark:bg-[#121215]">
            <div className="flex size-full items-center justify-between border-b px-4 py-3">
                <Logo />

                <div className="w-1/3 px-4">
                    <DocumentTitle title={document.title} id={document._id} />
                </div>

                <div className="flex items-center gap-x-3">
                    <UserButton />
                    <Button>
                        <Upload />
                        Share
                    </Button>
                    <Button variant="secondary" size="icon">
                        <Package2 />
                    </Button>
                </div>
            </div>
        </header>
    );
};
