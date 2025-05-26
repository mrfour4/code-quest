import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

type Props = {
    message: string;
    children: React.ReactNode;
};

export const Hint = ({ message, children }: Props) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>{children}</TooltipTrigger>
            <TooltipContent>
                <p>{message}</p>
            </TooltipContent>
        </Tooltip>
    );
};
