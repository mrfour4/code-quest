import { ClientOnly } from "@/components/client-only";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Users } from "lucide-react";

export const Organizations = () => {
    return (
        <ClientOnly>
            <div className="flex items-center lg:hidden">
                <Users className="text-muted-foreground ml-3 size-4" />
                <OrganizationSwitcher
                    appearance={{
                        elements: {
                            avatarBox: "!hidden",
                            organizationPreview: "!-ml-3",
                            organizationSwitcherTrigger: " !text-white",
                        },
                    }}
                    afterLeaveOrganizationUrl="/"
                />
            </div>
        </ClientOnly>
    );
};
