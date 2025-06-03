import { Button } from "@/components/ui/button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ClientSideSuspense } from "@liveblocks/react";
import { InboxNotification, InboxNotificationList } from "@liveblocks/react-ui";
import { useInboxNotifications } from "@liveblocks/react/suspense";
import { InboxIcon } from "lucide-react";

// TODO: Refactor this when use ID token instead of Access token
const InboxSuspense = () => {
    const { inboxNotifications } = useInboxNotifications();

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="secondary" size="icon" className="relative">
                    <InboxIcon />
                </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-auto overflow-hidden p-0">
                {inboxNotifications.length > 0 ? (
                    <InboxNotificationList>
                        {inboxNotifications.map((notification) => (
                            <InboxNotification
                                key={notification.id}
                                inboxNotification={notification}
                            />
                        ))}
                    </InboxNotificationList>
                ) : (
                    <div className="text-muted-foreground p-2 text-center text-sm">
                        No notifications
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
};

export const Inbox = () => {
    return (
        <ClientSideSuspense
            fallback={
                <Button variant="secondary" size="icon" disabled>
                    <InboxIcon />
                </Button>
            }
        >
            <InboxSuspense />
        </ClientSideSuspense>
    );
};
