import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Props = {
    title?: string;
    message?: string;
    disabled?: boolean;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    onCancel?: () => void;
};

export const ConfirmDialog = ({
    title = "Delete document",
    message = "This will permanently delete the document.",
    disabled = false,
    open,
    onOpenChange,
    onConfirm,
    onCancel,
}: Props) => {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent className="dark:bg-background">
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{message}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={disabled} onClick={onCancel}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction disabled={disabled} onClick={onConfirm}>
                        Continue
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};
