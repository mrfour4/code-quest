import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";

type Props = {
    children?: React.ReactNode;
    title: string;
    onClick: () => void;
};

export const ActionSelector = ({ children, title, onClick }: Props) => {
    return (
        <Hint message={title}>
            <Button
                size="icon"
                variant="ghost"
                className="dark:hover:bg-input/50 size-8 rounded-sm"
                onClick={onClick}
            >
                {children}
            </Button>
        </Hint>
    );
};
