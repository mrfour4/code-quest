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
                <Suspense fallback={null}>
                    <Organizations />
                </Suspense>
                <Logo />
                <div className="flex items-center gap-3">
                    <UserButton
                        appearance={{ elements: { avatarBox: "!size-8" } }}
                    />
                    <Button variant="secondary" size="icon">
                        <Package2 />
                    </Button>
                </div>
            </div>
        </header>
    );
};
