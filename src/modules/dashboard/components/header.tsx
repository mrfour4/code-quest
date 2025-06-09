import { ClientOnly } from "@/components/client-only";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Package2 } from "lucide-react";
import { Suspense } from "react";
import { Logo } from "./logo";
import { Organizations } from "./organizations";

export const Header = () => {
    return (
        <header className="fixed inset-x-0 top-0 z-50 h-16 border-b dark:bg-[#121215]">
            <div className="flex h-full w-full items-center justify-between px-4">
                <Logo className="hidden lg:block" />

                <Suspense fallback={null}>
                    <Organizations />
                </Suspense>

                <div className="flex items-center gap-3">
                    <ClientOnly>
                        <UserButton
                            appearance={{ elements: { avatarBox: "!size-8" } }}
                        />
                    </ClientOnly>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="hidden md:flex"
                    >
                        <Package2 />
                    </Button>
                </div>
            </div>
        </header>
    );
};
