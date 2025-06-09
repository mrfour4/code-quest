import { ClientOnly } from "@/components/client-only";
import { Logo } from "@/modules/dashboard/components/logo";
import { UserButton } from "@clerk/nextjs";

export const Header = () => {
    return (
        <header className="bg-popover fixed inset-x-0 top-0 z-50 h-16 border-b">
            <div className="flex h-full w-full items-center justify-between px-4">
                <Logo />
                <div className="flex items-center gap-3">
                    <ClientOnly>
                        <UserButton
                            appearance={{ elements: { avatarBox: "!size-8" } }}
                        />
                    </ClientOnly>
                </div>
            </div>
        </header>
    );
};
