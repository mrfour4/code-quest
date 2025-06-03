import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ConvexError } from "convex/values";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useCreateCategory } from "../api/categories";

type Props = {
    onClose: () => void;
    onChange: (value: string) => void;
};

export const CreateCategoryButton = ({ onClose, onChange }: Props) => {
    const [value, setValue] = useState("");
    const { isPending, mutate } = useCreateCategory();
    const [error, setError] = useState("");

    const onSubmit = () => {
        mutate(
            { name: value.trim() },
            {
                onError(error) {
                    if (error instanceof ConvexError) {
                        const errorMessage = error.data;
                        setError(errorMessage);
                    }
                },
                onSuccess(id) {
                    onChange(id);
                    setValue("");
                    toast.success("Category created successfully.");
                    setError("");
                    onClose();
                },
            },
        );
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && value.trim()) {
            e.preventDefault();
            onSubmit();
        }

        if (e.key === "Escape") {
            e.stopPropagation();
            e.preventDefault();
            onClose();
        }
    };

    return (
        <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
                <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder="Enter new category name"
                />
                <Button
                    onClick={onSubmit}
                    disabled={isPending || !value.trim()}
                    type="button"
                >
                    <Plus />
                </Button>
            </div>
            {error && <span className="text-destructive text-sm">{error}</span>}
        </div>
    );
};
