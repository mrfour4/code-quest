import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useClerk, useOrganizationList } from "@clerk/nextjs";
import { Building2, Folders, Settings } from "lucide-react";
import { SidebarItem } from "./sidebar-item";

type Props = {
    orgId?: string | null;
};

export const SidebarOrganization = ({ orgId }: Props) => {
    const { userMemberships, isLoaded, setActive } = useOrganizationList({
        userMemberships: {
            infinite: true,
        },
    });

    const { redirectToOrganizationProfile } = useClerk();

    if (!isLoaded) {
        return <SidebarOrganizationSkeleton />;
    }

    const orgs = userMemberships.data.map((mem) => ({
        id: mem.organization.id,
        name: mem.organization.name,
        href: mem.organization.slug,
    }));

    return (
        <div className="space-y-1">
            <SidebarItem
                title="All Organizations"
                icon={Building2}
                isActive={!orgId}
                onClick={() => setActive({ organization: null })}
            />
            {orgs.map((item) => (
                <SidebarItem
                    key={item.id}
                    title={item.name}
                    icon={Folders}
                    isActive={orgId === item.id}
                    onClick={() => setActive({ organization: item.id })}
                >
                    <button
                        className={cn(
                            "hidden hover:cursor-pointer",
                            orgId && "group-hover:block",
                        )}
                        onClick={(e) => {
                            e.stopPropagation();
                            redirectToOrganizationProfile();
                        }}
                    >
                        <Settings />
                    </button>
                </SidebarItem>
            ))}
        </div>
    );
};

export const SidebarOrganizationSkeleton = () => {
    return (
        <div className="space-y-1">
            <Skeleton className="h-9 w-full rounded-sm" />
            <Skeleton className="h-9 w-full rounded-sm" />
            <Skeleton className="h-9 w-full rounded-sm" />
        </div>
    );
};
