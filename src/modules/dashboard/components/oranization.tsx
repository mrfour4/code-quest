import { OrganizationSwitcher } from "@clerk/nextjs";
import { Users } from "lucide-react";

export const Organizations = () => {
    return (
        <div className="flex items-center">
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
    );
};
